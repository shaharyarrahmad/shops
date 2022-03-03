const gql = require(`graphql-tag`);

const GET_CONTENT = gql`
  {
    Directus {
      cryptherion_algemeen {
        telefoon
        email
        adres
        algemene_voorwaarden
        privacy_beleid
      }
    }
  }
`;

module.exports = {
  GET_CONTENT,
};
