const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps')

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
        let stream = gulp.src(!modules ? input : inputModule);
        if (!minify)
            stream = stream.pipe(sourcemaps.init());

        stream = stream.pipe(postcss(postcssplugins, { syntax: require('postcss-scss') }))
            .pipe(sass({
                fiber: Fiber,
                outputStyle: minify ? 'compressed' : 'expanded',
            }).on('error', sass.logError));
        if (!minify)
            stream = stream.pipe(sourcemaps.write('.'));
        return stream.pipe(gulp.dest('./build/css'));
    }
}

gulp.task('sass', tasksass());
gulp.task('sassmodules', tasksass(true));
gulp.task('sass:build', tasksass(false, true));
gulp.task('sassmodules:build', tasksass(true, true));
gulp.task('sass:watch', function () {
    gulp.watch(input, tasksass());
});
gulp.task('sassmodules:watch', function () {
    gulp.watch(inputModule, tasksass(true));
});