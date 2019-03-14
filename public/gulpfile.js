const gulp =require("gulp");
const webserver = require("gulp-webserver");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const miniCSS = require("gulp-clean-css");

gulp.task("buildHTML",()=>{
    gulp.src("./src/**/*.html")
    .pipe(gulp.dest("./dist"))
})
gulp.task("buildimages",()=>{
    gulp.src("./src/images/**/*.*")
	.pipe( gulp.dest("./dist/images") )
})

gulp.task("buildJSON",()=>{
    gulp.src("./src/**/*.json")
    .pipe(gulp.dest("./dist"))
})

gulp.task("buildCSS",()=>{
    gulp.src("./src/css/**/*.css")
//     .pipe(sass().on('error', sass.logError))
//   .pipe(miniCSS())
    .pipe(gulp.dest("./dist/css"))
})

gulp.task("buildJS",()=>{
    gulp.src("./src/**/*.js").pipe(gulp.dest("./dist"))
//     gulp.src("./src/**/*.js")
//     .pipe(babel({
//          presets:['@babel/env'] 
//     }))
//     .pipe( uglify() ) 
//     .pipe( gulp.dest("./dist/pages") );
});

gulp.task("buildSTATIC", function(){
	gulp.src("./src/static/**/*.*")
	.pipe( gulp.dest("./dist/static") )
})

gulp.task("build",["buildHTML","buildCSS","buildJS","buildSTATIC","buildJSON","buildimages"])

gulp.task("watch", ()=>{
	gulp.watch("./src/**/*.html", ["buildHTML"]);
	gulp.watch("./src/**/*.js", ["buildJS"]);
	gulp.watch("./src/**/*.scss", ["buildCSS"]);
	gulp.watch("./src/**/*.json",["buildJSON"]);
})


//写个注释
gulp.task("webserver",["watch","build"],()=>{
    gulp.src("./dist").pipe(webserver({
        livereload:true,
        // directoryListing: true,
        // open:true,
        // https:true,
        port:9090,
        proxies:[
            {
                source:"/listmore",
                target:"https://m.lagou.com/listmore.json"
            }
        ]
    }))
})

















