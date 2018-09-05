const utils = require('../../../src/lib/utils');

describe('Utils', () => {
    describe('transformByMode', () => {
        const posts = [
            {
                id: 'somePostId',
                views: 10,
                comments: 10
            }
        ];
        it('should return only the ids if not detailed mode', () => {
            expect(utils.transformByMode(posts, 'minimal')).toEqual([
                {
                    id: 'somePostId'
                }
            ]);
        });
        it('should return only the entire record if detailed mode', () => {
            expect(utils.transformByMode(posts, 'detailed')).toBe(posts);
        });
    });
});
