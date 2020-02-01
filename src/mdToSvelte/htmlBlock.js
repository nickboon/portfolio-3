const EmbeddedJson = require('./embeddedJson');
const ImageSet = require('./imageSet');
const ProjectSet = require('./projectSet');
const ProjectHeading = require('./projectHeading');
const Comment = require('./comment');
const Section = require('./section');

class HtmlBlock {
	static generate(html) {
		html = Comment.removeAll(html);

		const imageSets = EmbeddedJson.extractAll('imageSet', html);
		let htmlBlock = html;
		htmlBlock = EmbeddedJson.replaceAll('imageSet', htmlBlock, index =>
			ImageSet.generateElement(imageSets[index], index)
		);
		htmlBlock = EmbeddedJson.replaceAll('projects', htmlBlock, index =>
			ProjectSet.generateElement(index)
		);
		htmlBlock = ProjectHeading.replaceAll(htmlBlock);
		htmlBlock = Section.wrapParagraphs(htmlBlock);
		htmlBlock = Section.wrapContent(htmlBlock);
		htmlBlock = Section.wrapProject(htmlBlock);

		return htmlBlock;
	}
}

module.exports = HtmlBlock;
