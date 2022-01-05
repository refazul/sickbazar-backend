module.exports = `
type Category {
    id: ID!
    title: String!
    description: String
}
input CategoryInput {
    title: String
    description: String
    image: String
}
type Query {
    readCategory(categoryID: ID!): Category
    readCategories(title: String!): [Category]
}
type Mutation {
    createCategory(input: CategoryInput): GenericResponse
    updateCategory(categoryID: ID!, input: CategoryInput): GenericResponse
    deleteCategory(categoryID: ID!): GenericResponse
}
`;
