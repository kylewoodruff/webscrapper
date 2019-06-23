$(document).ready(function () {
    let articleContainer = $(".article-container");

    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headlines?saved=true")
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
            "<h4>Oh no. Looks like you do not have any saved articles.</h4>",
            "<h5>Return to the home page to save available articles</h3>",
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
            "<div class='btn-wrapper'>",
            "<button class='btn btn-primary notes'>",
            "Add Note",
            "</button>",
            "<button class='btn btn-danger delete'>",
            "Delete From Saved",
            "</button>",
            "</div>",
            "</div>",
            "<div class='card-body'>",
            article.summary,
            "</div>",
            "</div>"
        ].join(""));

        panel.data("id_", article._id);
        return panel;
    }

    function handleArticleDelete() {
        let articleToDelete = $(this).parents(".card").data();

        $.ajax({
            method: "DELETE",
            url: "/api/headlines/" + articleToDelete._id
        }).then(function (data) {
            if (data.ok) {
                initPage();
            }
        });
    }

    function handleArticleNotes() {
        let currentArticle = $(this).parents(".card").data();
        console.log("currentArticle:",currentArticle);
        let currentArticleHead = $(this).parent().siblings("h3").text();
        console.log("Article Title:",currentArticleHead);
        let queryUrl = "/api/notes/" + currentArticle.id_;
        console.log("queryURL:",queryUrl);
        $.get(queryUrl).then(function (data) {
            console.log("exsisting notes:",data);
            console.log("Arctice ID:",data._id);
            
            let modalText = [
                "<div class='note-modal container-fluid text-center'>",
                "<h5><strong>Notes for Article: </strong>",
                currentArticleHead,
                "</h5>",
                "<hr />",
                "<ul class='list-group note-container'>",
                "</ul>",
                "<div class='form-group'>",
                "<label class='note-textarea' for='noteTextarea'><strong>Enter Notes Here</strong></label>",
                "<textarea class='form-control' id='noteTextarea' rows='4'></textarea>",
                "</div>",
                "<button class='btn btn-success save'>Save Note</button>",
                "</div>"
            ].join("");
            bootbox.dialog({
                message: modalText,
                closeButton: true
            });
            let noteData = {
                _id: currentArticle.id_,
                notes: data || []
            };
            console.log("NoteData before save:",noteData);
            
            $(".btn.save").data("article", noteData);

            renderNotesList(noteData);
        });

    }

    function renderNotesList(data) {
        let notesToRender = [];
        let currentNote;
        if (!data.notes.length) {
            currentNote = [
                "<li class='list-group-item'>",
                "No notes for this article yet.",
                "</li>"
            ].join("");
            notesToRender.push(currentNote);
        } else {
            data.notes.forEach(el => {
                currentNote = $([
                    "<li class='list-group-item note'>",
                    el.noteText,
                    "<button class='btn btn-danger note-delete'>x</button>",
                    "</li>"
                ].join(""));

                currentNote.children("button").data("_id", el._id);

                notesToRender.push(currentNote);
            });
        }
        $(".note-container").append(notesToRender);
    }

    function handleNoteSave() {
        let noteData;
        let newNote = $(".bootbox-body textarea").val().trim();
        console.log("Note Content",newNote);
        if (newNote) {
            console.log("im here:");
            noteData = {
                _id: $(this).data("article")._id,
                noteText: newNote
            };
            // console.log("noteData: ",noteData._id);
            
            $.post("/api/notes", noteData).then(function () {
                bootbox.hideAll();
            });
        }
    }

    function handleNoteDelete() {
        let noteToDelete = $(this).data("_id");
        $.ajax({
            url: "/api/notes/" + noteToDelete,
            method: "DELETE"
        }).then(function () {
            bootbox.hideAll();
        });
    }
});