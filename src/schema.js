const { gql } = require('apollo-server');

class Schema {
  constructor({ Entity, EntityExtra = '', EntityInputExtra = '' }) {
    this.Entity = Entity;
    this.EntityExtra = EntityExtra;
    this.EntityInputExtra = EntityInputExtra;
  }
  pluralize() {
    return this.Entity.slice(-1) == 'y' ? this.Entity.slice(0, -1) + 'ies' : this.Entity + 's';
  }
  crud_gql() {
    return `
    type ${this.Entity} {
        id: ID!
        title: String!
        description: String
        image: String
        ${this.EntityExtra}
    }
    input ${this.Entity}Input {
        title: String
        description: String
        image: String
        ${this.EntityInputExtra}
    }
    type Query {
        read${this.Entity}(entityID: ID!): ${this.Entity}
        read${this.pluralize()}(title: String!): [${this.Entity}]
    }
    type Mutation {
        create${this.Entity}(input: ${this.Entity}Input): GenericResponse
        update${this.Entity}(entityID: ID!, input: ${this.Entity}Input): GenericResponse
        delete${this.Entity}(entityID: ID!): GenericResponse
    }
    `
  }
}

const ProductEntityExtra = `
group: Group
categories: [Category]
`
const ProductEntityInputExtra = `
groupID: ID
`

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
  .concat(new Schema({ Entity: 'Group' }).crud_gql())
  .concat(new Schema({ Entity: 'Category' }).crud_gql())
  .concat(new Schema({ Entity: 'Product', EntityExtra: ProductEntityExtra, EntityInputExtra: ProductEntityInputExtra }).crud_gql())
  .concat(new Schema({ Entity: 'Vendor'}).crud_gql())

const typeDefs = gql`${all}`

module.exports = typeDefs;
