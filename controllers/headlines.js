const scrape = require("../scripts/scrape");
const moment = require("moment");

const Headline = require("../models/Headlines");

module.exports = {
    fetch: function (callback) {
        scrape(function (data) {
            let articles = data;
            articles.forEach(el => {
                articles[el].date = moment();
                articles[el].saved = false;
            });
            // insert articles using mongo function
            Headline.collection.insertMany(articles, { ordered: false }, function (err, docs) {
                callback(err, docs);
            });
        });
    },
    delete: function(query, callback) {
        Headline.remove(query, callback);
    },
    get: function(query, callback) {
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc){
            callback(doc);
        });
    },
    update: function(query, callback) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, callback);
    }
}

