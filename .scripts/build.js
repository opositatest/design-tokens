// Build path must end in a trailing slash or you will get weird file names.
const buildPath = "./dist/";

const StyleDictionary = require("style-dictionary").extend({
    source: ["./properties/**/*.json"],
    platforms: {
        web: {
            transformGroup: "scss",
            buildPath: buildPath,
            files: [{
                destination: "_token.scss",
                format: "scss/variables"
            }],
            actions: ["copy_assets"]
        },
        app: {
            transforms: ["attribute/cti", "name/cti/pascal", "size/remToDp", "color/css"],
            buildPath: buildPath,
            files: [
                {
                    destination: "designTokens.js",
                    format: "javascript/es6"
                },
            ],
        }
    },
});

StyleDictionary.buildAllPlatforms();
