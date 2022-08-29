# OpositaTest design tokens

These are the OpositaTest design tokens for web and app.

The JSONs in this repository are formatted according to the [Style Dictionary][sd] guidelines. Style Dictionary gives possibilities to export them in multiple formats: JS modules, JSON, Sass, Less, etc. (See [formats](https://amzn.github.io/style-dictionary/#/formats))

* [Style Dictionary][sd]
* [opositatest/design-tokens][repo]

## Getting started

### 1. Install the npm package

```shell
npm i -D @opositatest/design-tokens
```

### 2. Use the design tokens in JS or in Scss

#### JS

```js
const designToken = require('@opositatest/design-tokens')
```

#### Scss

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

## Deploy

### 1. Pre-requisites

You have to be logged in your CLI in GitHub and in NPM

* To login in NPM in your CLI:

  ```shell
  npm adduser
  ```

  You will be asked to introduce your username, mail, password and 2FA code (if you have it configured on your account)

* To login in GitHub in yout CLI:

  ```shell
  npm login --scope=@OWNER --registry=https://npm.pkg.github.com
  ```

  You will be asked to introduce your username, mail, password and 2FA code (if you have it configured on your account).
  
  *NOTE:* for the password, is better to introduce the your Personal Access Token

### 2. Changes

In this library, you can make two types of changes, icons and style tokens

#### 2.1 Add/update icon

The icons are on path _/assets/icons_, with subfolders for each type:
* _brand_: OpositaTest branding icons
* _categories_: opposition category icons
* _exam-type_: the icon for the different test types
* _lib_: these are the utility/actions icons
* _payment_: payment methods logos
* _social_: social networks logos
* On the root folder, are icons that didn´t match in any subfolder (this icons will be correctly categorized on next releases)

When you want to add or update an icon, you have to follow this considerations
1. Optimize the SVG: always try to optimize the svg icon to reduce size and avoid redundant svg nodes. You can use any software or service, but always remebeber to check if generated svg is correctly visualized on any browser
2. Add classes on the main _svg_ tag: when you add or update an icon, you always have to add two classes, one named _Icon_ and another named _Icon-*filename\*_ (_*filename\*_ must be replaced with the svg pyshical file name without extension)

    *NOTE:* in the opposition category icons, the second class name is different, it follows this pattern: _Icon-cat-*filename\*_. The file name will be the same as the opposition category slug
3. Replace colors: last step is to replace the color paths in the svg file. You have to replace the hexadecimal color with the literal _currentColor_ that can be overrided by CSS. 
   
   For example, this svg:

    ```svg
    <svg xmlns="http://www.w3.org/2000/svg" fill="#00ff00" viewBox="0 0 24 24">
    .. path nodes ..
    </svg>
    ```

    must be replaced with:

    ```svg
    <svg xmlns="http://www.w3.org/2000/svg" class="Icon Icon-filename" fill="currentColor" viewBox="0 0 24 24">.. path nodes ..</svg>
    ```

#### 2.2 Add/update/remove token

Tokens are the variables used in projects. This variables are distributed as _.scss_ and _.js_ files, and they are generated through _.json_ sources stored in this project

When you want to make changes to this tokens, you have to go the folder _/properties_, with subfolders for each type
* _color_: color variables, each json inside stores each group of colors
* _font_: the font variables, family and weight
* _size_: the different font sizes (this subfolder will be fixed in future releases)
* On the root folder, is spacing values (this json will be correctly categorized on next releases)

Inside each json, tokens are stored as common json objects, using variable name slug parts, as key values

If you make any modification in tokens, you have to launch this command when you finished (or when you want to test if your modifications are ok)

```shell
npm run build
```

This will generate the dist folder that will be distributed on the release, so you can validate that your changes are ok

*NOTE:* if you want to test locally the library, you can copy the _dist_ folder generated, to the _/node_modules/@opositatest/design-tokens_ folder of the project where you want to test your changes

### 3. Commit changes and create PR

When you are changes are finished, you have to follow the common OpositaTest workflow: commit your changes in a branch a create a PR from that branch to merge yout branch in main

*IMPORTANT:* remember to update the version in package.json. In this library we use standard versionning, and you can use RC versioning too. For example, if you want to test a version, you can use X.Y.Z-rc.W and when you confirm that is ok, release the X.Y.Z version and delete the RC release

### 4. Create release draft

Now you have to go to the releases section of the GitHub´s library page and create a new draft by cliking on _"Draft a new release"_ button

Draft fields must be filled with this template:
* Release title: vX.Y.Z, the version commited on the package.json, with an initial _v_ character
* Describe the release: Here you will enum all changes divided in three types _Added, Updated and Removed_

  Template for description:
  ```md
  ## Added
  - List your changes when are additions

  ## Updated
  - List the modifications made on existent variables or icons

  ## Removed
  - List the variables or icons removed on the release
  ```

* Once you have finished, you must click on _"Save draft"_ button

### 5. Create tag and publish

When the PR is reviewed and merged, you have to create the tag in your local environment. Remember that the tag must be created on the _main_ branch updated with latest changes (your merged PR)

1. First run:

    ```shell
    git tag X.Y.Z
    ```

    X.Y.Z are the version number that you set on package.json
2. Next run:
   
    ```shell
    git push --tag
    ```

3. Now, you have to go to the draft that you created on step 4, and choose the tag that you pushed on the _"Choose tag"_ dropdown. Once you´ve selected it, click on button _"Publish release"_

4. Now return to your CLI and finally launch:
   
    ```shell
    npm publish
    ```

Now the release is created and you can update it in the projects that you are usign Design Tokens library

## Changelog

See [releases][releases].
This project use [Semantic Versioning][semver].


[sd]: https://amzn.github.io/style-dictionary
[releases]: https://github.com/opositatest/design-tokens/releases
[semver]: https://semver.org/
[repo]: https://github.com/opositatest/design-tokens
