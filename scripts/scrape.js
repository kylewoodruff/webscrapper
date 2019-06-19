// scrape Script
const axios = require("axios");
const cheerio = require("cheerio");

const scrape = function (callback) {
    let articles = [];
    axios.get("https://www.nytimes.com/section/technology/personaltech")
        .then(function (res) {
            let $ = cheerio.load(res.data);
            $("article h2").each(function (i, element) {
                let head = $(this).children("a").text().trim();
                console.log("Article Title:", head);
                let sum = $(this).siblings("p").text().trim();
                console.log("Article Sum:", sum);
                console.log("================");
                if (head && sum) {
                    let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                    let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                    let datatoAdd = {
                        headline: headNeat,
                        summary: sumNeat
                    };
                    articles.push(datatoAdd);
                }
            });
            callback(articles);
        })
        .catch(function (error) {
            console.log(error);
        });
};
// testing function
// scrape(function (res) {
//     console.log(res);
// });

module.exports = scrape;