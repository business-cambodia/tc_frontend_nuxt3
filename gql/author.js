import gql from "graphql-tag";
const GET_AUTHOR_BY_ID = gql`
  query Author($id: ID!) {
    author(id: $id) {
      name
      profile_pic {
        url
      }
      cover_pic {
        url
      }
      quote
      articles {
        id
        title
        author {
          name
        }
        slug
        thumbnail {
          url
        }
        created_at
      }
    }
  }
`;

export { GET_AUTHOR_BY_ID };