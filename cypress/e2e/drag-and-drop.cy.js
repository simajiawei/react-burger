describe('drag and drop ingredient to constructor', function () {
  const homePage = 'http://localhost:3000/';
  before('should be available on localhost:3000', function () {
    cy.visit(homePage);
  });

  it('should drag ingredient to constructor and create order', function () {
    const dataTransfer = new DataTransfer();

    cy.get('[class^=ingredient_card__]').first().as('ingredient');
    cy.get('[class^=burger-constructor_constructor__]').first().as('constructor');
    cy.get('button').contains('Оформить заказ').as('orderButton');

    cy.get('@constructor').contains('Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа');
    cy.get('@orderButton').should('be.disabled');

    cy.get('@ingredient').trigger('dragstart', {
      dataTransfer
    });

    cy.get('@constructor').trigger('drop', {
      dataTransfer
    });

    cy.get('@constructor').siblings(cy.get('@ingredient')).should('have.length', 1);

    // create order

    cy.get('@orderButton').click();
    cy.url().should('include', '/login');

    cy.get('input[name="email"]').type('react-burger-alex2@yopmail.com');
    cy.get('input[name="password"]').type('test123');

    cy.get('button').contains('Войти').as('loginButton');

    cy.get('@loginButton').click();

    cy.url().should('equal', homePage);

    cy.get('@orderButton').click();
    cy.wait(15000);

    cy.get('[class^=order-details_card__]').first().as('orderCard');

    cy.get('@orderCard').contains('Ваш заказ начали готовить');
  });
});
