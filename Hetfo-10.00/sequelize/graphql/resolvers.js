module.exports = {
  Query: {
    add: async (_, { x, y }) => x + y,
    hello: () => { return "world" },
    hello2: () => { return "world2" }
  }
}
