const importStatement = `import ProjectHeading from '../src/ProjectHeading.svelte';`;
const exportLetStatement = '\n\nexport let level = 0;';
const headingRegex = /<[hH]{1}[1-6]{1}[^>]*>.*?<\/[hH]{1}[1-6]{1}>/g;
const openTagRegex = /^<[hH]{1}[1-6]{1}[^>]*>/;
const closeTagRegex = /<\/[hH]{1}[1-6]{1}>$/;
const firstDigitRegex = /\d{1}/;

function stripTags(header) {
	return header.replace(openTagRegex, '').replace(closeTagRegex, '');
}

function generateReplacement(heading) {
	const level = heading.match(firstDigitRegex);
	const content = stripTags(heading);
	return `<ProjectHeading content="${content}" baseLevel="${level}" relativeLevel={level} />`;
}

class ProjectHeading {
	static generateImport() {
		return importStatement;
	}

	static generateExportLet() {
		return exportLetStatement;
	}

	static extractAll(html) {
		return html.match(headingRegex);
	}

	static replaceAll(html) {
		const matches = ProjectHeading.extractAll(html);
		if (!matches) return html;

		matches.forEach(match => {
			html = html.replace(match, generateReplacement(match));
		});
		return html;
	}
}

module.exports = ProjectHeading;
