module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['test'],

  webdriver: {
    start_process: true,
    check_process_delay: 3000,
    port: 4444,
    server_path: require('chromedriver').path,
    cli_args: [
      // very verbose geckodriver logs
      '-vv',
    ],
  },
  detailed_output: false,
  test_settings: {
    default: {
      launch_url: 'https://nightwatchjs.org',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['--no-sandbox', '--headless'],
          prefs: {
            credentials_enable_service: false,
            'profile.password_manager_enabled': false,
          },
        },
      },
    },
  },
};
