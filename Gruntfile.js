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
        content_dir: '<%= sources_dir %>/content',
        pages_dir: '<%= content_dir %>/pages',
        layouts_dir: '<%= sources_dir %>/layouts',
        helpers_dir: '<%= sources_dir %>/helpers',
        partials_dir: '<%= layouts_dir %>/partials',
        sass_sources_dir: '<%= sources_dir %>/sass',
        scripts_sources_dir: '<%= sources_dir %>/scripts',
        public_dir: 'public',
        dest_dir: '<%= public_dir %>',
        assets_dest_dir: '<%= dest_dir %>/assets',
        style_dest_dir: '<%= assets_dest_dir %>/css',
        scripts_dest_dir: '<%= assets_dest_dir %>/scripts',
        ///////////////////////////////////////////////////////////////////////
        // Configure tasks
        clean: {
            'pages': [
                '<%= dest_dir %>/index.html',
                '<%= dest_dir %>/pages'
            ],
            'scripts': ['<%= scripts_dest_dir %>'],
            'style': ['<%= style_dest_dir %>']
        },
        metalsmith: {
            content: {
                options: {
                    clean: false,
                    metadata: {
                    },
                    plugins: [
                        {'metalsmith-discover-helpers': {
                            directory: '<%= helpers_dir %>',
                            pattern: /\.js$/
                        }},
                        {'metalsmith-collections': {}},
                        {'metalsmith-markdown': {}},
                        {'metalsmith-layouts': {
                            directory: '<%= layouts_dir %>',
                            engine: 'handlebars',
                            partials: '<%= partials_dir %>',
                            default: 'layout.html'
                        }}
                    ]
                },
                dest: '<%= dest_dir %>',
                src: '<%= content_dir %>'
            }
        },
        sass: {
            compile: {
                options: {
                    includePaths: [
                        '<%= sass_sources_dir %>'
                    ],
                    outputStyle: is_dev() ? 'nested' : 'compressed',
                    sourceMap: is_dev()
                },
                files: [{
                    expand: true,
                    cwd: '<%= sass_sources_dir %>',
                    src: [
                        'style.scss',
                        'cv/style.scss'
                    ],
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
            content: {
                files: [
                    '<%= content_dir %>/**/*.md',
                    '<%= helpers_dir %>/**/*.js',
                    '<%= layouts_dir %>/**/*.html'
                ],
                tasks: ['metalsmith:content'],
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
    grunt.registerTask('default', ['clean', 'metalsmith:content', 'sass', 'uglify']);
};
