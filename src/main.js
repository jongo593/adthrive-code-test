const csvtojson = require("csvtojson");
const path = require('path');
const TopPosts = require('./routines/top_posts');
const parser = require('./lib/parser');
const output = require('./lib/output');
const utils = require('./lib/utils');

async function _loadPosts(OPTIONS) {
    return await csvtojson().fromFile(OPTIONS.POSTS_FILEPATH);
}

async function main(OPTIONS) {
    let outputType = 'json';

    const postsJson = await _loadPosts(OPTIONS)

    let {
        topPosts,
        otherPosts
    } = TopPosts.topPosts(postsJson);

    let dailyTopPost = TopPosts.dailyTopPosts(topPosts, OPTIONS.DAY);

    if(dailyTopPost) {
        dailyTopPost = [dailyTopPost]
    }

    topPosts = utils.transformByMode(topPosts, OPTIONS.MODE)
    otherPosts = utils.transformByMode(otherPosts, OPTIONS.MODE)
    dailyTopPost = utils.transformByMode(dailyTopPost, OPTIONS.MODE)
    if(OPTIONS.OUTPUT !== 'json') {
        // output csv
        outputType = 'csv';
        topPosts = parser.json2csv(topPosts);
        otherPosts = parser.json2csv(otherPosts);
        dailyTopPost = parser.json2csv(dailyTopPost);
    } else {
        topPosts = JSON.stringify(topPosts);
        otherPosts = JSON.stringify(otherPosts);
        dailyTopPost = JSON.stringify(dailyTopPost);
    }

    return Promise.all([
        output.write(path.join(OPTIONS.OUTPUT_DEST, `top_posts.${outputType}`), topPosts),
        output.write(path.join(OPTIONS.OUTPUT_DEST, `other_posts.${outputType}`), otherPosts),
        output.write(path.join(OPTIONS.OUTPUT_DEST, `daily_top_posts.${outputType}`), dailyTopPost),
    ]);
}

module.exports = {
    main,
    _loadPosts
}
