// NOTES: need from backend user's name, check if logged in
var db = require("../models");

module.exports = function(app) {

    // load Login page or first page
    app.get("/", function(req, res) {
        if ("login is true") {
            res.render("index", { page: {abouttrue: true}, data:{other: true}} )
            // res.render("index")
        } else {
            res.render("login")
        }
    });

    // load Login page or all other pages
    app.get("/:pages", function(req, res) {
        var pages = req.params.pages
        console.log(pages)
        
        if ("login is true" && pages!=="logoff") {
            res.render("index", { page: {[pages]: true}, data:{other: true}} )
            // res.render("index")
        } else {
            res.render("login")
        }
    });

    // Render 404 page for any unmatched routes
    app.get("*", function(req, res) {
        res.render("404")
    });
};
