const paragraphsRegex = /(<p>.*?<\/p>\s*)+/gs;
const wrappedParagraphs = '<section>$&</section>';

class Section {
	static wrapParagraphs(html) {
		return html.replace(paragraphsRegex, wrappedParagraphs);
	}
}

module.exports = Section;
