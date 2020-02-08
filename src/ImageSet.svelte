<script>
	export let name = '';
	export let images = [];

	console.log('images', images);

	function validate(images) {
		return (
			images
				// each images needs at least one url reference
				.filter(image => image.url || image.urls.large || image.urls.small)
				.map(image => {
					// set large and small urls if they are unset
					if (!image.urls) image.urls = { large: image.url, small: image.url };
					if (!image.urls.small)
						image.urls.small = image.urls.large || image.url;
					if (!image.urls.large)
						image.urls.small = image.urls.small || image.url;

					return image;
				})
		);
	}

	function hash(str) {
		const length = str.length;
		let result = 0;
		if (length == 0) return result;
		for (let i = length; i > 0; i--) {
			let char = str.charCodeAt(i);
			result = (result << 5) - result + char;
			result = result & result; // Convert to 32bit integer
		}
		return result;
	}

	function generatePlainTextInfo(image) {
		if (image === undefined) return '';

		var info = [
			(name ? name : '') +
				(name && image.title ? ': ' : '') +
				(image.title || ''),
			image.medium,
			image.dimensions,
			image.edition,
			image.author,
			image.date,
			image.credit,
			image.link
		]
			.filter(function(item) {
				return item;
			})
			.join(', ');

		if (!info) return '';

		return info[0].toUpperCase() + info.slice(1) + '.';
	}

	function generateHtmlInfo(image) {
		if (image.title) image.title = `<em>${image.title}</em>`;
		if (image.link)
			image.link = `<a href="${image.link}" target="_blank">${image.link}</a>`;
		return generatePlainTextInfo(image);
	}

	function getPreviousId(thisIndex) {
		return thisIndex <= 0
			? false
			: imagePrefix + hash(images[thisIndex - 1].urls.large);
	}

	function getNextid(thisIndex) {
		return thisIndex >= images.length - 1
			? false
			: imagePrefix + hash(images[thisIndex + 1].urls.large);
	}

	const imagePrefix = 'image_';

	images = validate(images);
	images.forEach((image, index) => {
		image.id = imagePrefix + hash(image.urls.large);
		image.previousId = getPreviousId(index);
		image.nextId = getNextid(index);
		image.plainTextInfo = generatePlainTextInfo(image);
		image.htmlInfo = generateHtmlInfo(image);
	});
</script>

<!-- {JSON.stringify(images)} -->
<ul class="imageSet">
	{#each images as image}
		<li class="image">
			<a href="#{image.id}" class="thumbnail">
				<img src={image.urls.small} alt={image.plainTextInfo} />
			</a>
			<div id={image.id} class="overlay">
				<a href="#projects" class="close-icon">&times;</a>
				<figure>
					{#if image.nextId}
						<a href="#{image.nextId}">
							<img src={image.urls.large} alt={image.plainTextInfo} />
						</a>
					{:else}
						<a href="#projects">
							<img src={image.urls.large} alt={image.plainTextInfo} />
						</a>
					{/if}
					<figcaption>
						{@html image.htmlInfo}
					</figcaption>
				</figure>
				{#if image.previousId}
					<a href="#{image.previousId}" class="previous-link">
						<span class="previous-icon">&lang;</span>
					</a>
				{/if}
				{#if image.nextId}
					<a href="#{image.nextId}" class="next-link">
						<span class="next-icon">&rang;</span>
					</a>
				{/if}
			</div>
		</li>
	{/each}
</ul>
