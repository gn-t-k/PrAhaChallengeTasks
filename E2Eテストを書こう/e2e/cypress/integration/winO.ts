describe("game statusのテスト", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  const square = (index: number) => `[data-testid="square-${index}"]`;

  it("Xが勝利したとき「Winner: X」が表示される", () => {
    cy.get(square(0)).click();
    cy.get(square(1)).click();
    cy.get(square(3)).click();
    cy.get(square(4)).click();
    cy.get(square(6)).click();

    cy.get("[data-testid='game-status']").should("have.text", "Winner: X");
  });

  it("引き分けたとき、「Draw」が表示される", () => {
    cy.get(square(0)).click();
    cy.get(square(1)).click();
    cy.get(square(2)).click();
    cy.get(square(3)).click();
    cy.get(square(5)).click();
    cy.get(square(6)).click();
    cy.get(square(7)).click();
    cy.get(square(8)).click();
    cy.get(square(4)).click();

    cy.get("[data-testid='game-status']").should("have.text", "Draw");
  });

  it("引き分けたとき、勝利メッセージは表示されない", () => {
    cy.get(square(0)).click();
    cy.get(square(1)).click();
    cy.get(square(2)).click();
    cy.get(square(3)).click();
    cy.get(square(5)).click();
    cy.get(square(6)).click();
    cy.get(square(7)).click();
    cy.get(square(8)).click();
    cy.get(square(4)).click();

    cy.get("[data-testid='game-status']").should("not.contain.text", "Winner");
  });
});
