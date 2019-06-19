$(document).ready(function () {
    let articleContainer = $(".article-container");

    $(document).on("click", ".bth.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".bth.save", handleNoteSave);
    $(document).on("click", ".bth.note-delete", handleNoteDelete);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headlines?saved=true")
        .then(function(data){
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
            "<div class='panel panel-default'>",
            "<div class='panel-heading text-center'>",
            "<h3>Would you like to browse available articles?</h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
            "<h4><a href'/'>Browse Articles</a><h4>",
            "</div>",
            "</div>"
        ].join(""));
        articleContainer.append(emptyAlert);
    }

    function renderArticles(articles) {
        let articlePanels = [];
    
        articles.forEach(el => {
            articlePanels.push(createPanel(articles[el]));
        });
        articleContainer.append(articlePanels);
    }

    unction createPanel(article) {
        let panel = $([
            "<div class='panel panel-default'>",
            "<div class='panel-heading'>",
            "<h3>", 
            article.headline,
            "<a class='btn btn-danger delete'>",
            "Delete From Saved",
            "</a>",
            "</h3>",
            "</div>",
            "<div class='panel-body'>",
            article.summary,
            "</div>",
            "</div>"
        ].join(""));
    
        panel.data("id_", article._id);
        return panel;
    }



});