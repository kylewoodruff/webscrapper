const Note = require("../models/Notes");
const moment = require("moment");

module.exports = {
    get: function(data, callback) {
        Note.find({
            _headlineId: data._id
        }, callback);
    },
    save: function(data, callback) {
        let newNote = {
            _headlineId: data._id,
            date: moment(),
            noteText: data.noteText
        };

        Note.create(newNote, function (err, doc) {
            if (err) {
                console.log(err);
                
            } else {
                console.log(doc);
                callback(doc);
            }
        });
    },
    delete: function (data, callback) {
        Note.remove({
            _id:data._id
        }, callback);
    }
};