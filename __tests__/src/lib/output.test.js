const output = require('../../../src/lib/output');
const fs = require('fs');

jest.mock('fs', () => {
    return {
        writeFile: jest.fn(),
        existsSync: jest.fn(),
        mkdirSync: jest.fn()
    }
});

describe('Output', () => {
    describe('write', () => {
        beforeEach(() => {
            fs.writeFile = jest.fn();
            fs.existsSync = jest.fn();
            fs.mkdirSync = jest.fn();
        });
        it('should set content to an empty string if it is falsey', () => {
            fs.existsSync.mockImplementation(() => true)
            output.write('some/dest', null);
            expect(fs.writeFile).toHaveBeenCalledWith('some/dest', '', output._writeHandler)
        });
        it('should set content to an empty string if it not falsey', () => {
            fs.existsSync.mockImplementation(() => true)
            output.write('some/dest', 'content');
            expect(fs.writeFile).toHaveBeenCalledWith('some/dest', 'content', output._writeHandler)
        });
    });
    describe('_ensureDirectoryExistence', () => {
        it('should call mkdirSync if the directory doesnt exist',  () => {
            fs.existsSync
                .mockImplementationOnce(() => false)
                .mockImplementationOnce(() => false)
                .mockImplementationOnce(() => true)

            output._ensureDirectoryExistence('/some/path');
            expect(fs.mkdirSync).toHaveBeenCalledWith('/some');
        });
    });
    describe('_writeHandler', () => {

        it('should return a function', () => {
            expect(typeof output._writeHandler(jest.fn(), jest.fn())).toBe('function');
        });
        it('should call reject if there is an error', () => {
            const reject = jest.fn();
            output._writeHandler(jest.fn(), reject)({err: true});
            expect(reject).toHaveBeenCalledWith({err: true})
        });
        it('should call resolve if there is no error', () => {
            const resolve = jest.fn();
            output._writeHandler(resolve, jest.fn())();
            expect(resolve).toHaveBeenCalled()
        })

    });
});
