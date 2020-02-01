const commentsRegex = /(<|&lt;)!--.*?--(>|&gt;)/gs;

class Comment {
	static removeAll(html) {
		return html.replace(commentsRegex, '');
	}
}

module.exports = Comment;
