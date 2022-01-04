module.exports = `
type Group {
    id: ID!
    title: String!
    description: String
}
input GroupInput {
    title: String
    description: String
    image: String
}
type Query {
    readGroup(groupID: ID!): Group
    readGroups(title: String!): [Group]
}
type Mutation {
    createGroup(input: GenericInput): GenericResponse
    updateGroup(groupID: ID!, input: GenericInput): GenericResponse
    deleteGroup(groupID: ID!): GenericResponse
}
`;
