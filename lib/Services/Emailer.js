var nodemailer = require("nodemailer");
var _nconf;

var Emailer = function(nconf){
    _nconf = nconf;
};

Emailer.prototype.send = function(subject, message) {
// create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: _nconf.get("email:service"),
        auth: {
            user: _nconf.get("email:username"),
            pass: _nconf.get("email:password")
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: _nconf.get("email:from"), // sender address
        to: _nconf.get("email:to"), // list of receivers
        subject: subject, // Subject line
        text: message
    }

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
};

module.exports = Emailer;

