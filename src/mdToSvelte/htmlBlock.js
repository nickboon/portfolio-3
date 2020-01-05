const EmbeddedJson = require('./embeddedJson');
const commentsRegex = /<!--.*?-->/gs;
const projectSetElement = '<ProjectSet {projects} />';
const imageSet = {
	nameAttribute: 'name={imageSet.name}',
	imagesAttribute: 'images={imageSet.images}'
};

function generateImageSetElement(json) {
	return `<ImageSet ${JSON.parse(json).name ? imageSet.nameAttribute : ''} ${
		imageSet.imagesAttribute
	} />`;
}

class HtmlBlock {
	static generate(html) {
		let htmlBlock = html;
		htmlBlock = EmbeddedJson.replace(
			'imageSet',
			htmlBlock,
			generateImageSetElement(EmbeddedJson.extract('imageSet', html))
		);
		htmlBlock = EmbeddedJson.replace('projects', htmlBlock, projectSetElement);
		htmlBlock = htmlBlock.replace(commentsRegex, '');

		return htmlBlock;
	}
}

module.exports = HtmlBlock;
