/* eslint-env meteor */
Package.describe({
  name: 'aldeed:autoform-select2',
  version: '4.0.0-rc.0',
  summary: 'Custom select2 input type for AutoForm',
  git: 'https://github.com/aldeed/meteor-autoform-select2.git'
})

Package.onUse(function (api) {
  api.versionsFrom(['2.3', '3.0'])
  api.use([
    'ecmascript',
    'templating@1.0.0',
    'blaze@2.0.0 || 3.0.0',
    // api.use('aldeed:template-extension@4.0.0')
    'aldeed:autoform@6.0.0 || 7.0.0 || 8.0.0',
    'jquery@3.0.0'
  ], 'client')
  api.mainModule('main.js', 'client')
})
