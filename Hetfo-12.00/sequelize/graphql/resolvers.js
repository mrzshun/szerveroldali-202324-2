module.exports = {
    Query: {
        add: async (_, { x, y }) => x + y,
        hello: () => { return "World"; },
        hello2: () => { return "World"; }
    }
}
