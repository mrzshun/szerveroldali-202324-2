const { User, Post, Category } = require('../models');
const auth = require('./auth');

module.exports = {
    Query: {
        add: async (_, { x, y }) => x + y,
        hello: () => { return "World"; },
        hello2: () => { return "World"; },
        who: auth(
            (parent, params, context) => {
                return "Hello ".concat(context.request.user.payload.email);
            }
        ),
        categories: async () => {
            return await Category.findAll();
        },
        posts: async () => {
            return await Post.findAll();
        },
        users: auth(async () => {
            return await User.findAll();
        }),
    },
    Mutation: {
        createCategory: auth(async (_, { category }, context) => {
            return Category.create({
                name: category.name,
                color: category.color
            });
        }),
        createPost: auth(async (_, { post }, context) => {
            const newPost = await Post.create({
                title: post.title,
                description: post.description,
                text: post.text,
                UserId: context.user.payload.id,
            });
            const postCat = [];
            for(const catId of post.categories) {
                const tmpcat = await Category.findByPk(catId);
                if(tmpcat != null) {
                    postCat.push(tmpcat);
                }
            }
            await newPost.setCategories(postCat);
            return newPost;
        }),
        updatePost: auth(async (_, { post }, context) => {
            const updatedPost = await Post.findByPk(post.id);
            if (updatedPost == null) {
                return null;
            }
            if(updatedPost.UserId != context.user.payload.id) {
                return null;
            }
            await updatedPost.update({
                title: post.title,
                description: post.description,
                text: post.text,
            });
            const postCat = [];
            for(const catId of post.categories) {
                const tmpcat = await Category.findByPk(catId);
                if(tmpcat != null) {
                    postCat.push(tmpcat);
                }
            }
            await updatedPost.setCategories(postCat);
            return updatedPost;
        }),
    },
    Post: {
        categories: async (post) => {
            return await post.getCategories();
        }
    },
    Category: {
        posts: async (category) => {
            return await category.getPosts();
        }
    },
}
