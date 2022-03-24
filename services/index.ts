import { request, gql } from 'graphql-request'

const graphqlAPI =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql'

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
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  const results = await request(graphqlAPI, query)
  return results.postsConnection.edges
}

export const getPostDetails = async (slug: any) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
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
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `
  const results = await request(graphqlAPI, query, { slug })
  return results.post
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
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
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
  const results = await request(graphqlAPI, query, { categories, slug })
  return results.posts
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const results = await request(graphqlAPI, query)
  return results.categories
}

export const submitComment = async (obj: any) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
  return result.json()
}

export const getComments = async (slug: any) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `
  const results = await request(graphqlAPI, query, { slug })
  return results.comments
}

export const getCategoryPost = async (slug: any) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              biography
              name
              id
              picture {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            coverImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })
  return result.postsConnection.edges
}
