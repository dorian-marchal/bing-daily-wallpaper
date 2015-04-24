#!/usr/bin/env node

'use strict';

var request = require('request');

request('http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', function (error, response, body) {

    if (!error && response.statusCode == 200) {

        var res = JSON.parse(body);
        console.log(res);
    }

});
