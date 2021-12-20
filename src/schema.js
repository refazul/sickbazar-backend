const { gql } = require('apollo-server');

const typeDefs = gql`
  # Your schema will go here
  type Group {
    id: ID!
    name: String!
  }
  type Category {
    id: ID!
    name: String!
  }
  type Seller {
    id: ID!
    name: String!
  }
  type Product {
    id: ID!
    name: String!
    description: String
    group: Group
    categories: [Category]
    prices: [Price]
  }
  input ProductInput {
    name: String
    description: String
  }
  type Price {
    seller: Seller
    price: Float
    stock: Int
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }
  type Rocket {
    id: ID!
    name: String
    type: String
  }
  
  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }
  
  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }
  
  enum PatchSize {
    SMALL
    LARGE
  }

  type Query {
    launches(
      pageSize: Int
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): User

    createProduct(input: ProductInput): GenericResponse
    updateProduct(productID: ID!, input: ProductInput): GenericResponse
    deleteProduct(productID: ID!): GenericResponse
    addStock(productID: ID!, sellerID: ID!, price: Float!, stock: Int!): GenericResponse
  }
  type GenericResponse {
    success: String
    message: String
  }
  type TripUpdateResponse {
    success: String
    message: String
    launches: [Launch]
  }
`;

module.exports = typeDefs;
