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

describe('post operations with missing data return 400', () => {
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

describe('delete operations', () => {
  let response;
  beforeEach(async () => {
    response = await api.get('/api/blogs');
  });

  test(' of existing blog delete the id', async () => {
    const idToBeDeleted = response.body[0].id;
    await api.delete(`/api/blogs/${idToBeDeleted}`);
    const blogsAtEnd = await api.get('/api/blogs');
    const deletedBlog = blogsAtEnd.body.find(({ id }) => id === idToBeDeleted);
    expect(deletedBlog).toBe(undefined);
  });

  test(' return 204 on valid id', async () => {
    const idToBeDeleted = response.body[0].id;
    await api.delete(`/api/blogs/${idToBeDeleted}`).expect(204);
  });

  test(' are idempotent', async () => {
    const idToBeDeleted = response.body[0].id;
    await api.delete(`/api/blogs${idToBeDeleted}`);
    const blogsAfterOneOperation = await api.get('/api/blogs');

    const deleteOps = [0, 1, 2, 3, 4, 5].map(() =>
      api.delete(`/api/blogs${idToBeDeleted}`)
    );
    await Promise.all(deleteOps);

    const blogsAfterDeleteOps = await api.get('/api/blogs');

    expect(blogsAfterDeleteOps.body).toEqual(blogsAfterOneOperation.body);
  });
});

describe('editing likes of a blog', () => {
  test(' works correctly for an existing blog', async () => {
    const blogRes = await api.get('/api/blogs');
    const blog = blogRes.body[0];

    await api.put(`/api/blogs/${blog.id}`).send({
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: 20,
    });

    const blogsAtEnd = await api.get('/api/blogs');
    const updatedBlog = blogsAtEnd.body.find(({ id }) => id === blog.id);

    expect(updatedBlog.likes).toBe(20);
  });

  test(' returns 400 on bad id', async () => {
    await api
      .put(`/api/blogs/randomId}`)
      .send({ title: 'some title', url: 'url', author: 'yes' })
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
