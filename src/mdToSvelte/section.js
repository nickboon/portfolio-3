const openParagraphs = '<div class="paragraphs">';
const openContent = '<div class="content">';
const openProject = '<div class="project">';
const close = '</div>';
const paragraphsRegex = /(<p>.*?<\/p>\s*)+/gs;
const wrappedParagraphs = openParagraphs + '$&' + close;
const projectListRegex = /<ProjectSet projects={projects\d*} level={level \+ 1} \/>/gs;
const wrappedProjectList = close + '$&' + openContent;
const emptyContent = /<div class="content">\s*<\/div>/gs;

class Section {
	static wrapParagraphs(html) {
		return html.replace(paragraphsRegex, wrappedParagraphs);
	}

	static wrapContent(html) {
		return (
			openContent +
			html.replace(projectListRegex, wrappedProjectList) +
			close
		).replace(emptyContent, '');
	}

	static wrapProject(html) {
		return openProject + html + close;
	}
}

module.exports = Section;
