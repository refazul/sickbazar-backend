module.exports = `
type Group {
    id: ID!
    title: String!
    description: String
    image: String
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
    createGroup(input: GroupInput): GenericResponse
    updateGroup(groupID: ID!, input: GroupInput): GenericResponse
    deleteGroup(groupID: ID!): GenericResponse
}
`;
