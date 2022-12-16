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

1. Configure Sass to import files from `node*modules/`

    ```js
    options: {
        includePaths: [ 'node*modules/' ]
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

* To login in GitHub in your CLI:

  ```shell
  npm login --scope=@OWNER --registry=https://npm.pkg.github.com
  ```

  You will be asked to introduce your username, mail, password and 2FA code (if you have it configured on your account).
  
  *NOTE:* for the password, is better to introduce the your Personal Access Token. You need a *[personal access token](https://github.com/settings/tokens/)* with `write:packages` and `read:packages` scope to publish and install packages from GitHub Package Registry. (Your user must be access to the [design-tokens](repo) repository)

Also, yoy can check [Authenticating to GitHub packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages) in GitHub documentation.

### 2. Changes

In this library, you can make two types of changes, icons and style tokens

#### 2.1 Add/update icon

The icons are on path */assets/icons*, with sub-folders for each type:

* *brand*: OpositaTest branding icons
* *categories*: opposition category icons
* *exam-type*: the icon for the different test types
* *lib*: these are the utility/actions icons
* *payment*: payment methods logos
* *social*: social networks logos
* On the root folder, are icons that didn´t match in any subfolder (this icons will be correctly categorized on next releases)

When you are adding or updating icons, you hace to optimize them to remove useless nodes added by Figma and change HEX colors that are susceptible to change by CSS. For doing this, you have two options, using the automated script or doing it manually

#### 2.1.1 By script

1. Place the icon in its corresponding folder and with its final name
2. In the CLI, launch this command:

```shell
npm run minify:svg
```

3. The icon/s will be minified, added the class name and hexadecimal colors replaced by "currentColor" to allow to be changed by CSS
4. Review all the icons changed, the script is not infallible and could break the SVG. In this case, you have to update the SVG manually

#### 2.1.2 Manually

When you want to add or update an icon manually, you have to follow this considerations

1. Optimize the SVG: always try to optimize the svg icon to reduce size and avoid redundant svg nodes. You can use any software or service, but always remebeber to check if generated svg is correctly visualized on any browser
2. Add classes on the main *svg* tag: when you add or update an icon, you always have to add two classes, one named *Icon* and another named *Icon-\*filename\** (**filename\** must be replaced with the svg pyshical file name without extension)

    *NOTE:* in the opposition category icons, the second class name is different, it follows this pattern: *Icon-cat-*filename\**. The file name will be the same as the opposition category slug
3. Replace colors: last step is to replace the color paths in the svg file. You have to replace the hexadecimal color with the literal *currentColor* that can be overrided by CSS.

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

Tokens are the variables used in projects. This variables are distributed as *.scss* and *.js* files, and they are generated through *.json* sources stored in this project

When you want to make changes to this tokens, you have to go the folder */properties*, with sub-folders for each type

* *color*: color variables, each json inside stores each group of colors
* *font*: the font variables, family and weight
* *size*: the different font sizes (this subfolder will be fixed in future releases)
* On the root folder, is spacing values (this json will be correctly categorized on next releases)

Inside each json, tokens are stored as common json objects, using variable name slug parts, as key values

If you make any modification in tokens, you have to launch this command when you finished (or when you want to test if your modifications are ok)

```shell
npm run build
```

This will generate the dist folder that will be distributed on the release, so you can validate that your changes are ok

*NOTE:* if you want to test locally the library, you can copy the *dist* folder generated, to the */node*modules/@opositatest/design-tokens* folder of the project where you want to test your changes

### 3. Commit changes and create PR

When you are changes are finished, you have to follow the common OpositaTest workflow: commit your changes in a branch a create a PR from that branch to merge yout branch in main

*IMPORTANT:* remember to update the version in package.json. In this library we use standard versioning, and you can use RC versioning too. For example, if you want to test a version, you can use X.Y.Z-rc.W and when you confirm that is ok, release the X.Y.Z version and delete the RC release

### 4. Create release draft

Now you have to go to the releases section of the GitHub´s library page and create a new draft by clicking on *"Draft a new release"* button

Draft fields must be filled with this template:
* Release title: vX.Y.Z, the version commited on the package.json, with an initial *v* character
* Choose a tag: Leave empty, because tag is not created yet
* Target: When the PR is merged, we will always work on *main* branch, so leave this field with main branch selected
* Describe the release: Here you will enum all changes divided in three types *Added, Updated and Removed*

  Template for description:

  ```md
  ## Added
  - List your changes when are additions

  ## Updated
  - List the modifications made on existent variables or icons

  ## Removed
  - List the variables or icons removed on the release
  ```

* Once you have finished, you must click on *"Save draft"* button

### 5. Create tag and publish

When the PR is reviewed and merged, you have to create the tag in your local environment. Remember that the tag must be created on the *main* branch on your local environment, updated with latest changes (your merged PR)

1. First run:

    ```shell
    git tag X.Y.Z
    ```

    X.Y.Z are the version number that you set on package.json
2. Next run:

    ```shell
    git push --tag
    ```

3. Now, you have to go to the draft that you created on step 4, and choose the tag that you pushed on the *"Choose tag"* dropdown. Once you´ve selected it, click on button *"Publish release"*

4. Now return to your CLI and finally launch:

    ```shell
    npm publish
    ```

Now the release is created and you can update it in the projects that you are using Design Tokens library

### Deploy process summary

1. Make your changes in a branch, commit them and create a PR (don´t forget to update version in the package.json!)
2. Create the release draft
3. When the PR is reviewed (by you or another co-worker), merge it
4. In your local environment, change to main branch and make a git pull to get the latest changes
5. Follow the process to create the tag in your local
6. Return to release draft in GitHub, set the recently created tag on the "Choose a tag" drodpdown and click on *Publish release* button
7. In your local, launch the *npm publish* command

*Considerations:*

* You can use RC versions temporarily on the projects, but when the final release is launched, remember to update on the projects using the RC release
* You can push directly to main branch the version changes in package.json. For example, if you change from X.Y.Z-rc.W to X.Y.Z only, you don´t have to create a PR for doing that, you can directly push the change to main
* You can delete RC releases if the final release is launched

## SVG icons update guide (manually)

In this guide we will use the [SVGOMG][svgomg] online converter

1. Copy the source code of the SVG from your preferred editor (like VS Code)
2. Paste the source code on the left menu option *Paste markup* of SVGOMG site
3. Once you pasted it, you will be redirected to editor view, there you can see an options bar on the right of the screen. You have to change this settings from default values:
   1. Style to attributes: activate
   2. Remove viewBox: deactivate
   3. Prefer viewBox to width/heigh: activate
   4. Remove style elements: activate
   5. Remove script elements: activate
4. When this changes are applied, you can copy the minified markup by pressing the copy button or download by pressing the blue download button. Both are on the bottom right zone of the editor
5. Paste the markup on your editor, and change the classes and color as pointed on [2.1 Add/update icon](#2-1-add-update-icon) sectionç

*VSCode Extension*

If you use VSCode, I recommend this [extension][svgextension] to work with the SVG icons. It has autocompletion and a preview/editor where you can see if the icon is correctly visualized after minifcation, and you can see what colors are you changing when you are setting the *currentColor* on node fills

## Changelog

See [releases][releases].
This project use [Semantic Versioning][semver].

[sd]: https://amzn.github.io/style-dictionary
[releases]: https://github.com/opositatest/design-tokens/releases
[semver]: https://semver.org/
[repo]: https://github.com/opositatest/design-tokens
[svgomg]: https://jakearchibald.github.io/svgomg/
[svgextension]: https://marketplace.visualstudio.com/items?itemName=jock.svg
