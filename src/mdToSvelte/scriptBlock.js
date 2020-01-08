const EmbeddedJson = require('./embeddedJson');
const ImageSet = require('./imageSet');
const ProjectSet = require('./projectSet');
const ProjectHeading = require('./projectHeading');

function generateImports({ headings, imageSets, projectSets } = {}) {
	return [
		headings ? ProjectHeading.generateImport() : '',
		imageSets ? ImageSet.generateImport() : '',
		projectSets ? ProjectSet.generateImports(projectSets) : ''
	].join('');
}

function generateExportLets({ headings, projectSets } = {}) {
	return headings || projectSets ? ProjectHeading.generateExportLet() : '';
}

function generateConsts({ imageSets, projectSets } = {}) {
	return [
		ImageSet.generateConsts(imageSets),
		ProjectSet.generateConsts(projectSets)
	].join('');
}

class ScriptBlock {
	static generate(html) {
		const imageSets = EmbeddedJson.extractAll('imageSet', html);
		const projectSets = EmbeddedJson.extractAll('projects', html);
		const headings = ProjectHeading.extractAll(html);
		if (!headings && !projectSets && !imageSets) return '';

		const imports = generateImports({ headings, imageSets, projectSets });
		const exportLets = generateExportLets({ headings, projectSets });
		const consts = generateConsts({ imageSets, projectSets });
		return `<script>${imports}${exportLets}${consts}</script>`;
	}
}

module.exports = ScriptBlock;
