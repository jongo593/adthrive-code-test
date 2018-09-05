const Json2csvParser = require('json2csv').Parser;
const _ = require('lodash');

function json2csv(jsonArray) {
    return new Json2csvParser({fields: _.keys(_.first(jsonArray))}).parse(jsonArray);
}

module.exports = {
    json2csv
};
