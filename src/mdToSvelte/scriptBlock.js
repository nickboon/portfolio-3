const EmbeddedJson = require('./embeddedJson');
const ImageSet = require('./imageSet');
const ProjectSet = require('./projectSet');

function generateImports({ imageSets, projectSets } = {}) {
	return [
		imageSets ? ImageSet.generateImport() : '',
		projectSets ? ProjectSet.generateImports(projectSets) : ''
	].join('');
}

class ScriptBlock {
	static generate(html) {
		const imageSets = EmbeddedJson.extract('imageSet', html);
		const projectSets = EmbeddedJson.extract('projects', html);
		if (!imageSets && !projectSets) return '';

		const imports = generateImports({ imageSets, projectSets });
		const imageSetConsts = ImageSet.generateConsts(imageSets);
		const projectSetConsts = ProjectSet.generateConsts(projectSets);
		return `<script>${imports}${imageSetConsts}${projectSetConsts}</script>`;
	}
}

module.exports = ScriptBlock;
