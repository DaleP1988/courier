// NOTES: need from backend user's name, check if logged in
var db = require("../models")

module.exports = function (app) {

    // load Login page or first page
    app.get("/", function (req, res) {
        res.render("index")
    })

    //GOOGLE INSTALLATION
    app.get("/installation", function (req, res) {
        res.render("installation")
    });

    // load Login page or all other pages

    app.get("/:pages", function(req, res) {
        var pageArr = ["about", "newmail", "newtemp", "setting", "usermail", "usertemp", "", "first", "index", "preview", "sending"]
        var pages = req.params.pages
        if (pageArr.indexOf(pages) > -1) {
            res.render(pages)
        } else {
            res.render("404")
        }
    })

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404")
    });

};

