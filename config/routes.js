const scrape = require("../scripts/scrape");

const headlinesController = require("../controllers/headlines");
const notesController = require("../controllers/notes");

module.exports = function (router) {
    router.get("/", function (req, res) {
        res.render("home", {
            helpers: {
                scripts: "./assets/js/index.js"
            }
        });
    });

    router.get("/saved", function (req, res) {
        res.render("saved", {
            helpers: {
                scripts: function () { return "./assets/js/saved.js" }
            }
        });
    });

    router.get("/api/fetch", function (req, res) {
        headlinesController.fetch(function (err, docs) {

            if (!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No articles today. Check back tomorow!"
                });
            } else {
                res.json({
                    message: "Added " + docs.insertedCount + " new articles!"
                });
            }
        });
    });

    router.get("/api/headlines", function (req, res) {
        let query = {};
        if (req.query.saved) {
            query = req.query;
        }
        headlinesController.get(query, function (data) {
            res.json(data);
        });
    });

    router.delete("/api/headlines/:id", function (req, res) {
        let query = {};
        query._id = req.params.id;
        headlinesController.delete(query, function (err, data) {
            res.json(data);
        });
    });

    router.patch("/api/headlines", function (req, res) {
        let query = {};
        query._id = req.body.id_;
        query.saved = req.body.saved;
        // console.log("routes",query);
        headlinesController.update(query, function (err, data) {
            console.log("routes", data);
            res.json(data);
        });
    });

    router.get("/api/notes/:headline_id?", function (req, res) {
        let query = {};
        // console.log(query);
        
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
            console.log(query);
            
        }
        notesController.get(query, function (err, data) {
            res.json(data);
        });
    });

    router.delete("/api/notes/:id", function (req, res) {
        let query = {};
        query._id = req.params.id;
        notesController.delete(query, function (err, data) {
            res.json(data);
        });
    });

    router.post("/api/notes", function (req, res) {
        notesController.save(req.body, function (data) {
            res.json(data);
        });
    });

}