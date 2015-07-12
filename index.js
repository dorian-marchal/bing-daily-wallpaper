'use strict';

var request = require('request');
var DailyWallpaper = require('daily-wallpaper');

var BingDailyWallpaper = function() {

  var that = this;
  this.dailyWallpaper = new DailyWallpaper();

  this.dailyWallpaper.getWallpaperSource = function(done) {
    that._getBingWallpaper(function(err, image) {
      if (err) {
        return done(err);
      }
      return done(null, {
        url: 'http://www.bing.com' + image.url,
        extension: 'jpg',
      });
    });
  };
};

BingDailyWallpaper.prototype = {

  constructor: BingDailyWallpaper,

  /**
   * Set the current bing wallpaper as wallpaper
   */
  setBingDailyWallpaper: function(done) {
    this.dailyWallpaper.setDailyWallpaper(function(err) {
      if (err) {
        return done(err);
      }

      return done();
    });
  },

  setDirectory: function(directory) {
    this.dailyWallpaper.setDirectory(directory);
  },

  /**
   * Call the callback with the wallpaper url when done
   * (and with an optionnal error as first parameter).
   */
  _getBingWallpaper: function(done) {
    request('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1',
        function(error, response, body) {

          if (error || response.statusCode !== 200) {
            return done(new Error('Error while accessing the Bing API.'));
          }

          var res;

          try {
            res = JSON.parse(body);
          }
          catch (err) {
            return done(err);
          }

          if (typeof res.images === 'undefined' || res.images.length === 0) {
            return done(new Error('Bad format for Bing API response.'));
          }

          return done(null, res.images[0]);
      }
    );
  }

};

module.exports = BingDailyWallpaper;
