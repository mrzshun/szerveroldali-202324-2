const { User, Post, Category } = require('../models');
const auth = require('./auth');

module.exports = {
  Query: {
    add: async (_, { x, y }) => x + y,
    hello: () => { return "world" },
    hello2: () => { return "world2" },
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
    users: auth(
      async () => {
        return await User.findAll();
      }
    ),
  },
  Category: {
    posts: async (category) => {
      return await category.getPosts()
    }
  },
  Post: {
    categories: async (post) => {
      return await post.getCategories()
    }
  },
  Mutation: {
    createCategory: auth(async (_, { cat }, context) => {
      return (
        await Category.create(
          {
            name: cat.name,
            color: cat.color
          }
        )
      );
    }),
    createPost: auth(async (_, { post }, context) => {
      const newPost = await Post.create(
        {
          title: post.title,
          description: post.description,
          text: post.text,
          UserId: context.user.payload.id,
        }
      );
      const postCat = [];
      for(const catId of post.categories) {
        postCat.push(await Category.findByPk(catId));
      }
      await newPost.setCategories(postCat);
      return newPost;
    }),
    updatePost: auth(async (_, { post }, context) => {
      const updatedPost = await Post.findByPk(post.id);
      if(updatedPost == null) {
        return "Post does not exist";
      } else if (updatedPost.UserId != context.user.payload.id) {
        return null;
      }
      await updatedPost.setCategories(post.categories);
      return updatedPost;
    }),

  }

}
