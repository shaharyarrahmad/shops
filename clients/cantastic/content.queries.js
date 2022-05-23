const gql = require(`graphql-tag`);

const GET_CONTENT = gql`
  {
    Directus {
      cantastic_blogs {
        id
        date_created
        user_created
        title
        slug
        description
        featured_image {
          id
          title
        }
        content
      }
    }
  }
`;

module.exports = {
  GET_CONTENT,
};
