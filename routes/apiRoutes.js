var db = require("../models");
const request = require('request')
const axios = require('axios')

module.exports = function (app) {

  // Find User info
  app.get("/api/user/:email", function (req, res) {
    db.User.findOne({
      where: {
        googleUser: req.params.email
      }
    }).then(function (result) {
      if (result) {
        res.json(result);
      } else {
        res.json(false);
      }
    })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });


  // Create Users
  app.post("/api/user", function (req, res) {
    db.User.create(req.body).then(function (result) {
      res.json(result);
    })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });

  // Update Users
  app.put("/api/users", function (req, res) {
    db.User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      img: req.body.img
    }, {
        where: {
          googleUser: req.body.googleUser
        }
      }).then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });

  // Create Mail Group
  app.post("/api/mailgroup", function (req, res) {
    db.MailGroup.create(req.body)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });

  // Delete from Mail List
  app.delete("/api/mailgroup/:id", function (req, res) {
    db.MailGroup.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });

  // Update Mail Group
  app.put("/api/mailgroup", function (req, res) {
    db.MailGroup.update({
      lable: req.body.lable
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (result) {
        res.json(result);
      });
  });

  // Create Mail List
  app.post("/api/maillist", function (req, res) {
    db.MailList.create(req.body)
      .then(function (result) {
        res.json(result);
      })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });

  // Delete from Mail List
  app.delete("/api/maillist/:id", function (req, res) {
    db.MailList.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });

  // Update Mail List
  app.put("/api/maillist", function (req, res) {
    db.MailList.update({
      name: req.body.name,
      email: req.body.email
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (result) {
        res.json(result);
      });
  });

  // Create Mail Group
  // app.post("/api/mailgroup", function(req, res) {
  //   db.MailGroup.create(req.body)
  //   .then(function(result) {
  //       res.json(result)
  //   }).catch( function (err) {
  //       res.status(400).json(err)
  //   })
  // })

  // Create Mail Group
  // app.post("/api/mailgroup", function(req, res) {
  //   db.MailGroup.create(req.body)
  //     .then(function(result) {
  //       res.json(result);
  //     })
  //     .catch(function(err) {
  //       res.status(400).json(err);
  //     });
  // });


  // Find Mail Group and List for user
  app.get("/api/mailgroup/:user", function (req, res) {
    var query = { Userid: req.params.user };
    db.MailGroup.findAll({
      where: query,
      include: [db.MailList]
    }).then(function (results) {
      res.json(results);
    })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });

  // Find New Templat HTML
  app.get("/api/newtemp/:temp", function (req, res) {
    db.Newtemps.findOne({
      where: {
        lable: req.params.temp
      }
    }).then(function (result) {
      res.json(result);
    })
      .catch(function (err) {
        res.status(400).json(err);
      });
  });

  var oAuth2Client;
  //GOOGLE SIDE INSTALLATION
  app.get("/api/installation/authUrl", function (req, res) {
    require("../googleSetUp/gAuthLink").then(function (result) {
      var authUrl = result.authUrl;
      oAuth2Client = result.oAuth2Client;
      res.send(authUrl);
    });
  });
  app.post("/api/installation/authUrl", function (req, res) {
    var getTokens = require("../googleSetUp/gAuthToken");
    getTokens(req.body.data, oAuth2Client).then(function (token) {
      if (!token.access_token) {
        res.send("failure");
      } else {
        var courierSheetId;
        oAuth2Client.setCredentials(token);
        var createSheet = require("../googleSetUp/gAddSheet");
        createSheet(oAuth2Client).then(function (response) {
          courierSheetId = response.spreadsheetId;
          console.log(response);
          var createScript = require("../googleSetUp/gAddScript");
          createScript(oAuth2Client, courierSheetId).then(function (response) {
            console.log(response);
            var userReqLink = response.reqLink.webApp.url;
            var userId = JSON.parse(req.body.user).id;
            db.User.update(
              { emailReqLink: userReqLink },
              { where: { id: userId } }
            ).then(function (result) {
              oAuth2Client = null;
              res.send(response.authLink);
            });
          });
        });
      }
    });
  });

  // // Create Mail Group
  // app.post("/api/mailgroup", function (req, res) {
  //   db.MailGroup.create(req.body)
  //     .then(function (result) {
  //       res.json(result);
  //     })
  //     .catch(function (err) {
  //       res.status(400).json(err);
  //     });
  // });

  // // Create Mail Group
  // app.post("/api/maillist", function (req, res) {
  //   db.MailList.create(req.body)
  //     .then(function (result) {
  //       res.json(result);
  //     })
  //     .catch(function (err) {
  //       res.status(400).json(err);
  //     });
  // });


  // Sending Emails

  app.post("/api/sendEmail", function (req, res) {
    let mailList;
    let emailInfo;

    mailList = req.body.package.mailList;
    emailInfo = req.body.package.emailInfo;
    db.User.findOne({
      where: {
        id: req.body.userId
      }
    }).then(function (result) {
      if (result) {
        var postData = {
          mailList: mailList,
          emailInfo: emailInfo
        };
        var url = "https://script.google.com/macros/s/AKfycbxwcvgHAzVFl_Uzx0N8saGU5BxcoI-XGf2glETvYWKwGMO-TBc/exec";
        var options = {
          method: 'post',
          body: JSON.stringify(postData),
          json: true,
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          url: url
        };

        axios.post(url, postData)
          .then(function (response) {
            console.log("Success==========")
            console.log(response);
          })
          .catch(function (error) {
            console.log("ERROR==========")
            console.log(error);
            res.send(error)
          });
      } else {
        res.send("No Users Found")
      }
    });
  });

};



