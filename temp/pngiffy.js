#!/usr/bin/env node

var fs = require('fs'),
    PNG = require('../lib/png').PNG;


var png = new PNG({
        height: 100,
        width: 100
    });


    for (var y = 0; y < png.height; y++) {
        for (var x = 0; x < png.width; x++) {
            var idx = (png.width * y + x) << 2;

            // if (Math.abs(png.data[idx] - png.data[idx+1]) <= 1
                    // && Math.abs(png.data[idx+1] - png.data[idx+2]) <= 1)
                png.data[idx] = 255;
                png.data[idx+1] = png.data[idx+2] = 0;
                png.data[idx+3] = 255;

        }
    }

    png.pack().pipe(fs.createWriteStream('out.png'));

// src.pipe(png);
