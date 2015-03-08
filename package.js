Package.describe({
  name: 'aldeed:autoform-select2',
  summary: 'Custom select2 input type for AutoForm',
  version: '1.0.5',
  git: 'https://github.com/aldeed/meteor-autoform-select2.git'
});

Package.onUse(function(api) {
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:autoform@4.0.0 || 5.0.0');
  api.addFiles([
    'autoform-select2.html',
    'autoform-select2.js',
    'themes/bootstrap3.html',
    'themes/bootstrap3.js'
  ], 'client');
});
