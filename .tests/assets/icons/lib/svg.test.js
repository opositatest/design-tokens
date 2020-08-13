const path = require('path');
const fs = require('fs');
const parser = require('svg-parser').parse;


test('SVG icons inside lib/ cannot have height property at root', () => {
    expect(allPropertyShouldBe('height', false)).toBe(true);
});

test('SVG icons inside lib/ cannot have width property at root', () => {
    expect(allPropertyShouldBe('width', false)).toBe(true);
});

test('SVG icons inside lib/ must have class property at root', () => {
    expect(allPropertyShouldBe('class', true)).toBe(true);
});


const directoryPath = path.join(__dirname, '../../../../assets/icons/lib/');

function getIcons() {
    return fs.readdirSync(directoryPath, (err, files) => {
        if (err) throw new Error(err);
        return files
    });
}

function getIconProperties(filename) {
    const filePath = path.join(directoryPath, filename);
    const svg = parser(fs.readFileSync(filePath).toString('utf8'));
    return svg.children[0].properties
}


function allPropertyShouldBe(property, desirable) {
    const files = getIcons();

    let allResults = []
    files.forEach(function (file) {
        const properties = getIconProperties(file);
        allResults.push({file, hasProperty: property in properties})
    });

    return !allResults.some( result => result.hasProperty === !desirable )
}
