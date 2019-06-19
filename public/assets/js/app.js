$.getJSON("/articles", function(data) {
    data.forEach(i => {
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    });
  });