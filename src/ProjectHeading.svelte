<script>
	export let content = '';
	export let baseLevel = 0;
	export let relativeLevel = 1;

	const level = parseInt(baseLevel) + parseInt(relativeLevel);
	const headingLevel = level > 5 ? 6 : level;
</script>

{@html `<h${headingLevel}>${content}</h${headingLevel}>`}
