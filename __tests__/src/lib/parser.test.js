const parser = require('../../../src/lib/parser');

describe('Parser', () => {
    describe('json2csv', () => {
        const json = [{"id":"4839572"}];
        const csv = `"id"
"4839572"`;
        it('should convert a json array to csv', () => {
            expect(parser.json2csv(json)).toBe(csv);
        });
    });
});
