var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  async initPackage() {
    const answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname,
      },
    ])

    const pkgJson = {
      name: answers.name,
      version: '1.0.0',
      description: '',
      scripts: {
        build: 'npx webpack',
        test: 'mocha --require @babel/register',
        coverage: 'nyc mocha',
      },
      dependencies: {},
      author: '',
      license: 'ISC',
    }

    this.fs.extendJSON(this.destinationPath('package.json', pkgJson))
    this.npmInstall(['vue'], { 'save-dev': false })
    this.npmInstall(
      [
        'webpack',
        'webpack-cli',
        'vue-loader',
        'vue-style-loader',
        'babel-loader',
        'css-loader',
        'copy-webpack-plugin',
        'vue-template-compiler',
        'mocha',
        'nyc',
        '@babel/core',
        '@babel/preset-env',
        '@babel/register',
        '@istanbuljs/nyc-config-babel',
        'babel-plugin-istanbul',
      ],
      {
        'save-dev': true,
      }
    )

    this.fs.copyTpl(
      this.templatePath('Hello.vue'),
      this.destinationPath('src/Hello.vue')
    )

    this.fs.copyTpl(
      this.templatePath('main.js'),
      this.destinationPath('src/main.js')
    )

    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    )

    this.fs.copyTpl(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    )

    this.fs.copyTpl(this.templatePath('.nycrc'), this.destinationPath('.nycrc'))

    this.fs.copyTpl(
      this.templatePath('sample-test.js'),
      this.destinationPath('test/sample-test.js')
    )

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('src/index.html'),
      { title: answers.name }
    )
  }
}
