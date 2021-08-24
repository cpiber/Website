const { series, watch, src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');

const sass = require('gulp-sass')(require('sass'));
const fiber = require('fibers');

const postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env');
const postcssModules = require('postcss-modules');

const path = require("path");
const fs = require("fs");


const inputModule = './src/css/**/*.module.scss';
const base = 'src/css';
const output = 'build/css';

function tasksass(minify = false) {
    return function buildSass () {
        const postcssplugins = [
            postcssPresetEnv(),
            postcssModules({
                getJSON: function (cssFileName, json, outputFileName) {
                    const outFileName = `${outputFileName.replace(base, output).replace(/\.\w+$/, '')}.php`;
                    fs.mkdirSync(path.dirname(outFileName), { recursive: true });
                    fs.writeFileSync(outFileName, `<?php return ${toPHPArray(json)};`);
                }
            }),
        ];
        return src(inputModule)
            .pipe(gulpif(!minify, sourcemaps.init()))
            .pipe(postcss(postcssplugins, { syntax: require('postcss-scss') }))
            .pipe(sass({
                fiber,
                outputStyle: minify ? 'compressed' : 'expanded',
            }).on('error', sass.logError))
            .pipe(concat('modules.css'))
            .pipe(gulpif(!minify, sourcemaps.write('.')))
            .pipe(dest(output));
    }
}

function toPHPArray(obj) {
    if (isPrimitive(obj))
        return JSON.stringify(obj);
    const strs = Array.isArray(obj) ? obj.map(i => toPHPArray(i)) : Object.keys(obj).map(k => `${JSON.stringify(k)} => ${toPHPArray(obj[k])}`);
    return `array(${strs.join(', ')})`;
}

function isPrimitive(val) {
    return (['string', 'number', 'bigint', 'boolean', 'undefined', 'null']).indexOf(typeof val) !== -1 ||
        val instanceof String || val instanceof Number || val instanceof BigInt || val instanceof Boolean;
}


const tSassModules = tasksass();
const wSassModules = () => watch(inputModule, tSassModules);

module.exports = exports = {
    'sassmodules:build': tasksass(true),
    'sassmodules:watch': series(tSassModules, wSassModules),
}