# OpositaTest design tokens

These are the OpositaTest design tokens for web and app.

The JSONs in this repository are formatted according to the [Style Dictionary][sd] guidelines. Style Dictionary gives possibilities to export them in multiple formats: JS modules, JSON, Sass, Less, etc. (See [formats](https://amzn.github.io/style-dictionary/#/formats))

* [Style Dictionary][sd]
* [opositatest/design-tokens][repo]


## Getting started
### 1. Install the npm package.
```shell
npm i -D @opositatest/design-tokens
```

### 2. Use the design tokens in JS or in Scss:

#### JS:

```js
const designToken = require('@opositatest/design-tokens')
```


#### Scss:

1. Configure Sass to import files from `node_modules/`
    ```js
    options: {
        includePaths: [ 'node_modules/' ]
      }
    }
    ```

2. Use it in a Sass file
    ```scss
    @use '@opositatest/design-tokens/dist/tokens';

    .element {
      color: tokens.$color-neutral-dark-80;
    }
    ```


## Changelog

See [releases][releases].
This project use [Semantic Versioning][semver].



[sd]: https://amzn.github.io/style-dictionary
[releases]: https://github.com/opositatest/design-tokens/releases
[semver]: https://semver.org/
[repo]: https://github.com/opositatest/design-tokens
