const { Converter } = require('showdown');
const path = require('path');
const fs = require('fs');
const ScriptBlock = require('./scriptBlock');
const HtmlBlock = require('./htmlBlock');
const targetlink = require('./targetlinkExtension');

function capitalizeInitial(word) {
	return word[0].toUpperCase() + word.slice(1);
}

function toSvelte(md) {
	const html = converter.makeHtml(md);
	return ScriptBlock.generate(html) + HtmlBlock.generate(html);
}

const converter = new Converter({
	simplifiedAutoLink: true,
	noHeaderId: true,
	excludeTrailingPunctuationFromURLs: true,
	literalMidWordUnderscores: true,
	simpleLineBreaks: true,
	encodeEmails: true,
	extensions: [targetlink]
});

const sourceDir = path.resolve('md');
if (!fs.existsSync(sourceDir)) {
	console.error(`Source directory ${sourceDir} not found!`);
	process.exit(0);
}

const outputDir = path.resolve('built');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

fs.readdirSync(sourceDir)
	.filter(file => path.parse(file).ext === '.md')
	.forEach(file => {
		const md = fs.readFileSync(path.join(sourceDir, file), 'utf8');
		const fileName = capitalizeInitial(path.parse(file).name) + '.svelte';
		fs.writeFileSync(path.join(outputDir, fileName), toSvelte(md));
	});

process.exit(0);
