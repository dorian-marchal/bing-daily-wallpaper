'use strict';

var request = require('request');

request('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', function (error, response, body) {

    if (error || response.statusCode !== 200) {
        throw new Error('Error while accessing the Bing API');
    }

    try {
        var res = JSON.parse(body);

        if (typeof res.images === 'undefined' || res.images.length === 0) {
            throw new Error('Bad format for Bing API response');
        }

        var imageUrl = 'http://bing.com' + res.images[0].url;
        console.log(imageUrl);
    }
    catch (err) {
        throw err;
    }

});
