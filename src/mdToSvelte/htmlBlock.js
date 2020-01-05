const EmbeddedJson = require('./embeddedJson');
const ImageSet = require('./imageSet');
const ProjectSet = require('./projectSet');

const commentsRegex = /<!--.*?-->/gs;

class HtmlBlock {
	static generate(html) {
		const imageSets = EmbeddedJson.extract('imageSet', html);
		const projectSets = EmbeddedJson.extract('projects', html);
		let htmlBlock = html;

		if (imageSets)
			htmlBlock = EmbeddedJson.replaceAll('imageSet', htmlBlock, index =>
				ImageSet.generateElement(imageSets[index], index)
			);

		if (projectSets)
			htmlBlock = EmbeddedJson.replaceAll('projects', htmlBlock, index =>
				ProjectSet.generateElement(index)
			);

		htmlBlock = htmlBlock.replace(commentsRegex, '');

		return htmlBlock;
	}
}

module.exports = HtmlBlock;
