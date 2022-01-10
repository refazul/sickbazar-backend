const { gql } = require('apollo-server');

class Schema {
  constructor({ Entity, TypeExtra = '', InputExtra = '', Extra = '' }) {
    this.Entity = Entity;
    this.TypeExtra = TypeExtra;
    this.InputExtra = InputExtra;
    this.Extra = Extra;
  }
  pluralize() {
    return this.Entity.slice(-1) == 'y' ? this.Entity.slice(0, -1) + 'ies' : this.Entity + 's';
  }
  crud_gql() {
    return `
    ${this.Extra}
    scalar JSON
    type ${this.Entity} {
        id: ID!
        title: String!
        description: String
        image: String
        ${this.TypeExtra}
    }
    input ${this.Entity}Input {
        title: String
        description: String
        image: String
        ${this.InputExtra}
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

const ProductTypeExtra = `
  groupID: ID
  categoryIDs: [ID]
  price: [JSON]
`
const ProductInputExtra = `
  groupID: ID
  categoryIDs: [ID]
`
const ProductExtra = `
input Stock {
  vendorID: ID!
  price: Float!
  quantity: Float!
  sku: String
  image: String
  unit: String
}
type Mutation {
  addStock(entityID: ID!, selector: JSON, stock: Stock): GenericResponse
  reduceStock(entityID: ID!, selector: JSON, reduceObj: JSON): GenericResponse
}

`
//////////////////////////
const AttributeTypeExtra = `
  name: String!
  group: Group
  type: AttributeType!
  options: [AttributeOption]
`
const AttributeInputExtra = `
  name: String!
  groupID: ID
  type: AttributeType!
`
const AttributeExtra = `
  enum AttributeType {
    color
    text
    image
  }
  type AttributeOption {
    title: String!
    value: String!
    color: String
    image: String
  }
  input AttributeOptionInput {
    title: String!
    value: String!
    color: String
    image: String
  }
  type Mutation {
    addOption(entityID: ID!, option: AttributeOptionInput): GenericResponse
  }
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
  .concat(new Schema({ Entity: 'Product', TypeExtra: ProductTypeExtra, InputExtra: ProductInputExtra, Extra: ProductExtra }).crud_gql())
  .concat(new Schema({ Entity: 'Vendor' }).crud_gql())
  .concat(new Schema({ Entity: 'Attribute', TypeExtra: AttributeTypeExtra, InputExtra: AttributeInputExtra, Extra: AttributeExtra }).crud_gql())

  console.log(all);
const typeDefs = gql`${all}`

module.exports = typeDefs;
