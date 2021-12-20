const { paginateResults } = require('./utils');
const { UserMutations, UserQueries } = require('./resolvers/user')
const { LaunchMutations, LaunchQueries } = require('./resolvers/launch')
const { ProductMutations, ProductQueries } = require('./resolvers/product')

module.exports = {
    Query: {
        ...UserQueries,
        ...LaunchQueries,
        ...ProductQueries,
    },
    Mutation: {
        ...UserMutations,
        ...LaunchMutations,
        ...ProductMutations
    },
    Mission: {
        // The default size is 'LARGE' if not provided
        missionPatch: (mission, { size } = { size: 'LARGE' }) => {
            return size === 'SMALL'
                ? mission.missionPatchSmall
                : mission.missionPatchLarge;
        },
    },
    Launch: {
        isBooked: async (launch, _, { dataSources }) =>
            dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
    },
    User: {
        trips: async (_, __, { dataSources }) => {
            // get ids of launches by user
            const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
            if (!launchIds.length) return [];
            // look up those launches by their ids
            return (
                dataSources.launchAPI.getLaunchesByIds({
                    launchIds,
                }) || []
            );
        },
    },
};