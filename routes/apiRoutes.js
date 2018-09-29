var db = require("../models");

module.exports = function(app) {
  // Get all examples
//   app.get("/api/examples", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.json(dbExamples);
//     });
//   });

    // Create Mail Group
    app.post("/api/mailgroup", function(req, res) {
        db.MailGroup.create(req.body)
        .then(function(result) {
            res.json(result);
        }).catch( function (err) {
            res.status(400).json(err)
        });
    });

    // Create Mail Group
    app.post("/api/maillist", function(req, res) {
        db.MailList.create(req.body)
        .then(function(result) {
            res.json(result);
        }).catch( function (err) {
            res.status(400).json(err)
        });
    });

  // Delete an example by id
//   app.delete("/api/examples/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.json(dbExample);
//     });
//   });
};
