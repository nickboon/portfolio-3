<script>
	export let name = '';
	export let images = [];

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
</script>

<ul class="imageSet">
	{#each images as image}
		<li>
			<img
				src={image.url}
				alt={generatePlainTextInfo(image)}
				title={generatePlainTextInfo(image)} />
		</li>
	{/each}
</ul>
