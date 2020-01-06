const path = require('path');
const fs = require('fs');

function injectIndexTitle(title) {
	const source = path.join('src', 'index.html');
	const output = path.join('built', 'index.html');
	console.log(`Updating ${output} with title ${title}.`);

	fs.writeFileSync(
		output,
		fs
			.readFileSync(source, 'utf8')
			.replace(/<title>.*<\/title>/, `<title>${title}</title>`)
	);
}

injectIndexTitle(process.argv[2]);
