Package.describe({
  summary: "Package for displaying messages to the user.",
  version: "0.0.1",
  git: "https://github.com/krstffr/meteor-msgs",
  name: "krstffr:msgs"
});

Package.onUse(function (api) {

  api.use('templating', 'client');

  api.add_files(['views/msgs__template.html', 'views/msgs__template.js'], 'client');
  api.add_files('msgs.js', 'client');

  // The main object.
  api.export('Msgs', 'client');

});
