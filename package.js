Package.describe({
  summary: "Package for displaying messages to the user.",
  version: "0.0.5",
  git: "https://github.com/krstffr/meteor-msgs",
  name: "krstffr:msgs"
});

Package.onUse(function (api) {

	api.versionsFrom("METEOR@0.9.0");

  api.use('templating', 'client');

  api.add_files(['views/msgs__template.html', 'views/msgs__template.js'], 'client');
  api.add_files('msgs.js', 'client');

  // The main object.
  api.export('Msgs', 'client');

});

Package.on_test(function (api) {
  api.use('krstffr:msgs');
  api.use('tinytest');
  api.use('test-helpers');
  api.add_files('msgs.js', 'client');
  api.add_files('tests/msgs-tests.js', 'client');
});