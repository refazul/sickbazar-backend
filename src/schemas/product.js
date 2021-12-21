module.exports = `
type Product {
    id: ID!
    title: String!
    description: String
    group: Group
    categories: [Category]
    prices: [Price]
}
input ProductInput {
    title: String
    description: String
    groupID: ID
}
type Mutation {
    createProduct(input: ProductInput): GenericResponse
    updateProduct(productID: ID!, input: ProductInput): GenericResponse
    deleteProduct(productID: ID!): GenericResponse
}
`;
