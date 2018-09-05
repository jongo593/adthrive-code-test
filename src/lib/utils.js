const _  = require('lodash');

function transformByMode(posts, mode) {
    if(mode !== 'detailed') {
        return _.map(posts, (post) => ({id: post.id}));
    }
    return posts;
}

module.exports = {
    transformByMode
};
