module.exports = function() {
	return [
		{
			type: 'html',
			regex: /(<a [^>]+?)(>.*<\/a>)/g,
			replace: '$1 target="_blank"$2'
		}
	];
};
