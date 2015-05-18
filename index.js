'use strict';

var request = require('request');
var fs = require('fs');
var wallpaper = require('wallpaper');
var notifier = require('node-notifier');

var getUserHome = function () {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
};

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
var setWallpaper = function (wallPath, done) {

    done = done || function () {};

    wallpaper.set(wallPath, function (err) {
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

var saveAndSetBingWallpaper = function () {

    var argv = require('minimist')(process.argv.slice(2));

    // Today's wallpaper filename
    var currentDate = new Date().toISOString().substr(0, 10);
    var wallFilename = currentDate + '.jpg';

    var onWallDirExist = function (wallDirectory) {
        var wallPath = wallDirectory + '/' + wallFilename;

        // We don't download twice the same wallpaper
        if (fs.existsSync(wallPath)) {
            console.log('Today\'s wallpaper already exists.');
            setWallpaper(wallPath);
        }
        else {
            console.log('Dowloading wallpaper in ' + wallPath + '...');

            getBingWallpaper(function(err, wallpaper) {

                download(wallpaper.url,  wallPath, function() {
                    console.log('Wallpaper saved.');
                    setWallpaper(wallPath, function () {

                        // If --notify is passed, we show the copyright
                        if (argv.notify) {
                            notifier.notify({
                                title: 'Wallpaper copyright',
                                message: wallpaper.copyright,
                            });
                        }
                    });
                });
            });
        }
    };

    // If --directory is not set, the wallpapers go in ~/.bing-wallpapers
    var wallDirectory;
    if (argv.directory && fs.existsSync(argv.directory)) {
        onWallDirExist(argv.directory);
    }
    else {
        wallDirectory = getUserHome() + '/.bing-wallpapers';
        fs.mkdir(wallDirectory, function () {
            onWallDirExist(wallDirectory);
        });
    }
};

module.exports = saveAndSetBingWallpaper;
