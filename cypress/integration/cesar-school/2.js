/// <reference types="cypress" />

describe('Atividade de Automação 2', () => {

	before (() => {
		cy.visit('https://www.cesar.school')
		cy.get('.menu-item-15376').realHover().contains('Blog').should('be.visible').click({ force: true })
		cy.get('.nav-links > :nth-child(2)').click()
	})
	
	it('Atividade 2', () => {
		cy.get('.entry-title').eq(1).invoke('text').then((t) => {
			let titulo_segundo_post = t
			cy.wrap(titulo_segundo_post).as('titulo_segundo_post')
		})

		cy.get('.entry-date').eq(1).invoke('text').then((t) => {
			let data_segundo_post = t
			cy.wrap(data_segundo_post).as('data_segundo_post')
		})

		cy.get('.entry-title').eq(2).invoke('text').then((t) => {
			let titulo_terceiro_post = t
			cy.wrap(titulo_terceiro_post).as('titulo_terceiro_post')
		})

		cy.get('.author-name').eq(2).invoke('text').then((t) => {
			let autor_terceiro_post = t
			cy.wrap(autor_terceiro_post).as('autor_terceiro_post')
		})

		cy.scrollTo('bottom')

		cy.get('.onde > p').invoke('text').then((t) => {
			let local = t
			cy.wrap(local).as('local')
		})

		cy.get('@titulo_segundo_post').then(t => {
			cy.log('Título do segundo post: ' + t)
		})

		cy.get('@data_segundo_post').then(t => {
			cy.log('Data do segundo post: ' + t)
		})

		cy.get('@titulo_terceiro_post').then(t => {
			cy.log('Título do terceiro post: ' + t)
		})

		cy.get('@autor_terceiro_post').then(t => {
			cy.log('Autor do terceiro post: ' + t)
		})

		cy.get('@local').then(t => {
			cy.log('Endereço do School: ' + t)
		})
	})
})