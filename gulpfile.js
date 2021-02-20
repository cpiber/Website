const { series, watch, src, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');

const sass = require('gulp-sass');
const Fiber = require('fibers');
sass.compiler = require('sass');

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
                    const jsonFileName = `${outputFileName.replace(base, output)}.json`;
                    fs.mkdirSync(path.dirname(jsonFileName), { recursive: true });
                    fs.writeFileSync(jsonFileName, JSON.stringify(json));
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