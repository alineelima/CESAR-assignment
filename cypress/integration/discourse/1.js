/// <reference types="cypress" />

describe('Atividade de Automação 1', () => {

	before (() => {
		cy.visit('https://www.discourse.org/')
		cy.contains('Demo').invoke('removeAttr', 'target').click()  

		cy.scrollTo('bottom', {duration: 5000})
		cy.scrollTo('bottom', {duration: 5000})
	})

	it('Imprimir todos os tópicos com cadeado', () => {

		cy.log('Tópicos fechados')
  
		cy.get('svg.locked').parents('.link-top-line').find('.title').each((title) => { 
			
			cy.log(title.text())
	
		})
	
	})

    it('Imprimir a quantidade de tópicos por tipo', () => {
		
		let map_count = new Map();
		cy.wrap(map_count).as('map_count')
  
		cy.get('span.badge-category > span.category-name').each((html_type) => {
			
			cy.get(html_type).invoke('text').then((t) => {
				
				const type = t
				cy.wrap(type).as('type')
				
			})
			
			cy.get('@type').then(type => {
			cy.get('@map_count').then(mc => {
				if (map_count.has(type)) {
			
					mc.get(type).val++;
				
				} else {
				
					mc.set(type, {val: 1})
			
				}
				
				map_count = new Map(mc)
			});
			});
		})
		
		cy.get('@map_count').then(map_count => {
			
			cy.log('Categorias')
			let total_count = 0;
						
			for (const [key, value] of map_count.entries()) {
				cy.log(key + ' ' + value.val)
				total_count += value.val
				
			}
			
			cy.wrap(total_count).as('total_count')
		});
		
		cy.get('@total_count').then(tc => {
		cy.get('.topic-list-item').then(($el) => {
			cy.log('Tópicos sem categoria')
			cy.log($el.length - tc)
		});
		});
	})

    it('Tópico com maior número de views', () => {

        cy.contains('Views').click()
		
		cy.get('.topic-list-item').first().then((el) => {
			
			cy.log('Tópico com mais views')
			cy.wrap(el).find('.title').invoke('text').then(cy.log)
			cy.wrap(el).find('.views').invoke('text').then(cy.log)
			
		})
	})

})