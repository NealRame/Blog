/* eslint-env node*/
/* eslint-disable strict*/
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ///////////////////////////////////////////////////////////////////////
        // Variables
        sources_dir: 'src',
        public_dir: 'public',
        assets_dir: '<%= public_dir %>/assets',
        templates_dir: '<%= sources_dir %>/templates',
        partials_dir: '<%= templates_dir %>/partials',
        pages_dir: '<%= public_dir %>/pages',

        ///////////////////////////////////////////////////////////////////////
        // Configure tasks
        assemble: {
            options: {
                assets: '<%= assets_dir %>',
                data: '<%= sources_dir %>/config.json',
                layout: '<%= templates_dir %>/default.hbs',
                partials: '<%= partials_dir>/**/*.hbs>'
            },
            cv: {
                src: '<%= sources_dir %>/cv.hbs',
                dest: '<%= public_dir %>'
            }
        }
    });
    grunt.loadNpmTasks('assemble' );
    grunt.loadNpmTasks('grunt-newer' );
    grunt.registerTask('default', ['newer:assemble' ]);
};
