# SEO site migration

Find urls that are on the old site that return a 404 on the new site.

1. Run `yarn fetch https://cantastic.nl`. This will save a list of paths of the old site in `cantastic_nl.csv`
2. Run `yarn check-urls https://cantastic.netlify.app cantastic_nl.csv /feed/,/product-tag/`. This will check all the
   paths from the CSV file and write to a new file containing all paths that return a non successful http status on the
   new site. `/feed/,/product-tag/` will exclude urls that contain /feed/ or /product-tag/