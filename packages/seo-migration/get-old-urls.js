const Crawler = require('simplecrawler');
const fs = require('fs');

const site = process.argv[2];
const filename =
  'data/' +
  site
    .replace('https://', '')
    .replace('https://', '')
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase() +
  '.csv';
try {
  fs.unlinkSync(filename);
} catch {}
const crawler = Crawler(site).on('fetchcomplete', function (item) {
  const { pathname } = new URL(item.url);
  console.log(pathname);
  fs.appendFile(filename, pathname + '\n', function (err) {
    if (err) throw err;
  });
});
crawler.addFetchCondition(function (parsedURL) {
  if (parsedURL.path.match(/\.(css|jpg|jpeg|pdf|docx|js|png|ico|gif|xml)/i)) {
    return false;
  }
  return true;
});
crawler.maxDepth = 4;
crawler.maxConcurrency = 10;
crawler.stripQuerystring = true;
crawler.start();
