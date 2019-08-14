import * as fs from 'fs';

const source = {"ftl.js": fs.readFileSync('ftl.js', 'utf8')},
    lout = file => err => console.log(err || 'Wrote ' + file);

[5,6].forEach(i=>{
    let n = `ftl.es${i}.min.js`,
        {code, map} = require(`terser`).minify(source, {
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
        });
    fs.writeFile(n, code, lout(n));
    fs.writeFile(n+='.map', map, lout(n))
});