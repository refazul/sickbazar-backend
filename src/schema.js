const { gql } = require('apollo-server');
const category = require('./schemas/category');
const group = require('./schemas/group')
const product = require('./schemas/product')

const all = `
  # Your schema will go here
  input GenericInput {
    title: String
    description: String
  }
  type GenericResponse {
    success: String
    message: String
  }
  
`
.concat(category)
.concat(group)
.concat(product)

const typeDefs = gql`${all}`

module.exports = typeDefs;
