const gql = require(`graphql-tag`);

const GET_CONTENT = gql`
  {
    cantastic_blogs {
      id
      date_created
      user_created {
        first_name
        last_name
        avatar {
          id
        }
      }
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
`;

module.exports = {
  GET_CONTENT,
};
