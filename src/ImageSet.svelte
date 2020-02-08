<script>
	export let name = '';
	export let images = [];

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

	// This prevents a jump when the user closes a css only lightbox.
	// Make sure that there is no actual element on the page with the same id.
	const nonExistantAnchor = '#projects';

	images = validate(images);
	images.forEach((image, index) => {
		image.id = imagePrefix + hash(image.urls.large);
		image.previousId = getPreviousId(index);
		image.nextId = getNextid(index);
		image.plainTextInfo = generatePlainTextInfo(image);
		image.htmlInfo = generateHtmlInfo(image);
	});
</script>

<style>
	.imageSet .image a.thumbnail img {
		width: 100%;
		display: block;
	}

	.imageSet .image a.thumbnail img:hover {
		outline: 1px solid #555;
	}

	.imageSet .overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: black;
		background: rgba(0, 0, 0, 0.8);
		color: #ccc;
		color: rgba(256, 256, 256, 0.8);
		display: none;
	}

	.overlay:target {
		display: block;
	}

	.imageSet .overlay figure {
		margin: 0;
		position: fixed;
		text-align: center;
		top: 2em;
		bottom: 3em;
		width: 100%;
	}

	.imageSet .overlay figure img {
		max-height: 100%;
		max-width: 80%;
	}

	.imageSet .overlay figure figcaption {
		bottom: 0;
		padding: 1em;
	}

	a.next-link,
	a.previous-link,
	a.close-link,
	a.next-link:focus,
	a.previous-link:focus,
	a.close-link:focus,
	a.next-link:visited,
	a.previous-link:visited,
	a.close-link:visited {
		color: rgba(256, 256, 256, 0.8);
		text-decoration: none;
		font-size: x-large;
		outline: none;
	}
	a.next-link:hover,
	a.previous-link:hover,
	a.close-link:hover {
		color: white;
	}

	.close-icon {
		position: fixed;
		top: 0;
		right: 1em;
		z-index: 1000;
		padding: 0 0 8% 8%;
	}
	.close-icon::after {
		content: '\00d7';
	}

	.next-icon,
	.previous-icon {
		position: fixed;
		top: 32%;
		padding: 8%;
	}

	.next-icon {
		right: 0;
	}
	.previous-icon {
		left: 0;
	}
	.next-icon::after {
		content: '\232a';
	}
	.previous-icon::after {
		content: '\2329';
	}
</style>

<ul class="imageSet">
	{#each images as image}
		<li class="image">
			<a href="#{image.id}" class="thumbnail">
				<img src={image.urls.small} alt={image.plainTextInfo} />
			</a>
			<div id={image.id} class="overlay">
				<a href={nonExistantAnchor} class="close-link">
					<span class="close-icon" />
				</a>
				<figure>
					{#if image.nextId}
						<a href="#{image.nextId}">
							<img src={image.urls.large} alt={image.plainTextInfo} />
						</a>
					{:else}
						<a href={nonExistantAnchor}>
							<img src={image.urls.large} alt={image.plainTextInfo} />
						</a>
					{/if}
					<figcaption>
						{@html image.htmlInfo}
					</figcaption>
				</figure>
				{#if image.previousId}
					<a href="#{image.previousId}" class="previous-link">
						<span class="previous-icon" />
					</a>
				{/if}
				{#if image.nextId}
					<a href="#{image.nextId}" class="next-link">
						<span class="next-icon" />
					</a>
				{/if}
			</div>
		</li>
	{/each}
</ul>
