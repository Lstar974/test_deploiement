/// <reference types="cypress" />

describe('Page de test', () => {
  it('Doit charger la page principale', () => {
    // Visiter la page principale
    cy.visit('http://localhost:8080'); // Remplacez par l'URL de votre application

    // Vérifier que le titre contient le bon texte
    cy.title().should('include', 'Titre de la page'); // Remplacez par le titre attendu
  });

  it('Doit incrémenter le compteur au clic', () => {
    // Visiter la page principale
    cy.visit('http://localhost:8080'); // Remplacez par l'URL de votre application

    // Vérifier la valeur initiale du compteur
    cy.get('#clickCounter').should('have.text', '0');

    // Simuler un clic sur un bouton
    cy.get('#incrementButton').click();

    // Vérifier que le compteur a été incrémenté
    cy.get('#clickCounter').should('have.text', '1');
  });

  it('Doit soumettre un formulaire avec un email valide', () => {
    // Visiter la page de formulaire
    cy.visit('http://localhost:8080/contact'); // Remplacez par l'URL de votre page de formulaire

    // Saisir une adresse e-mail valide
    cy.get('input[type="email"]').type('test@example.com');

    // Soumettre le formulaire
    cy.get('form').submit();

    // Vérifier qu'un message de succès s'affiche
    cy.get('.success-message').should('be.visible').and('contain', 'Message envoyé');
  });
});
