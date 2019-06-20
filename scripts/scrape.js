// scrape Script
const axios = require("axios");
const cheerio = require("cheerio");

const scrape = function (callback) {
    let articles = [];
    let webUrl = "https://www.nytimes.com/section/technology/personaltech";
    axios.get(webUrl)
        .then(function (res) {
            let $ = cheerio.load(res.data);
            $("article h2").each(function (i, element) {
                let head = $(this).children("a").text().trim();
                // console.log("Article Title:", head);
                let url = $(this).children("a").attr("href");
                // console.log(url);
                let sum = $(this).siblings("p").text().trim();
                // console.log("Article Sum:", sum);
                // console.log("================");
                if (head && sum) {
                    let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                    let sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                    let urlNeat = webUrl + url;
                    // console.log(urlNeat);
                    let datatoAdd = {
                        headline: headNeat,
                        summary: sumNeat,
                        url: urlNeat
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