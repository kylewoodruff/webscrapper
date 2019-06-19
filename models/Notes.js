const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema= new Schema({
    _headlineId: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    date: String,
    noteText: String
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;