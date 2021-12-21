module.exports = `
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
type Mission {
    name: String
    missionPatch(size: PatchSize): String
}
type Query {
    launches(
      pageSize: Int
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
}
type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
}
enum PatchSize {
    SMALL
    LARGE
}

`;
