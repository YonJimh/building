const gulp=require('gulp');
const less=require('gulp-less');
const del=require('del');
const autoprefixer=require('gulp-autoprefixer');
const cleanCSS=require('gulp-clean-css');

gulp.task('clean',()=>{
  del.sync('build');
})

gulp.task('less', () =>{
  gulp.src('src/**/*.less')
  .pipe(less())
  .pipe(autoprefixer({
    browsers:["last 5 versions",'Firefox > 20'],    //最后的5个版本的浏览器 火狐大于20版本的
    cascade:false}))
    .pipe(cleanCSS())
  .pipe(gulp.dest('build'))
});

gulp.task('default',['clean','less'], ()=>{
  console.log('yes!');
});

gulp.task('watch', ()=>{
  var watcher = gulp.watch('src/**/*', ['default']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});
