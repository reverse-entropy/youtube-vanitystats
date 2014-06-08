var youTube = require("youtube-api");

module.exports.getViewCount = function(videoId, callback){
    youTube.authenticate({
        type: "key",
        key: "AIzaSyDjpnjsH6HKgXtW31OCUQfBbNQ8hE75l8Y"
    });

    var options = {
        part: "statistics",
        id: videoId
    };

    youTube.videos.list(options, function(error, body) {
        if(error) console.log(error);
        callback(body.items[0].statistics.viewCount);
    });
};