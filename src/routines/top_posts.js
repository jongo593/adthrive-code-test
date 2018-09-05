const _ = require('lodash');
const { PRIVACY_TYPES, OPTIONS } = require('../../constants');
const moment = require('moment');

function _isTopPost(post) {

    const TOP_POST_COMMENT_COUNT = 10;
    const TOP_POST_VIEW_COUNT = 9000;
    const TOP_POST_TITLE_LIMIT = 40;

    if(post.privacy !== PRIVACY_TYPES.public) {
        return false;
    }

    if(Number(post.comments) <= TOP_POST_COMMENT_COUNT) {
        return false
    }

    if(Number(post.views) <= TOP_POST_VIEW_COUNT) {
        return false;
    }

    return post.title.length < TOP_POST_TITLE_LIMIT;
}

function _filterPosts(day) {
    // moment will throw a warning about improper date format.
    // For the purposes of this test, this is sufficient and the warning can be ignored.
    return posts => moment(new Date(posts.timestamp)).format(OPTIONS.DATE_FORMAT) === day;
}

/**
 * Function that splits the given posts into top posts and non-top posts.
 * @param posts [Posts]
 * @return {{topPosts, otherPosts}}
 */
function topPosts(posts) {
    const postsCopy = [...posts];
    const
        topPosts= _.remove(postsCopy, _isTopPost);
    return {
        topPosts,
        otherPosts: postsCopy
    }
}

/**
 * Function to find the top post by likes for a given day.
 * @param posts [Posts]
 * @param day {String}
 * @returns {Post}
 */
function dailyTopPosts(posts, day) {
    const postsForDay = _.filter(posts, _filterPosts(day));
    return _.maxBy(postsForDay, 'likes');
}

module.exports = {
    topPosts,
    dailyTopPosts,
    _filterPosts,
    _isTopPost
};
