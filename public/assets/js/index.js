$(document).ready(function () {
    let articleContainer = $(".article-container");
    $(document).on("click", ".btn-save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
            .then(function (data) {
                if (data && data.length) {
                    renderArticles(data);
                } else {
                    renderEmpty();
                }
            });
    }

    function renderEmpty() {
        let emptyAlert = $([
            "<div class='alert alert-warning text-center'>",
            "<h4>Uh oh. Looks like we do not have any new articles.</h4>",
            "</div>",
            "<div class='card card-default'>",
            "<div class='card-heading text-center'>",
            "<h3>What would you like to do?</h3>",
            "</div>",
            "<div class='card-body text-center'>",
            "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
            "<h4><a href'/saved'>Go to Saved Articles</a><h4>",
            "</div>",
            "</div>"
        ].join(""));
        articleContainer.append(emptyAlert);
    }

    function renderArticles(articles) {
        let articlePanels = [];

        articles.forEach(el => {
            articlePanels.push(createPanel(el));
        });
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        let panel = $([
            "<div class='card card-default'>",
            "<div class='card-heading'>",
            "<h3>",
            article.headline,
            "</h3>",
            "<a class='btn btn-primary save'>",
            "Save Article",
            "</a>",
            "</div>",
            "<div class='card-body'>",
            article.summary,
            "</div>",
            "</div>"
        ].join(""));

        panel.data("id_", article._id);
        return panel;
    }

    function handleArticleSave() {
        let articleToSave = $(this).parents(".card").data();
        articleToSave.saved = true;

        $.ajax({
            method: "PATCH",
            url: "/api/healines",
            data: articleToSave
        })
            .then(function (data) {
                if (data.ok) {
                    initPage();
                }
            });
    }

    function handleArticleScrape() {
        $.get("/api/fetch")
            .then(function (data) {
                initPage();
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
            })
    }


    // $.getJSON("/articles", function(data) {
    //     data.forEach(i => {
    //         $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    //     });
    //   });

});