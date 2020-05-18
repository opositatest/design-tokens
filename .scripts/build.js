// Build path must end in a trailing slash or you will get weird file names.
const buildPath = "./dist/";

const StyleDictionary = require("style-dictionary").extend({
    source: ["./properties/**/*.json"],
    platforms: {
        web: {
            transformGroup: "scss",
            buildPath: buildPath,
            files: [{
                destination: "_tokens.scss",
                format: "scss/variables"
            }],
            actions: ["copy_assets"]
        },
        app: {
            transforms: ["attribute/cti", "name/cti/pascal", "size/remToDPI", "color/css"],
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


// Scales the number by 16
StyleDictionary.registerTransform({
    name: 'size/remToDPI',
    type: 'value',
    matcher: function(prop) {
      return prop.attributes.category === 'size';
    },
    transformer: function(prop) {
      return (prop.original.value * 16);
    }
});


// Build all platforms
StyleDictionary.buildAllPlatforms();
