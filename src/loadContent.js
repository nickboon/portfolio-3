const path = require('path');
const fs = require('fs-extra');
const { content } = require(process.argv[2] ||
	path.join('..', 'portfolio.config.json'));

function notConfigured(property) {
	console.error(`${property} not configured.`);
	process.exit(1);
}

function notExist(file, path) {
	console.error(`${file} not found: ${path}`);
	process.exit(1);
}

function ensureExists(dir) {
	if (!dir || !fs.existsSync(dir)) fs.mkdirSync(dir);
}

function copy(source, output) {
	ensureExists(output);
	if (fs.exists(source)) fs.copySync(source, output);
	else notExist('Source directory', source);
}

if (!content) notConfigured('Content directory');

const sourceMd = content.md;
if (sourceMd) copy(sourceMd, path.resolve('md'));
else notConfigured('Markdown source directory');

const sourcePublic = content.public;
if (sourcePublic) copy(sourcePublic, path.resolve('public'));
else notConfigured('Public files source directory');

process.exit(0);
