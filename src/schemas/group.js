module.exports = `
type Group {
    id: ID!
    title: String!
    description: String
}
type Query {
    readGroup(groupID: ID!): Group
}
type Mutation {
    createGroup(input: GenericInput): GenericResponse
    updateGroup(groupID: ID!, input: GenericInput): GenericResponse
    deleteGroup(groupID: ID!): GenericResponse
}
`;
