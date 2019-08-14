"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var source = { "ftl.js": fs.readFileSync('ftl.js', 'utf8') }, lout = function (file) { return function (err) { return console.log(err || 'Wrote ' + file); }; };
[5, 6].forEach(function (i) {
    var n = "ftl.es" + i + ".min.js", _a = require("terser").minify(source, {
        sourceMap: {
            filename: 'ftl.js',
            url: n
        },
        compress: {
            ecma: i,
            unsafe: true,
            arrows: true,
            unsafe_arrows: true
        },
        ecma: i
    }), code = _a.code, map = _a.map;
    fs.writeFile(n, code, lout(n));
    fs.writeFile(n += '.map', map, lout(n));
});
