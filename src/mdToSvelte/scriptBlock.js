const EmbeddedJson = require('./embeddedJson');
const imageSetImport = `import ImageSet from '../src/ImageSet.svelte';`;
const projectSetImport = `import ProjectSet from '../src/ProjectSet.svelte';`;

function capitalizeInitial(word) {
	return word[0].toUpperCase() + word.slice(1);
}

function generateProjectImport(project) {
	const formatedProject = capitalizeInitial(project);
	return `import ${formatedProject} from './${formatedProject}.svelte';`;
}

function generateProjectImports(projects) {
	if (!projects) return '';

	return `${projectSetImport}${JSON.parse(projects)
		.map(project => generateProjectImport(project))
		.join('')}`;
}

function formatProjects(projects) {
	return JSON.stringify(
		JSON.parse(projects).map(project => capitalizeInitial(project))
	).replace(/"/g, '');
}

class ScriptBlock {
	static generate(html) {
		const imageSet = EmbeddedJson.extract('imageSet', html);
		const projects = EmbeddedJson.extract('projects', html);
		if (!imageSet && !projects) return '';

		const imports =
			(imageSet ? imageSetImport : '') + generateProjectImports(projects);
		const imageSetConst = imageSet ? `\n\nconst imageSet = ${imageSet};` : '';
		const projectsConst = projects
			? `\n\nconst projects = ${formatProjects(projects)};`
			: '';

		return `<script>${imports}${imageSetConst}${projectsConst}</script>`;
	}
}

module.exports = ScriptBlock;
