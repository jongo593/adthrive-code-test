const moment = require('moment');

const PRIVACY_TYPES = {
    public: 'public',
    private: 'private'
};

const OPTIONS = {
    OUTPUT: process.env.OUTPUT || 'csv',
    MODE: process.env.MODE || 'minimal',
    POSTS_FILEPATH: process.env.POSTS_FILEPATH || `${__dirname}/posts.csv`,
    OUTPUT_DEST: process.env.OUTPUT_DEST || `${__dirname}/results/`,
    DATE_FORMAT: process.env.DATE_FORMAT || 'MMM-DD-YYYY',
    DAY: process.env.DAY || moment().format(this.DATE_FORMAT)
};

module.exports = {
    PRIVACY_TYPES,
    OPTIONS
};
