const { func } = require("prop-types");

describe('checking that the application displays the login form by default.', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: '12345'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000');
    })

    it('Login form is shown', function () {
        cy.contains('log in to the application');
        cy.get('#login-form');
        cy.get('#username');
        cy.get('#password');
        cy.get('#login-button');
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('mluukkai');
            cy.get('#password').type('12345');
            cy.get('#login-button').click();
            cy.contains('Matti Luukkainen logged in');
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('mluukkai');
            cy.get('#password').type('1234');
            cy.get('#login-button').click();
            cy.get('.error')
                .should('contain', 'wrong username or password')
                .should('have.css', 'background-color', 'rgb(255, 210, 210)');
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('mluukkai');
            cy.get('#password').type('12345');
            cy.get('#login-button').click();
        })

        it('A blog can be created', function () {
            cy.contains('Create new blog').click();
            cy.get('#title').type('Cool Post 2');
            cy.get('#author').type('Peter Lustig');
            cy.get('#url').type('https://test.com');
            cy.get('#create-blog-button').click();
            cy.get('#blogs > *').should('have.length', 1);
            cy.contains('Cool Post 2');
            cy.contains('Peter Lustig');
        })

        it('checks that user can like a blog', function () {
            cy.contains('Create new blog').click();
            cy.get('#title').type('Cool Post 2');
            cy.get('#author').type('Peter Lustig');
            cy.get('#url').type('https://test.com');
            cy.get('#create-blog-button').click();
            cy.get('.toggle-button').click();
            cy.contains('likes 0');
            cy.get('.like-button').click();
            cy.contains('likes 1');
        })
    })
})