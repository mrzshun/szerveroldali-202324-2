const { User, Post, Category } = require('./models');
const md5 = require('md5');
const { readFileSync } = require('fs');

const fastify = require('fastify')({
    logger: true
})

const mercurius = require('mercurius')

fastify.register(mercurius, {
    schema: readFileSync('./graphql/schema.gql').toString(),
    resolvers: require('./graphql/resolvers.js'),
    graphiql: true,
})


fastify.register(require('@fastify/jwt'), {
    secret: 'supersecret'
})

fastify.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
})

// fastify.addHook("onRequest", async (request, reply) => {
//     try {
//       await request.jwtVerify()
//     } catch (err) {
//       reply.send(err)
//     }
// })

// Declare a route
fastify.get('/who',
    {
        onRequest: [fastify.authenticate]
    },
    async (request, reply) => {
        return request.user
    }
)

fastify.post('/login', {
    schema: {
        body: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
            }
        }
    }
}, async (request, reply) => {
    const { email, password } = request.body;
    const user = await User.findOne({
        where: {
            email: email
        }
    });
    if (!user) {
        return reply.status(401).send({ message: "Email does not exist in database." });
    } else if (!user.checkPassword(password)) {
        return reply.status(401).send({ message: "The given password is incorrect." });
    } else {
        const token = fastify.jwt.sign({
            payload: user.toJSON(),
        });
        return reply.send({ token });
    }
})


// Declare a route
fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
})

// Declare a route
fastify.get('/categories', async (request, reply) => {
    const categories = await Category.findAll();
    reply.send(categories);
})

fastify.get('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' }
            }
        }
    }
}, async (request, reply) => {
    const category = await Category.findByPk(request.params.id);
    if (category == null) {
        return reply.status(404).send("No category with the given ID (".concat(request.params.id).concat(")"));
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
                name: { type: 'string' },
                color: { type: 'string', pattern: '^#[a-fA-F0-9]{6}$' },
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
                id: { type: 'number' }
            }
        },
        body: {
            type: 'object',
            required: ['name', 'color'],
            properties: {
                name: { type: 'string' },
                color: { type: 'string', pattern: '^#[a-fA-F0-9]{6}$' },
            }
        }
    }
}, async (request, reply) => {
    const category = await Category.findByPk(request.params.id);
    if (category == null) {
        return reply.status(404).send("No category with the given ID (".concat(request.params.id).concat(")"));
    }
    const { name, color } = request.body;
    await category.update({ name, color });
    reply.send(category);

    // reply.send(category);
})


fastify.patch('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' }
            }
        },
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                color: { type: 'string', pattern: '^#[a-fA-F0-9]{6}$' },
            }
        }
    }
}, async (request, reply) => {
    const category = await Category.findByPk(request.params.id);
    if (category == null) {
        return reply.status(404).send("No category with the given ID (".concat(request.params.id).concat(")"));
    }
    const { name, color } = request.body;
    await category.update({ name, color });
    reply.send(category);

    // reply.send(category);
})

fastify.delete('/categories', async (request, reply) => {
    await Category.destroy({
        where: {},
    });
    reply.status(204).send({});
})

fastify.delete('/categories/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' }
            }
        }
    }
}, async (request, reply) => {
    const category = await Category.findByPk(request.params.id);
    if (category == null) {
        return reply.status(404).send("No category with the given ID (".concat(request.params.id).concat(")"));
    }
    category.destroy();
    reply.status(204).send();
})


// fastify.get('/:id', {
//     schema: {
//         params: {
//             type: 'object',
//             properties: {
//                 id: { type: 'number' }
//             }
//         }
//     }
// }, (request, reply) => {
//     reply.send({ hello: request.params.id })
// })


fastify.get('/posts', async (request, reply) => {
    const posts = await Post.findAll();
    reply.send(posts);
})

fastify.get('/posts/:id', {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' }
            }
        }
    }
}, async (request, reply) => {
    const post = await Post.findByPk(request.params.id);
    if (post == null) {
        return reply.status(404).send({ message: "There is no post in the database with the given ID (".concat(request.params.id).concat(")") });
    }
    reply.send(post);
})

fastify.post('/posts', {
    onRequest: [fastify.authenticate],
    schema: {
        body: {
            type: 'object',
            required: ['title', 'description', 'text'],
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                text: { type: 'string' },
            }
        }
    }
}, async (request, reply) => {
    const { title, description, text } = request.body;
    const user = await User.findByPk(request.user.payload.id);
    const post = (await user.createPost({
        title: title,
        description: description,
        text: text,
    }));

    reply.send(post);
})

fastify.put('/posts/:id', {
    onRequest: [fastify.authenticate],
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' }
            }
        },
        body: {
            type: 'object',
            required: ['title', 'description', 'text'],
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                text: { type: 'string' },
            }
        }
    }
}, async (request, reply) => {
    const post = await Post.findByPk(request.params.id);
    if (post == null) {
        return reply.status(404).send("There is no post with the given ID in the database (".concat(request.params.id).concat(")"));
    }
    const user = await post.getUser();
    if (user.id != request.user.payload.id) {
        return reply.status(401).send({ message: "The user is not the owner of the post!" });
    }

    const { title, description, text } = request.body;
    await post.update({ title, description, text });
    reply.send(post);

    // reply.send(category);
})


// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
})