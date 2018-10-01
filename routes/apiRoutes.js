var db = require("../models");

module.exports = function(app) {
  // Get all examples
  //   app.get("/api/examples", function(req, res) {
  //     db.Example.findAll({}).then(function(dbExamples) {
  //       res.json(dbExamples);
  //     });
  //   });

  // Get user's mail group and emails
  // app.get("/api/mailgroup/:userid", function(req, res) {
  //     var query = {Userid: req.params.userid}
  //     db.MailGroup.findAll({
  //         where: query,
  //         include: [ db.MailList]
  //     }).then(function(results) {
  //         res.json(results);
  //     });
  // });

  // Find User info
  app.get("/api/user/:email", function(req, res) {
    db.User.findOne({
      where: {
        googleUser: req.params.email
      }
    }).then(function(result) {
      if (result) {
        res.json(result);
      } else {
        res.json(false);
      }
    });
  });

  // Find Mail Group and List for user
  app.get("/api/mailgroup/:user", function(req, res) {
    // var query = {Userid: req.params.user}
    var query = { Userid: "1" };
    db.MailGroup.findAll({
      where: query,
      include: [db.MailList]
    }).then(function(results) {
      res.json(results);
    });
  });

  // create Users
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(result) {
      res.json(result);
    });
  });

  // Create Mail Group
  app.post("/api/mailgroup", function(req, res) {
    db.MailGroup.create(req.body)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.status(400).json(err);
      });
  });

  // Create Mail Group
  app.post("/api/maillist", function(req, res) {
    db.MailList.create(req.body)
      .then(function(result) {
        res.json(result);
      })
      .catch(function(err) {
        res.status(400).json(err);
      });
  });
  var oAuth2Client;
  //GOOGLE SIDE INSTALLATION
  app.get("/api/installation/authUrl", function(req, res) {
    require("../googleSetUp/gAuthLink").then(function(result) {
      var authUrl = result.authUrl;
      oAuth2Client = result.oAuth2Client;
      res.send(authUrl);
    });
  });
  app.post("/api/installation/authUrl", function(req, res) {
    var getTokens = require("../googleSetUp/gAuthToken");

    getTokens(req.body.data, oAuth2Client).then(function(token) {
      if (!token.access_token) {
        res.send("failure");
      } else {
        
        res.send("success");
      }
    });
  });

  // Delete an example by id
  //   app.delete("/api/examples/:id", function(req, res) {
  //     db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //       res.json(dbExample);
  //     });
  //   });
};
