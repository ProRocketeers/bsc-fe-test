/// <reference types="Cypress" />
/* eslint-disable no-undef */

describe('list', function() {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render list of items', function() {
    cy.get('#root')
      .find('table td a')
      .should($items => {
        const $first = $items.eq(0);
        expect($first).attr('href', '/note/detail/1');
        expect($first).to.contain('Jogging in park');

        const $second = $items.eq(1);
        expect($second).attr('href', '/note/detail/2');
        expect($second).to.contain('Pick-up posters from post-office');
      });
  });

  it('should render detail after click on link', function() {
    cy.get('#root')
      .find('table a')
      .eq(0)
      .click()
      .location('pathname')
      .should('eq', '/note/detail/1');
  });

  it('should remove deleted item', function() {
    const removeBtnPath = '#root table tbody tr .btn-danger';
    cy.get(removeBtnPath)
      .should('have.length', 2)

      .eq(0)
      .click();

    cy.get(removeBtnPath).should('have.length', 1);
  });
});

describe('detail', function() {
  beforeEach(() => {
    cy.visit('/note/detail/1');
  });

  it('should render edit button', function() {
    cy.get('#root')
      .find('.container button')
      .first()
      .click()
      .location('pathname')
      .should('eq', '/note/edit/1');
  });

  it('should have h1', function() {
    cy.get('#root')
      .find('h1')
      .should('contain', 'Pick-up posters from post-office');
  });
});

describe('create', function() {
  beforeEach(() => {
    cy.visit('/create-note');
  });

  it('should render input with button', function() {
    cy.get('#root #note').should('have.attr', 'type', 'text');
    cy.get('#root .btn-primary').should('be.enabled');
  });
});
