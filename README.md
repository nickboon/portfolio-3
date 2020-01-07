This project creates a static website by converting [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) files to [Svelte](https://svelte.dev/) components.

The conversion uses [Showdown](https://github.com/showdownjs/showdown), but will extract JSON data set in code blocks in the Markdown if it contains an object with a recognised property (currently either `imageSet` or `projectSet`).

The path to the Markdown files is set in the `generate:svelte` script included in the `package.json` file.

```
    	"generate:svelte": "node src/mdToSvelte/mdToSvelte.js ./path/to/markdown/directory/"
```

One of the file must be named `Root.md`. This will be converted into the root Svelte component, which can then load other generated components by including a project set.

Sample Markdown:

`Root.md`:

````
    # Welcome To My Project Site

    Check out these projects!

    ```
    {
        "projects": [
            "projectA",
            "projectB"
        ]
    }
    ```
````

`ProjectA.md`:

````
    # ProjectA

    Check out the photos!
    ```
    {
        "imageSet": {
            "name": "project A Photos"
            "images": [
                {
                    "url": "https://pictures.server.com.project_a/1.jpg",
                    "title": "Photo 1",
                    "credit": "photo by me"
                }
            ]
        }
    }
    ```
````

`ProjectB.md`:

```
    # ProjectB

    Short summary...

    More info [here](https://archive.projects.com/b)...

```

Possible properties for an image are `title` `medium`, `dimensions`, `edition`, `author`, `date`, `credit`,
and `link`.

Html comments can be used in the Markdown to mark text not to be included in the transformed Svelte.
