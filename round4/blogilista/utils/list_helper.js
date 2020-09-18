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

module.exports = { dummy, totalLikes, favoriteBlog };
