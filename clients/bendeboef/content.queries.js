const PREFIX = 'Directus';

const GET_GLOBAL = `{
  ${PREFIX} {
    bdb_algemeen {
      title
      instagram
      emailadres
    }
  }
}`;

const GET_HOME = `{
  ${PREFIX} {
    bdb_home {
      button1_link
      button1_text
      button2_link
      button2_text
      hero_image {
        id
        title
      }
      hero_subtitle
      hero_title
      intro_text
      intro_title
    }
  }
}`;

module.exports = {
  GET_GLOBAL,
  GET_HOME,
  PREFIX
};