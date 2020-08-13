const size = require('../../../properties/size/text.json');

test('All text sizes are numbers', () => {
    for (const key in size.size.text) {
        const item = size.size.text[key];
        expect(typeof item.value).toBe('number');
    }
});

test('All line-height are numbers', () => {
    for (const key in size.size["line-height"]) {
        const item = size.size["line-height"][key];
        expect(typeof item.value).toBe('number');
    }
});


test('All text sizes are positives', () => {
    for (const key in size.size.text) {
        const item = size.size.text[key];
        expect(item.value).toBeGreaterThan(0);
    }
});


test('All line-height are positives', () => {
    for (const key in size.size.text) {
        const item = size.size.text[key];
        expect(item.value).toBeGreaterThan(0);
    }
});
