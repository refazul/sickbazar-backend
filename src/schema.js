const { gql } = require('apollo-server');
const group = require('./schemas/group')
const launch = require('./schemas/launch')
const product = require('./schemas/product')
const user = require('./schemas/user')

const all = `
  # Your schema will go here
  type Category {
    id: ID!
    title: String!
  }
  type Seller {
    id: ID!
    title: String!
  }
  type Price {
    seller: Seller
    price: Float
    stock: Int
  }
  type Mutation {
    addStock(productID: ID!, sellerID: ID!, price: Float!, stock: Int!): GenericResponse
  }
  input GenericInput {
    title: String
    description: String
  }
  type GenericResponse {
    success: String
    message: String
  }
  
`
.concat(group)
.concat(product)
.concat(launch)
.concat(user)

const typeDefs = gql`${all}`

module.exports = typeDefs;
