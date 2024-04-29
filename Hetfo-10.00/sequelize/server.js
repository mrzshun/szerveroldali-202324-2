const { User, Post, Category } = require('./models');

const fastify = require('fastify')({
    logger: true
})

// Declare a route
fastify.get('/', (request, reply) => {
    reply.send({ hello: 'world' })
})

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
    if(category == null) {
        return reply.status(404).send({
            message: "There is no category with the selected ID (".concat(request.params.id).concat(")"),
        })
    }
    reply.send(category);
})

fastify.post('/categories', {
    schema: {
        body: {
            type: 'object',
            required: ['name','color'],
            properties: {
                name: { type: "string" },
                color: { type: "string", pattern: "^#[a-fA-F0-97]{6}$" }
            }
        }
    }
}, async (request, reply) => {
    const { name, color } = request.body;
    const category = await Category.create({name,color});
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
            required: ['name','color'],
            properties: {
                name: { type: "string" },
                color: { type: "string", pattern: "^#[a-fA-F0-97]{6}$" }
            }
        }
    }
}, async (request, reply) => {
    const category = await Category.findByPk(request.params.id);
    if(category == null) {
        return reply.status(404).send({
            message: "There is no category with the selected ID (".concat(request.params.id).concat(")"),
        })
    }
    const { name, color } = request.body;
    await category.update({name,color});
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
    if(category == null) {
        return reply.status(404).send({
            message: "There is no category with the selected ID (".concat(request.params.id).concat(")"),
        })
    }
    const { name, color } = request.body;
    await category.update({name,color});
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