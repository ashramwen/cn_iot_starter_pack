/**
 * EmailController
 *
 * @description :: Server-side logic for managing emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  /**
   *  create email config data. validate the credential first and then save them
   */
  create: function (req, res) {
		var emailConfigID = req.headers['x-app-id'];
		var body = req.body;
    var SMTPConnection = require('smtp-connection')
    var mailcomposer = require('mailcomposer')

    var options = {
      port: 25,
      host: body.smtpHost,
      authMethod: 'login'
    }

    var connection = new SMTPConnection(options)
    connection.connect(function() {
    })

    // authenticate the email account
    connection.on('connect', function() {
      connection.login({
        user: body.username,
        pass: body.password
      }, function(err) {
        if (!err) {
          // if no err, save the email config
          connection.quit();
          body.emailConfigID = emailConfigID;
          body.password = sails.encrypt(body.password);
          EmailConfigs.create(body).exec(function createCB(err, created) {
            if (err) {
              res.badRequest(err)
            } else {
              res.created(created)
            }
          });
        } else {
          connection.quit();
          res.badRequest('Can not authenticate with the provided credential.')
        }
      })
    })
    connection.on('error', function(err) {
      res.badRequest('Can not connect to SMTP host.')
    })
  },

  /* send emails */
  sendEmails: function(req, res) {
    var nodemailer = require('nodemailer')
    var receivers = req.body.receivers
    var body = req.body.body
    var emailConfigID = req.param('emailConfigID')

    function buildEmailContent(emailConfig, receivers, body, req, res) {
      if (body.type == "template") {
        //if the request uses an existing template as email content
        Templates.findOne({emailConfigID: emailConfigID, templateID: body.templateID})
        .exec(function findOneCB (err, found) {
          if (err) {
            res.badRequest('can not find template with the provided templateID')
            return
          }
          var emailContent = {
            subject: found.subject,
            text: (found.contentType == 'text') ? found.content : undefined,
            html: (found.contentType == 'html') ? found.content : undefined
          }
        })
        buildEmailEnvelope(emailConfig, emailContent, receivers, body, req, res)
      } else if (body.type == "what") {
        //if the request input the email content directly
        var emailContent = {
          subject: body.subject,
          text: (body.contentType == 'text') ? body.content : undefined,
          html: (body.contentType == 'html') ? body.content : undefined
        }
        buildEmailEnvelope(emailConfig, emailContent, receivers, req, res)
      } else {
        //handle wrong type
        res.badRequest({
          body: {
            type: "is not supported"
          }
        })
      }
    }

    function buildEmailEnvelope(emailConfig, emailContent, receivers, req, res) {
      if (receivers.type == 'all') {
        res.ok('not implemented')
      } else if (receivers.type == 'who') {
        // if the request specify an email receipiant 
        if (typeof receivers.who != "string") {
          res.badRequest({
            receivers:{
              who: "is not a string"
            }
          })
        }
        var kiiUserID = receivers.who
        var appID = req.headers['x-app-id'];
        var appKey = req.headers['x-app-key'];
        var site = req.headers['x-app-site'];
        var authorization = req.headers['authorization'];
        var host = sails.config.kiiSite[site];

        var options = {
          method: 'GET',
          url: 'https://' + host + '/api/apps/' + appID + '/users/' + kiiUserID,
          headers: {
            authorization: authorization,
            'x-app-key': appKey,
            'x-app-id': appID
          }
        };
        //get user info, the email address
        sails.request(options, function(error, response, body) {
          if (error) throw new Error(error);
          if (response.statusCode == 200) {
            var to = JSON.parse(body).emailAddress   
            if (to == undefined) {
              res.badRequest('the user does not have a binded email')
              return
            }
            var mailcomposer = require('mailcomposer')
            // compose email content
            var mailOptions = {
              from: emailConfig.emailAddr,
              to: to,
              subject: emailContent.subject,
              text: emailContent.text,
              html: emailContent.html
            }
            // compose email transporter
            var transporter = nodemailer.createTransport({
              host: emailConfig.smtpHost,
              port: 25,
              authMethod: 'login',
              auth: {
                user: emailConfig.username,
                pass: sails.decrypt(emailConfig.password)
              }
            })
            //send the email
            transporter.sendMail(mailOptions, function(err, info) {
              if (err) {
                res.badRequest(err)
                return
              }
              res.ok('message sent');
            })
          } else {
            res.badRequest('wrong kii user id')
          }
        });        
      } else {
        res.badRequest({
          receivers: {
            type: "is not supported"
          }
        })
      }
    }

    //query the email config
    EmailConfigs.findOne({emailConfigID: emailConfigID})
      .exec(function findOneCB(err, found) {
      if (err) {
        res.serverError(err);
        return;
      } 
      buildEmailContent(found, receivers, body, req, res)    
    })
  },
  
  /**
   *  get single email config data
   */  
  findOne: function(req, res) {
  	var emailConfigID = req.param('emailConfigID');
  	EmailConfigs.findOne({emailConfigID: emailConfigID}).exec(function findOneCB(err, found){
  		res.jsonp(200, found)
		});
  },

  /**
   *  update an email config
   */
  update: function(req, res) {
  	var emailConfigID = req.param('emailConfigID');
  	EmailConfigs.update({emailConfigID: emailConfigID},req.body).exec(function afterwards(err, updated){
  		if (err) {
    		res.serverError(err);
    		return;
  		}
  		res.ok(updated[0]);
		});	
  }, 

  /**
   *  remove an email config
   */
  destroy: function(req, res) {
  	var emailConfigID = req.param('emailConfigID');
  	EmailConfigs.destroy({emailConfigID: emailConfigID}).exec(function deleteCB(err){
  		if (err) {
  			res.serverError(err);
  			return;
  		}
  		res.noContent()
  	})
  }  
};

