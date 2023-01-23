const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;
const { optimize } = require("svgo");
const { parse, stringify } = require("svgson");

const replaceHexColors = (svgElement) => {
  if (svgElement.attributes) {
    for (const [key, value] of Object.entries(svgElement.attributes)) {
      const hexColorRegex = /#[0-9A-Fa-f]{6}/g;
      if (hexColorRegex.test(value)) {
        svgElement.attributes[key] = value.replace(
          hexColorRegex,
          "currentColor"
        );
      }
    }
  }

  if (svgElement.children) {
    svgElement.children.forEach((child) => {
      replaceHexColors(child);
    });
  }
};

const modifiedFiles = execSync(
  "git status --porcelain | cut -c 1-3 --complement"
)
  .toString()
  .split("\n")
  .filter((file) => file.endsWith(".svg"));

modifiedFiles.forEach((file) => {
  fs.readFile(file, (err, data) => {
    if (err) throw err;

    const result = optimize(data, {
      path: file,
      multipass: true,
      js2svg: {
        indent: 2,
        pretty: true,
      },
      plugins: [
        {
          name: "convertShapeToPath",
          params: {
            convertArcs: true,
          },
        },
        {
          name: "removeAttrs",
          params: {
            attrs: "(stroke)",
          },
        },
        {
          name: "convertColors",
          params: {
            currentColor: true,
          },
        },
        {
          name: "cleanupNumericValues",
          params: {
            floatPrecision: 2
          }
        },
        {
          name: "convertPathData",
          params: {
            floatPrecision: 2
          }
        },
        {
          name: "convertTransform",
          params: {
            floatPrecision: 2
          }
        },
        {
          name: "cleanupListOfValues",
          params: {
            floatPrecision: 2
          }
        },
        "reusePaths",
        "removeDoctype",
        "removeXMLProcInst",
        "removeMetadata",
        "removeEditorsNSData",
        "cleanupAttrs",
        "mergeStyles",
        "inlineStyles",
        "convertStyleToAttrs",
        "cleanupIds",
        "removeUselessDefs",
        "removeUnknownsAndDefaults",
        "removeNonInheritableGroupAttrs",
        "removeUselessStrokeAndFill",
        "cleanupEnableBackground",
        "removeHiddenElems",
        "removeEmptyText",
        "convertShapeToPath",
        "moveElemsAttrsToGroup",
        "moveGroupAttrsToElems",
        "collapseGroups",
        "convertEllipseToCircle",
        "convertTransform",
        "removeEmptyAttrs",
        "removeEmptyContainers",
        "mergePaths",
        "mergePaths",
        "removeUnusedNS",
        "sortDefsChildren",
        "removeTitle",
        "removeDesc",
        "removeDimensions",
        "removeScriptElement",
        "removeStyleElement",
      ],
    });

    parse(result.data, {
      camelcase: true,
    }).then((svgTree) => {
      let className = path.basename(file).split(".svg").join("");
      if (file.indexOf("categories") !== -1) {
        className = `cat-${className}`;
      }

      svgTree.attributes = {
        ...svgTree.attributes,
        class: `Icon Icon-${className}`,
      };

      // replaceHexColors(svgTree);

      const updatedSvgContent = stringify(svgTree);
      fs.writeFile(file, updatedSvgContent, (err) => {
        if (err) throw err;
      });
    });
  });
});
