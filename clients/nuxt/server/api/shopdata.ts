import fs from 'fs';

export default defineEventHandler((event) => {
  const { dataFile } = useRuntimeConfig();
  console.log(dataFile);
  if (!fs.existsSync(dataFile)) {
    throw Error(
      `No shop data exists in ${dataFile}. Something went wrong during app init. Check nuxt config hooks`
    );
  }
  console.log('New request: ' + event.req);
  return {
    api: 'works',
  };
});
