const importStatement = `import ImageSet from '../src/ImageSet.svelte';`;

function generateConst(imageSet, id) {
	return `\n\nconst imageSet${id} = ${imageSet};`;
}

function generateNameAttribute(json, id) {
	if (!JSON.parse(json).name) return '';
	return `name={imageSet${id}.name}`;
}

class ImageSet {
	static generateImport() {
		return importStatement;
	}

	static generateConsts(imageSets) {
		return imageSets ? imageSets.map(generateConst).join('') : '';
	}

	static generateElement(json, id = '') {
		return `<ImageSet ${generateNameAttribute(
			json,
			id
		)} images={imageSet${id}.images} />`;
	}
}

module.exports = ImageSet;
