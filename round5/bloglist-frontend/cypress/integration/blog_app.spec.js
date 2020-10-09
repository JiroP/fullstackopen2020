describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testi Luukas',
      username: 'Luukas',
      password: 'salainen'
    }
    const userWithNoBlogs = {
      name: 'Testi markus',
      username: 'Markus',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', userWithNoBlogs)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#login-form')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Luukas')
      cy.get('#password').type('salainen')
      cy.get('#submit').click()

      cy.get('#notification').contains('logged in successfully')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Luukas')
      cy.get('#password').type('wrong')
      cy.get('#submit').click()

      cy.get('#notification')
        .contains('invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('#login-form')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Luukas', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()

      cy.get('#author').type('Edgar')
      cy.get('#title').type('cypress testing')
      cy.get('#url').type('test url')
      cy.contains(' create').click()

      cy.contains('Edgar')
      cy.contains('cypress testing')
    })

    describe('A blog created by the user', function () {
      beforeEach(function () {
        cy.createBlog({ author: 'Edgar', title: 'cypress testing', url: 'test url' })
      })

      it('can be liked', function () {
        cy.contains('view').click()
        cy.contains('likes 0')

        cy.get('#like-button').click()
        cy.contains('likes 1')
      })

      it('can be deleted by the creator', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('Edgar').should('not.exist')
      })

      it('can\'t be deleted by non creator', function() {
        cy.contains('logout').click()

        cy.get('#username').type('Markus')
        cy.get('#password').type('salainen')
        cy.get('#submit').click()

        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
    })

    describe('with many blogs', function () {
      beforeEach(function() {
        cy.createBlog({
          title: 'Titteli 1',
          author: 'Edgar',
          url: 'Joku url',
          likes: 5
        })
        cy.createBlog({
          title: 'Titteli 3',
          author: 'Edgar',
          url: 'Joku url',
          likes: 6
        })
        cy.createBlog({
          title: 'Titteli 4',
          author: 'Edgar',
          url: 'Joku url',
          likes: 8
        })
        cy.createBlog({
          title: 'Tittle 5',
          author: 'Edgar',
          url: 'Joku url',
          likes: 2
        })
      })
      it('most liked blog is shown first', function () {
        cy.get('#blog').contains('Titteli 4')
      })
    })
  })
})
