// import { GraphQLClient, gql } from 'graphql'

import { gql, GraphQLClient } from 'graphql-request'

const graphqlAPI =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql'
const graphqlCMS_TOKEN = process.env.GRAPHCMS_TOKEN

export default async function comments(req: Request, res: any) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphqlCMS_TOKEN}`,
    },
  })

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `
  try {
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result)
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}
