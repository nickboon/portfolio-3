/**
 * Provides methods for extracting known properties from JSON objects contained in <pre><code> html
 * elements, or replacing the whole <pre><code> block.
 */

const embeddedJsonRegexPrefix = '<pre><code>\\s*{\\s*';
const embeddedJsonRegexSuffix = '\\s?}\\s?</code></pre>';

function generateRegexForObjectWithKnownKey(key) {
	return new RegExp(
		`${embeddedJsonRegexPrefix}"${key}":.*?${embeddedJsonRegexSuffix}`,
		's'
	);
}

class EmbeddedJson {
	static extract(key, html) {
		const matches = html.match(generateRegexForObjectWithKnownKey(key));
		if (!matches) return '';

		return matches[0]
			.replace(new RegExp(`${embeddedJsonRegexPrefix}".*":\s*`), '')
			.replace(new RegExp(embeddedJsonRegexSuffix), '');
	}

	static replace(key, html, replacement) {
		return html.replace(generateRegexForObjectWithKnownKey(key), replacement);
	}
}

module.exports = EmbeddedJson;
