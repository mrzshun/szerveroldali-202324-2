const md5 = require('md5');
const { User, Post, Category } = require('./models');
const {readFileSync, readSync} = require('fs');

const fastify = require('fastify')({
    logger: true
})

const mercurius = require('mercurius')



fastify.register(mercurius, {
  schema: readFileSync('./graphql/schema.gql').toString(),
  resolvers: require('./graphql/resolvers'),
  graphiql: true,
})

fastify.register(require('@fastify/jwt'), {
    secret: 'your-256-bit-secret'
})


fastify.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
})


// Declare a route
fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
})

fastify.get(
    '/who',
    {
        onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
        reply.send(request.user)
    }
)

fastify.post('/login', {
    schema: {
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { type: "string" },
                password: { type: "string" },
            }
        }
    }
}, async (request, reply) => {
    const { email, password } = request.body;
    const user = await User.findOne({
        where: {
            email: email,
        },
    });
    if (!user) {
        return reply.status(401).send({ message: "The user does not exist" });
    } else if (!user.checkPassword(password)) {
        return reply.status(401).send({ message: "Password is incorrect" });
    } else {
        const token = fastify.jwt.sign({
            payload: user.toJSON(),
        })
        return reply.send({ token });
    }
})

// fastify.addHook("onRequest", async (request, reply) => {
//     try {
//         await request.jwtVerify()
//     } catch (err) {
//         reply.send(err)
//     }
// })

fastify.get('/categories', async (request, reply) => {
    const categories = await Category.findAll();
    reply.send(categories);
})

fastify.get('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: "number"
                }
            }
        }
    }
}, async (request, reply) => {
    const category = await Category.findByPk(request.params.id);
    if (category == null) {
        return reply.status(404).send({
            message: "There is no category with the selected ID (".concat(request.params.id).concat(")"),
        })
    }
    reply.send(category);
})

fastify.post('/categories', {
    onRequest: [fastify.authenticate],
    schema: {
        body: {
            type: 'object',
            required: ['name', 'color'],
            properties: {
                name: { type: "string" },
                color: { type: "string", pattern: "^#[a-fA-F0-97]{6}$" }
            }
        }
    }
}, async (request, reply) => {
    const { name, color } = request.body;
    const category = await Category.create({ name, color });
    reply.send(category);
})

fastify.put('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: "number"
                }
            }
        },
        body: {
            type: 'object',
            required: ['name', 'color'],
            properties: {
                name: { type: "string" },
                color: { type: "string", pattern: "^#[a-fA-F0-97]{6}$" }
            }
        }
    }
}, async (request, reply) => {
    const category = await Category.findByPk(request.params.id);
    if (category == null) {
        return reply.status(404).send({
            message: "There is no category with the selected ID (".concat(request.params.id).concat(")"),
        })
    }
    const { name, color } = request.body;
    await category.update({ name, color });
    reply.send(category);
})

fastify.patch('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: "number"
                }
            }
        },
        body: {
            type: 'object',
            properties: {
                name: { type: "string" },
                color: { type: "string", pattern: "^#[a-fA-F0-97]{6}$" }
            }
        }
    }
}, async (request, reply) => {
    const category = await Category.findByPk(request.params.id);
    if (category == null) {
        return reply.status(404).send({
            message: "There is no category with the selected ID (".concat(request.params.id).concat(")"),
        })
    }
    const { name, color } = request.body;
    await category.update({ name, color });
    reply.send(category);
})

fastify.delete('/categories', async (request, reply) => {
    await Category.destroy({
        where: {},
    });
    reply.send(204);
})

fastify.get('/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: {
                    type: "number"
                }
            }
        }
    }
}, (request, reply) => {
    reply.send({ hello: request.params.id })
})


// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
})