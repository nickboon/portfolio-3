/**
 * Provides methods for extracting known properties from JSON objects contained in <pre><code> html
 * elements, or replacing the whole <pre><code> block.
 */

const embeddedJsonRegexPrefix = '<pre><code>\\s*{\\s*';
const embeddedJsonRegexSuffix = '\\s?}\\s?</code></pre>';

function generateRegexForObjectWithKnownKey(key) {
	return new RegExp(
		`${embeddedJsonRegexPrefix}"${key}":.*?${embeddedJsonRegexSuffix}`,
		'sg'
	);
}

class EmbeddedJson {
	static extract(key, html) {
		const matches = html.match(generateRegexForObjectWithKnownKey(key));
		if (!matches) return '';

		return matches.map(match =>
			match
				.replace(new RegExp(`${embeddedJsonRegexPrefix}".*":\s*`), '')
				.replace(new RegExp(embeddedJsonRegexSuffix), '')
		);
	}

	static replaceAll(key, html, generateReplacement) {
		const matches = html.match(generateRegexForObjectWithKnownKey(key));
		if (!matches) return '';

		matches.forEach(
			(match, index) => (html = html.replace(match, generateReplacement(index)))
		);

		return html;
	}
}

module.exports = EmbeddedJson;
