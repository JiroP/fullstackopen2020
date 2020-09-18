const lodash = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length ? blogs.reduce((sum, blog) => sum + blog.likes, 0) : 0;
};

const favoriteBlog = (blogs) => {
  return blogs.length
    ? blogs.reduce(
        (prev, current) => (prev.likes > current.likes ? prev : current),
        { likes: -1 }
      )
    : null;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const blogsByAuthor = lodash.groupBy(blogs, 'author');
  const authorsWithNofBlogs = lodash.map(blogsByAuthor, (blogList, author) => ({
    author,
    blogs: blogList.length,
  }));
  return authorsWithNofBlogs.reduce(
    (prev, current) => (prev.blogs > current.blogs ? prev : current),
    { blogs: -1 }
  );
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const blogsByAuthor = lodash.groupBy(blogs, 'author');
  const authorsWithNOfLikes = lodash.map(blogsByAuthor, (blogList, author) => ({
    author,
    likes: blogList.reduce((sum, blog) => sum + blog.likes, 0),
  }));
  return authorsWithNOfLikes.reduce(
    (prev, current) => (prev.likes > current.likes ? prev : current),
    { likes: -1 }
  );
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
