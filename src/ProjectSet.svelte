<script>
	export let projects = [];
</script>

{#each projects as project}
	<svelte:component this={project} />
{/each}
