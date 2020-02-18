// Build path must end in a trailing slash or you will get weird file names.
const buildPath = "./dist/";

const StyleDictionary = require("style-dictionary").extend({
    source: ["./src/properties/**/*.json"],
    platforms: {
        scss: {
            transformGroup: "scss",
            buildPath: buildPath,
            files: [{
                destination: "_token.scss",
                format: "scss/variables"
            }]
        },
        js: {
        transformGroup: "js",
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
