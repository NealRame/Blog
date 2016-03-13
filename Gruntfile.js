'use strict';

/* eslint-env node, es6 */

const _ = require('underscore');
const fs = require('fs');
const path = require('path');

// sources variables
const sources_dir = 'src';
const content_dir = path.join(sources_dir, 'content');
const pages_dir = path.join(content_dir, 'pages');
const layouts_dir = path.join(sources_dir, 'layouts');
const helpers_dir = path.join(sources_dir, 'helpers');
const partials_dir = path.join(layouts_dir, 'partials');
const sass_sources_dir = path.join(sources_dir, 'sass');
const js_sources_dir = path.join(sources_dir, 'js');
const applications_sources_dir = path.join(js_sources_dir, 'apps');

// destinations variables
const dest_dir = 'public';
const assets_dest_dir = path.join(dest_dir, 'assets');
const style_dest_dir = path.join(assets_dest_dir, 'css');
const applications_dest_dir = path.join(assets_dest_dir, 'js');

function is_dev() {
    switch (process.env.NODE_ENV) {
    case 'development':
    case 'dev':
        return true;
    default:
        return false;
    }
}

function is_prod() {
    return !is_dev()
}

function create_target(app, apps_source_dir, apps_dest_dir) {
    const sources_dir = path.join(apps_source_dir, app);
    const dest_dir = path.join(apps_dest_dir, app);
    const options = Object.assign(
        {browserifyOptions: {
            debug: true,
            paths: ['node_modules', js_sources_dir]
        }},
        {transform: [['babelify', {
            presets: ['es2015']
        }]]},
        is_prod() ? {plugin: [['minifyify', {map: false, minify: true}]]} : {}
    );
    return _.object([[app, {
        options,
        src: [`${sources_dir}/main.js`],
        dest: `${dest_dir}/app.js`
    }]]);
}

function create_browserify_targets(apps_sources_dir, apps_dest_dir) {
    return fs.readdirSync(apps_sources_dir)
        .filter((entry) => fs.statSync(path.join(apps_sources_dir, entry)).isDirectory())
        .reduce((targets, app) => Object.assign(
            targets,
            create_target(app, apps_sources_dir, apps_dest_dir)
        ), {});
}

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ///////////////////////////////////////////////////////////////////////
        // Variables
        sources_dir,
        content_dir,
        pages_dir,
        layouts_dir,
        helpers_dir,
        partials_dir,
        sass_sources_dir,
        js_sources_dir,
        applications_sources_dir,
        dest_dir,
        assets_dest_dir,
        style_dest_dir,
        applications_dest_dir,
        ///////////////////////////////////////////////////////////////////////
        // Configure tasks
        clean: {
            'pages': [
                '<%= dest_dir %>/index.html',
                '<%= dest_dir %>/pages'
            ],
            'scripts': ['<%= applications_dest_dir %>'],
            'style': ['<%= style_dest_dir %>']
        },
        browserify: create_browserify_targets(
            applications_sources_dir,
            applications_dest_dir
        ),
        metalsmith: {
            content: {
                options: {
                    clean: false,
                    metadata: {
                        'site-name': 'Neal.Rame.',
                        name: 'Julien Graziano',
                        address: '45 Rue d\'Amiens - 59000 Lille',
                        phone: '+33 6 75 12 29 57',
                        birth: '31 mars 1981',
                        year: (new Date()).getFullYear(),
                        email: 'julien@graziano.fr',
                        '500px': 'https://500px.com/nealrame',
                        github: 'https://github.com/NealRame',
                        facebook: 'https://www.facebook.com/NealRame',
                        twitter: 'https://twitter.com/NealRame',
                        picture: '/assets/pictures/me.jpg'
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
                        '<%= sass_sources_dir %>',
                        'node_modules/foundation-sites/scss'
                    ],
                    outputStyle: is_dev() ? 'nested' : 'compressed',
                    sourceMap: is_dev()
                },
                files: [{
                    expand: true,
                    cwd: '<%= sass_sources_dir %>',
                    src: [
                        'about/style.scss',
                        'contact/style.scss',
                        'cv/style.scss',
                        'style.scss'
                    ],
                    dest: '<%= style_dest_dir %>',
                    ext: '.css'
                }]
            }
        },
        watch: {
            content: {
                files: [
                    '<%= content_dir %>/**/*.md',
                    '<%= helpers_dir %>/**/*.js',
                    '<%= layouts_dir %>/**/*.html'
                ],
                tasks: ['metalsmith'],
                options: {
                    livereload: true,
                    spawn: true
                }
            },
            scripts: {
                files: [
                    '<%= js_sources_dir %>/**/*.js'
                ],
                tasks: ['browserify'],
                options: {
                    livereload: true,
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
                    livereload: true,
                    spawn: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-metalsmith');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browserify');
    ///////////////////////////////////////////////////////////////////////
    // Register macro task(s).
    grunt.registerTask('default', ['clean', 'metalsmith', 'sass', 'browserify']);
};
