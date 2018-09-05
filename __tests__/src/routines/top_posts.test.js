const TopPosts = require('../../../src/routines/top_posts');
const posts = require('../../../__mocks__/posts.json');
const TOP_POST = {"id":"4839572","title":"New Test Detects Autism in Infants","privacy":"public","likes":"93","views":"19818","comments":"13","timestamp":"Fri Oct 04 07:12:04 2015"};
describe('Top Posts Module', () => {
    describe('topPosts', () => {
        it('should return an object containing topPosts and otherPosts', () => {
            const topPosts = TopPosts.topPosts(posts)
            expect(topPosts).toHaveProperty('topPosts');
            expect(topPosts).toHaveProperty('otherPosts');
        });
        it('should not mutate posts', () => {
            const postsCopy = [...posts];
            TopPosts.topPosts(postsCopy);
            expect(postsCopy).toEqual(posts);
        });
    });
    describe('dailyTopPosts', () => {
        it('should return a post', () => {
            const dailyTopPost = TopPosts.dailyTopPosts(posts, 'Oct-04-2015');
            expect(dailyTopPost).toBeTruthy();
        });
        it('should not return a post', () => {
            const dailyTopPost = TopPosts.dailyTopPosts(posts, 'Oct-04-2018');
            expect(dailyTopPost).toBe(undefined);
        });
    });
    describe('_isTopPost', () => {
        it(`should return true if: 
            * The post must be public 
            * The post must have over 10 comments and over 9000 views
            * The post title must be under 40 characters`, () => {
            expect(TopPosts._isTopPost(TOP_POST)).toBe(true);
        });

        it('should return false if the privacy is not public', () => {
            expect(TopPosts._isTopPost({privacy: 'private'})).toBe(false);
        });
        it('should return false if there is not enough comments', () => {
            expect(TopPosts._isTopPost({comments: '9'})).toBe(false);
        });
        it('should return false if there is not enough views', () => {
            expect(TopPosts._isTopPost({views: '8999'})).toBe(false);
        });
        it('should return false if the title is too long', () => {
            expect(TopPosts._isTopPost({title: 'some very long long long long long long long title'})).toBe(false);
        });
    });
});
