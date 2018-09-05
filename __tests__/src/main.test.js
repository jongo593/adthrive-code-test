const { main } = require('../../src/main');
const output = require('../../src/lib/output');
const parser = require('../../src/lib/parser');

jest.mock('../../src/lib/output', () => {
    return {
        write: jest.fn()
    }
});

describe('main', () => {
    beforeEach(() => {
        output.write.mockReset();
    });

    it('should output to csv', async () => {
        const parserSpy = jest.spyOn(parser, 'json2csv');
        await main({
            DAY: 'Oct-04-2015',
            OUTPUT: 'csv',
            OUTPUT_DEST: `/results/`,
            MODE: 'minimal',
            POSTS_FILEPATH: './posts.csv'
        });
        expect(parserSpy).toHaveBeenCalledTimes(3)
    });

    it('should output to json', async () => {
        const stringifySpy = jest.spyOn(JSON, 'stringify');
        await main({
            DAY: 'Oct-04-2018',
            OUTPUT: 'json',
            OUTPUT_DEST: `/results/`,
            MODE: 'minimal',
            POSTS_FILEPATH: './posts.csv'
        });
        expect(stringifySpy).toHaveBeenCalledTimes(3)
    });
})
