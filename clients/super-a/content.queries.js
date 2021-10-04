const gql = require(`graphql-tag`);

const GET_CONTENT = gql`{
    Directus {
        supera_algemeen {
            title
            description
            email_adressen
            instagram
        }
        supera_home {
            intro_title
            intro_text
            button1_url
            button1_text
            button2_url
            button2_text
            news_section_title
            shop_section_title
        }
        supera_news {
            image {
                id
                title
            }
            title
            text
        }
        supera_projects {
            title
            subtitle
            description
            main_image {
                id
                title
            }
            video_url
            images {
                directus_files_id {
                    id
                    title
                }
            }
            categories
            featured
        }
        supera_biography {
            id
            title
            text
            images {
                directus_files_id {
                    id
                    title
                }
            }
        }
        supera_terms_conditions {
            id
            title
            text
        }
    }
}`;

module.exports = {
  GET_CONTENT
};
