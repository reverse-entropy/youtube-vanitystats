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

## Run
You might want to run this on a server using [forever](https://github.com/nodejitsu/forever) ```node forever youtube-vanitystats -p "path/to/your/config.json"```
