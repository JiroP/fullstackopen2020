const { ApolloServer, gql, UserInputError } = require('apollo-server')

const config = require('./utils/config')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return Book.find({ genres: args.genre }).populate('author')
      }

      return Book.find({}).populate('author')
      // let filteredBooks = args.author ? books.filter(({author}) => author === args.author) : books
      // filteredBooks = args.genre ? filteredBooks.filter(({genres}) => genres.includes(args.genre)) : filteredBooks
      // return filteredBooks
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const book = await Book.find({author: root._id})
      return book.length;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        let author = await Author.findOne({name: args.author})

        if (!author) {
          author = new Author({name: args.author})
          await author.save()
        }

        const book = new Book({...args, author: author})
        await book.save()
        
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args) => {
      // const author = authors.find(({name}) => name === args.name)
      const author = await Author.findOne({name: args.name})
      if (!author) {
        return null;
      }

      try {
         author.born = args.setBornTo
         await author.save()
         return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      // const updatedAuthor = { ...author, born: args.setBornTo }
      // authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      // return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})