<script>
	export let level = 0;
	export let projects = [];
</script>

{#each projects as project}
	<svelte:component this={project} {level} />
{/each}
