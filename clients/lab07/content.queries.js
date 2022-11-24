const gql = require(`graphql-tag`);

// TODO define queries for fetching portfolio projects const GET_CONTENT = gql``;
const GET_CONTENT = gql`
  {
    lab07_projects {
      title
      description
      images {
        directus_files_id {
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
