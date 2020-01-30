# OpositaTest design tokens

These are the OpositaTest design tokens for web and app.

The JSONs in this repository are formatted according to the [Style Dictionary][sd] guidelines. **Do not load it them directly**. [Style Dictionary][sd] gives possibilities to export them in multiple formats: JS modules, JSON, Sass, Less, etc. (See [formats](https://amzn.github.io/style-dictionary/#/formats))

* [Style Dictionary][sd]
* [opositatest/design-tokens][repo]


## Getting started
1. Install the package and the [Style Dictionary][sd] tool.
```shell
npm i -D @opositatest/design-tokens style-dictionary
```

2. Create the configuration file (`style-dictionary.config.json`) according with your necessities.

<details>
  <summary>Example for Sass:</summary>

```json
{
  "source": ["./tokens/properties/*.json"],
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "./assets/scss/library/",
      "files": [{
      "destination": "_tokens.scss",
      "format": "scss/variables",
      }]
    }
  }
}
```

</details>


<details>
  <summary>Example for JSON:</summary>

```json
{
  "source": ["./tokens/properties/*.json"],
  "platforms": {
    "json": {
      "transformGroup": "js",
      "buildPath": "./assets/library/",
      "files": [{
      "destination": "_tokens.json",
      "format": "json/flat",
      }]
    }
  }
}
```

</details>

3. Export the design tokens with the command `style-dictionary build`


## Changelog

See [releases][odtr].
This project use [Semantic Versioning][semver].




[sd]: https://amzn.github.io/style-dictionary
[odt]: https://github.com/opositatest/design-tokens/
[odtr]: https://github.com/opositatest/design-tokens/releases
[semver]: https://semver.org/
[repo]: https://github.com/opositatest/design-tokens
