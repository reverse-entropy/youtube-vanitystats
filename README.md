# youtube-vanitystats
A scheduled job that will will query YouTube's API for a given video ID. It will then email you the number of views and amount of revenue you have made since the last time it was run.

## Install
```npm install -g youtube-vanitystats```

## Configure
You will need to create a config.json file:

```json
{
  "previousNumberOfViews": 0,
  "rpm": 0.35,
  "video": {
    "id": ""
  },
  "email": {
    "service": "",
    "username": "",
    "password": "",
    "to": "",
    "from": ""
  },
  "schedule": {
    "hour": 0,
    "minute": 0,
    "second": 0
  }
}
```

### Key
| Name          | Description
| ------------- |-------------|
| previousNumberOfViews     | Upon running, the application saves the number of views to this variable. It starts at 0. |
| rpm      | Put your estimated RPM here. The default is 0.35.|
| video:id | The unique id of the video on YouTube.com e.g. "Xm7QZlkyB_4"|
| email:service | The provider you are sending your email through. E.g. "Gmail". See [documentation on NodeMailer](https://github.com/andris9/Nodemailer#well-known-services-for-smtp) for the options|
| email:username      | The username to send your email from|
| email:password      | The password to send your email from|
| email:to      | The email to send your information to|
| email:from      | The email to send your information from|
| schedule:hour      | The hour to send the email. E.g 12. See [documentation on node-schedule](https://github.com/mattpat/node-schedule) for the options|
| schedule:minute      | The minute to send the email. E.g 0. See [documentation on node-schedule](https://github.com/mattpat/node-schedule) for the options|
| schedule:second      | The second to send the email. E.g 0. See [documentation on node-schedule](https://github.com/mattpat/node-schedule) for the options|


## Run
You might want to run this on a server using [forever](https://github.com/nodejitsu/forever) ```node forever youtube-vanitystats -p "path/to/your/config.json"```
