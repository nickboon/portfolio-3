const projectSetImport = `import ProjectSet from '../src/ProjectSet.svelte';`;

function capitalizeInitial(word) {
	return word[0].toUpperCase() + word.slice(1);
}

function distinct(array) {
	const set = {};
	array.forEach(item => (set[`${item}::${typeof item}`] = item));
	return Object.keys(set).map(item => set[item]);
}

function generateProjectImport(project) {
	const formatedProject = capitalizeInitial(project);
	return `import ${formatedProject} from './${formatedProject}.svelte';`;
}

function generateSetImport(projectSet) {
	return JSON.parse(projectSet)
		.map(project => generateProjectImport(project))
		.join('');
}

function formatProjects(projects) {
	return JSON.stringify(JSON.parse(projects).map(capitalizeInitial)).replace(
		/"/g,
		''
	);
}

function generateConst(projectSet, id) {
	return projectSet
		? `\n\nconst projects${id} = ${formatProjects(projectSet)};`
		: '';
}

class ProjectSet {
	static generateImports(projectSets) {
		if (!projectSets) return '';

		const projectImports = projectSets.map(generateSetImport);
		return projectSetImport + distinct(projectImports).join('');
	}

	static generateConsts(projectSets) {
		return projectSets ? projectSets.map(generateConst).join('') : '';
	}

	static generateElement(id = '') {
		return `<ProjectSet projects={projects${id}} level={level + 1} />`;
	}
}

module.exports = ProjectSet;
