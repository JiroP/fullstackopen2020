const mongoose = require('mongoose');
// eslint-disable-next-line node/no-unpublished-require
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blogs identifier is named id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

describe('post operation for blog', () => {
  beforeEach(async () => {
    await api.post('/api/blogs').send({
      title: 'Type warsss',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      // likes: 0,
    });
  });

  test(' length is incremented by 1', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test(' correct blog is added', async () => {
    const blogsAtEnd = await api.get('/api/blogs');

    const titles = blogsAtEnd.body.map((r) => r.title);
    expect(titles).toContainEqual('Type warsss');
  });

  test(' if likes is not sent it is 0', async () => {
    const blogsAtEnd = await api.get('/api/blogs');

    const addedBlog = blogsAtEnd.body.find(
      (blog) => blog.title === 'Type warsss'
    );

    expect(addedBlog.likes).toBe(0);
  });
});

describe('post operations with missing data', () => {
  test(': no url', async () => {
    await api
      .post('/api/blogs')
      .send({ title: 'Type warsss', author: 'Robert C. Martin' })
      .expect(400);
  });

  test(': no title', async () => {
    await api
      .post('/api/blogs')
      .send({ author: 'Robert C. Martin', url: 'Some url' })
      .expect(400);
  });

  test(': no url/title', async () => {
    await api
      .post('/api/blogs')
      .send({ author: 'Robert C. Martin' })
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
