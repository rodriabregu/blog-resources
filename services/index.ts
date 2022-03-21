import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql'

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            slug
            title
            excerpt
            createdAt
            coverImage {
              url
            }
            author {
              name
              id
              biography
              picture {
                url
              }
            }
          }
        }
      }
    }
  `
  const results = await request(graphqlAPI, query)
  return results.postsConnection.edges
}
