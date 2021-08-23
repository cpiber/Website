const { series, watch, src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');

const sass = require('gulp-sass')(require('sass'));
const Fiber = require('fibers');

const postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env');
const postcssModules = require('postcss-modules');

const path = require("path");
const fs = require("fs");


const input = './src/css/**/!(*.module).scss';
const inputModule = './src/css/**/*.module.scss';
const inputWatch = './src/css/**/*.scss';
const base = 'src/css';
const output = 'build/css';

function tasksass(modules = false, minify = false) {
    return function buildSass () {
        const postcssplugins = [
            postcssPresetEnv(),
        ];
        if (modules) {
            postcssplugins.push(postcssModules({
                getJSON: function (cssFileName, json, outputFileName) {
                    const outFileName = `${outputFileName.replace(base, output)}.php`;
                    fs.mkdirSync(path.dirname(outFileName), { recursive: true });
                    fs.writeFileSync(outFileName, `<?php return ${toPHPArray(json)};`);
                }
            }));
        }
        return src(!modules ? input : inputModule)
            .pipe(gulpif(!minify, sourcemaps.init()))
            .pipe(postcss(postcssplugins, { syntax: require('postcss-scss') }))
            .pipe(sass({
                fiber: Fiber,
                outputStyle: minify ? 'compressed' : 'expanded',
            }).on('error', sass.logError))
            .pipe(concat('modules.css'))
            .pipe(gulpif(!minify, sourcemaps.write('.')))
            .pipe(dest('./build/css'));
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


const tSass = tasksass();
const wSass = () => watch(inputWatch, tSass);
const tSassModules = tasksass(true);
const wSassModules = () => watch(inputWatch, tSassModules);

module.exports = exports = {
    // sass: tSass,
    // sassmodules: tSassModules,
    // 'sass:build': tasksass(false, true),
    'sassmodules:build': tasksass(true, true),
    // 'sass:watch': series(tSass, wSass),
    'sassmodules:watch': series(tSassModules, wSassModules),
}