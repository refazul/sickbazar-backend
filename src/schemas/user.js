module.exports = `
type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
}
type Query {
    me: User
}
type Mutation {
    login(email: String): User
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
}
type TripUpdateResponse {
    success: String
    message: String
    launches: [Launch]
}
`;
