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

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        coverImage {
          url
        }
        createdAt
        slug
      }
    }
  `
    const results = await request(graphqlAPI, query)
    return results.posts
}

export const getSimilarPosts = async (categories: any, slug: any) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories } } }
        last: 3
      ) {
        title
        coverImage {
          url
        }
        createdAt
        slug
      }
    }
  `
    const results = await request(graphqlAPI, query, {slug, categories})
    return results.posts
}
