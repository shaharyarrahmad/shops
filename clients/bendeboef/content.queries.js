const gql = require(`graphql-tag`);

const GET_CONTENT = gql`
  {
    Directus {
      bdb_algemeen {
        title
        instagram
        emailadres
      }
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
      bdb_news {
        id
        sort
        title
        text
        image {
          id
          title
        }
      }
      bdb_bio {
        id
        title
        text
        image {
          id
          title
        }
      }
      bdb_tattoos {
        id
        title
        text
        image {
          id
          title
        }
      }
    }
  }
`;

module.exports = {
  GET_CONTENT,
};
