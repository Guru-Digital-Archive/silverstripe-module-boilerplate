module.exports = function (grunt) {
	require("load-grunt-tasks")(grunt);
	grunt.initConfig({
		project: {
			title: "New Module Title",
			description: "Silverstripe boilerplate module",
			name: "namespace_project-name", // namespace_project-name ( _ gets converted to / for composer.json name )
			prefix: "NewModule",
			const_prefix: "NEW_MODULE"
		},
		watch: {
			scripts: {
				files: ["assets/javascript/theme/*.js", "assets/css/*.css"],
				tasks: ["default"],
				options: {
					spawn: false
				}
			}
		},
		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),
		// Banner definitions
		meta: {
			banner: "/*!\n" +
					" *  <%= pkg.title || pkg.name %> v<%= pkg.version %> by <%= pkg.author.name %> - <%= pkg.homepage %>\n" +
					" *  Under <%= pkg.license %> License\n" +
					" *  Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>. \n" +
					" */\n"
		},
		update_json: {
			options: {
				indent: "\t"
			},
			bower: {
				src: "package.json",
				dest: "bower.json",
				fields: [
					"name",
					"description",
					"license",
					"homepage",
					"keywords",
					{
						"authors": function (src) {
							var authors = [src.author];
							if (src.contributors && src.contributors.length) {
								authors = authors.concat(src.contributors);
							}
							return authors;
						}
					},
					"repository",
					"private"
				]
			},
			composer: {
				src: "package.json", // where to read from
				dest: "composer.json",
				fields: [
					{
						"name": function (src) {
							return src.name.replace("_", "/");
						}
					},
					"description",
					"license",
					"homepage",
					"keywords",
					{
						"authors": function (src) {
							var authors = [src.author];
							if (src.contributors && src.contributors.length) {
								authors = authors.concat(src.contributors);
							}
							return authors;
						}
					},
					{
						support: {
							"issues": "/bugs/url"
						}
					}
				]
			}
		},
		// Lint definitions
		jshint: {
			src: [
				"assets/javascript/*.js",
				"!assets/javascript/*.min.js"
			],
			options: {
				jshintrc: ".jshintrc"
			}
		},
		// Minify definitions
		uglify: {
			main: {
				files: [
					{
						expand: true,
						cwd: "assets/javascript",
						src: ["*.js", "!.min.js"],
						dest: "javascript",
						ext: ".min.js"
					}],
				options: {
					banner: "<%= meta.banner %>",
					sourceMap: true
				}
			}
		},
		cssmin: {
			main: {
				files: [{
						expand: true,
						cwd: "assets/",
						src: ["*.css", "!*.min.css"],
						dest: "css",
						ext: ".min.css"
					}],
				options: {
					banner: "<%= meta.banner %>",
					sourceMap: true
				}
			}
		},
		//Add banners to minnified CSS
		usebanner: {
			main: {
				options: {
					banner: "<%= meta.banner %>",
					linebreak: false
				},
				files: [{
						expand: true,
						cwd: "assets/css",
						src: ["*.min.css"],
						dest: "assets/css"
					}]
			}
		}
	});
	// Default task runs JS Hint and minifies JS/CSS
	grunt.registerTask("default", ["jshint", "uglify", "cssmin", "usebanner"]);

	grunt.registerTask("rename-project", "Refactor and rename files with new project name", function () {
		var
				searchAndReplaceFileList = [
					'*.php', '*.json', '*.js', '*.css',
					'**/*.php', '**/*.json', '**/*.js', '**/*.css',
					'License', 'README.md', '!Gruntfile.js', '!bower_components/**', '!node_modules/**'
				],
				removeFileList = [
					'MyModule*.*',
					'**/MyModule*.*',
					'!bower_components/**', '!node_modules/**'
				];

		grunt.config("replace.rename_project", {
			src: searchAndReplaceFileList,
			overwrite: true, // overwrite matched source files
			replacements: [
				{
					from: "My module",
					to: '<%= project.title %>'
				},
				{
					from: "<Your name>",
					to: '<%= pkg.author.name %>'
				},
				{
					from: "Simple boilerplate to help kick start a new Silverstripe module.",
					to: '<%= project.description %>'
				},
				{
					from: "<Year>",
					to: "<%= grunt.template.today('yyyy') %>"
				},
				{
					from: "SilverStripe Module Boilerplate",
					to: '<%= project.title %>'
				},
				{
					from: "MyModule",
					to: '<%= project.prefix %>'
				},
				{
					from: "MY_MODULE",
					to: '<%= project.const_prefix %>'
				},
				{
					from: 'silverstripe-module-boilerplate',
					to: function () {
						return require('path').basename(process.cwd());
					}
				}

			]
		});
		grunt.config("copy.rename_project", {
			files: [{
					expand: true,
					dot: true,
					cwd: "",
					dest: "",
					src: removeFileList,
					rename: function (dest, src) {
						return dest + src.replace('MyModule', '<%= project.prefix %>');
					}
				}]
		});
		grunt.config("clean.rename_project", removeFileList);

		grunt.task.run(["replace:rename_project", "copy:rename_project", "clean:rename_project", "update_json"]);
	});
};
