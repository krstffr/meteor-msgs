Package.describe({
  summary: "Package for displaying messages to the user.",
  version: "0.0.7",
  git: "https://github.com/krstffr/meteor-msgs",
  name: "krstffr:msgs"
});

Package.onUse(function (api) {

	api.versionsFrom("METEOR@0.9.0");

  api.use(["templating", "check@1.0.5", "session"], "client");

  api.add_files(["views/msgs__template.html", "views/msgs__template.js"], "client");
  api.add_files("msgs.js", "client");

  // The main object.
  api.export("Msgs", "client");

});

Package.on_test(function (api) {
  api.use(["check", "krstffr:msgs", "session", "tinytest", "underscore"]);
  api.add_files(["msgs.js", "tests/msgs-tests.js"], "client");
});