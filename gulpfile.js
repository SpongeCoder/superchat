// Use scripts

var gulp                = require('gulp'),
    watch               = require('gulp-watch'),
    prefixer            = require('gulp-autoprefixer'),
    //uglify              = require('gulp-uglify'),
    cssmin              = require('gulp-cssmin'),
    sass                = require('gulp-sass'),
    rigger              = require('gulp-rigger'),
    imagemin            = require('gulp-imagemin'),
    pngquant            = require('imagemin-pngquant'),
    jade                = require('gulp-jade'),
    connect             = require('gulp-connect'),
    //filter              = require('gulp-filter'),
    sprite              = require('gulp.spritesmith'),
    //jsmin 							= require('gulp-jsmin'),
    colors              = require('colors');


var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        sprite: 'assets/sprite/compile/',
        jsVendor: 'build/js/vendor/',
        jsVendor1: 'assets/js/vendor/',
        cssVendor: 'assets/style/import/'
    },
    src: { //Пути откуда брать исходники
        html: 'assets/html/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'assets/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: './assets/style/style.scss',
        img: 'assets/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'assets/fonts/**/*.*',
        jade: 'assets/jade/*.jade',
        sprite: 'assets/sprite/img/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'assets/html/**/*.html',
        js: 'assets/js/**/*.js',
        style: 'assets/style/**/*.scss',
        img: 'assets/img/**/*.*',
        jade: 'assets/jade/**/*.jade',
        fonts: 'assets/fonts/**/*.*'
    }
};

var server = {
    host: 'localhost',
    port: '8080',
    root: 'build'
};

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(connect.reload()); //И перезагрузим наш сервер для обновлений
});

gulp.task('jade:build', function () {
    gulp.src(path.src.jade) //Выберем файлы по нужному пути
        .pipe(jade({
            pretty: true
        })).on('error', log)
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(connect.reload()); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()).on('error', log) //Прогоним через rigger
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(connect.reload()); //И перезагрузим сервер
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sass({outputStyle: 'compact'})).on('error', log) //Скомпилируем
        .pipe(prefixer({browsers: ['last 10 versions', 'Android > 2', 'ie > 8']})) //Добавим вендорные префиксы
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(connect.reload());
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(connect.reload());
});
/* ----------------------------------------------------- */
/* ----------------------------------------------------- */
/* ----------------------------------------------------- */

gulp.task('sprite', function () {
    gulp.src(path.src.sprite)
        .pipe(sprite({
            imgName: 'sprite.png',
            cssName: 'sprite.css',
            cssTemplate: 'sprite.css.handlebars',
            algorithm: 'binary-tree',
            //algorithm: 'left-right',
            padding: 5,
            // cssOpts: {
            //   cssClass: function (item) {
            //     return '.' + item.name;
            //   }}
        }))
        .pipe(gulp.dest(path.build.sprite));
});

gulp.task('build', [
    'html:build',
    'jade:build',
    'js:build',
    'style:build',
    'image:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.jade], function(event, cb) {
        gulp.start('jade:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function() {
    connect.server({
        host: server.host,
        port: server.port,
        root: server.root,
        livereload: true
    });
});

gulp.task('default', ['build', 'webserver', 'watch']);

function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE----------".bold.red,
        ("[" + error.name + " in " + error.plugin + "]").white.bold.italic,
        error.message.green,
        "----------ERROR MESSAGE----------".bold.red,
        ''
    ].join('\n'));
    this.end();
}
