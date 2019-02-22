const svelte = require('svelte');

const fs = require("fs")

const input = fs.readFileSync('App.html', 'utf-8');

svelte.preprocess(input, {
	filename: 'App.html', // this is passed to each preprocessor

	markup: ({ content, filename }) => {
		return {
			code: `${content}`,
			map: {
              info: `${content}`,
              filename: filename
            }
		};
	},

	style: ({ content, attributes, filename }) => {
		return {
			code: content,
			map: {
                info: `${content}`,
                filename: filename,
                attrs: attributes
            }
		};
	},

	script: ({ content, attributes, filename }) => {
		return {
			code: content,
			map: {
                info: `${content}`,
                filename: filename,
                attrs: attributes
            }
		};
	}
}).then(preprocessed => {
    fs.writeFileSync('preprocessed/App.html', preprocessed.toString());
    debugger
	const { js } = svelte.compile(preprocessed.toString());
	fs.writeFileSync('compiled/App.js', js.code);
});