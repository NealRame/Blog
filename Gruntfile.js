/* eslint-env node*/
/* eslint-disable strict*/
module.exports = function(grunt) {

    function is_dev() {
        switch (process.env.NODE_ENV) {
        case 'development':
        case 'dev':
            return true;
        default:
            return false;
        }
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ///////////////////////////////////////////////////////////////////////
        // Variables
        sources_dir: 'src',
        pages_layouts_dir: '<%= sources_dir %>/layouts',
        pages_partials_dir: '<%= pages_layouts_dir %>/partials',
        pages_sources_dir: '<%= sources_dir %>/pages',
        sass_sources_dir: '<%= sources_dir %>/sass',
        scripts_sources_dir: '<%= sources_dir %>/scripts',
        public_dir: 'public',
        pages_dest_dir: '<%= public_dir %>/pages',
        style_dest_dir: '<%= public_dir %>/css',
        scripts_dest_dir: '<%= public_dir %>/scripts',
        ///////////////////////////////////////////////////////////////////////
        // Configure tasks
        clean: {
            'pages': ['<%= pages_dest_dir %>'],
            'scripts': ['<%= scripts_dest_dir %>'],
            'style': ['<%= style_dest_dir %>']
        },
        metalsmith: {
            pages: {
                options: {
                    metadata: {
                    },
                    plugins: [
                        {'metalsmith-markdown': {}},
                        {'metalsmith-layouts': {
                            directory: '<%= pages_layouts_dir %>',
                            engine: 'handlebars',
                            partials: '<%= pages_partials_dir %>',
                            default: 'cv.html'
                        }}
                    ]
                },
                src: '<%= pages_sources_dir %>',
                dest: '<%= pages_dest_dir %>'
            }
        },
        sass: {
            compile: {
                options: {
                    outputStyle: is_dev() ? 'nested' : 'compressed',
                    sourceMap: is_dev()
                },
                files: [{
                    expand: true,
                    cwd: '<%= sass_sources_dir %>',
                    src: ['style.scss'],
                    dest: '<%= style_dest_dir %>',
                    ext: '.css'
                }]
            }
        },
        uglify: {
            options: {
                sourceMap: is_dev()
            },
            app: {
                files: {
                    '<%= scripts_dest_dir %>/app.min.js': [
                        '<%= scripts_sources_dir %>/main.js'
                    ]
                }
            }
        },
        watch: {
            pages: {
                files: [
                    '<%= pages_sources_dir %>/**/*',
                    '<%= pages_layouts_dir %>/**/*'
                ],
                tasks: ['metalsmith:pages'],
                options: {
                    spawn: true
                }
            },
            scripts: {
                files: [
                    '<%= scripts_sources_dir %>/**/*.js'
                ],
                tasks: ['uglify:app'],
                options: {
                    spawn: true
                }
            },
            styles: {
                files: [
                    '<%= sass_sources_dir %>/**/*.scss',
                    '<%= sass_sources_dir %>/**/*.sass'
                ],
                tasks: ['sass'],
                options: {
                    spawn: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-metalsmith');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-sass');
    ///////////////////////////////////////////////////////////////////////
    // Register macro task(s).
    grunt.registerTask('default', ['clean', 'metalsmith:pages', 'sass', 'uglify']);
};
