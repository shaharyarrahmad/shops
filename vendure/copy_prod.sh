# Copy assets
# gsutil -m rsync -r -d -p gs://pinelab-shops-assets gs://pinelab-shops-test-assets

# copy DB
# mysqldump --column-statistics=0 -u *** -h *** -p *** > export.sql
# mysql -u *** -h *** -p *** < export.sql