'use strict';

var request = require('request');
var fs = require('fs');
var wallpaper = require('wallpaper');
var argv = require('minimist')(process.argv.slice(2));

/**
 * Download a file and store it on the filesystem.
 */
var download = function (uri, filename, callback){
    request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

/**
 * Replace the current wallpaper with the one in parameter.
 */
var setWallpaper = function (wallpaperPath, done) {

    done = done || function () {};

    wallpaper.set(wallpaperPath, function (err) {
        console.log('Wallpaper updated.');
        done();
    });
};

/**
 * Call the callback with the wallpaper url when done
 * (and with an optionnal error as first parameter).
 */
var getBingWallpaper = function (done) {
    request('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', function (error, response, body) {

        if (error || response.statusCode !== 200) {
            done(new Error('Error while accessing the Bing API.'));
            return;
        }

        try {
            var res = JSON.parse(body);

            if (typeof res.images === 'undefined' || res.images.length === 0) {
                done(new Error('Bad format for Bing API response.'));
            }

            var image = {
                url: 'http://bing.com' + res.images[0].url,
                copyright: res.images[0].copyright,
            };

            done(null, image);
        }
        catch (err) {
            done(err);
        }

    });
};

// Today's wallpaper path
var currentDate = new Date().toISOString().substr(0, 10);
var wallpaperPath = __dirname + '/wallpapers/' + currentDate + '.jpg';

// We don't download twice the same wallpaper
if (fs.existsSync(wallpaperPath)) {
    console.log('Today\'s wallpaper already exists.');
    setWallpaper(wallpaperPath);
}
else {
    console.log('Dowloading wallpaper in ' + wallpaperPath + '...');

    getBingWallpaper(function(err, wallpaper) {

        download(wallpaper.url,  wallpaperPath, function() {
            console.log('Wallpaper saved.');
            setWallpaper(wallpaperPath, function () {

                // If --notify is passed, we show the copyright
                if (argv.notify) {
                    console.log(wallpaper.copyright);
                }
            });
        });
    });
}
