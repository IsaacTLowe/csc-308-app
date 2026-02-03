// portfolio.test.js

/*
This assignment was super cool to see a good way to use TDD
to test programs. I was able to follow the test-first approach
to find the errors before implemeneting the correct code.
Writing tests first helped me see the overall goal for the
implemenetation of the program. I will definitely use TDD in
the future.
*/

const Portfolio = require('./portfolio');

describe('Stock Portfolio', () => {
  test('should create an empty portfolio', () => {
    const portfolio = new Portfolio();
    expect(portfolio).toBeDefined();
  });

  test('should initialize with no holdings', () => {
    const portfolio = new Portfolio();
    expect(Object.keys(portfolio.holdings).length).toBe(0);
  });

  test('should return true when portfolio is empty', () => {
    const portfolio = new Portfolio();
    expect(portfolio.isEmpty()).toBe(true);
  });

  test('should add shares when making a purchase', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('GME', 5);
    expect(portfolio.holdings['GME']).toBe(5);
  });

  test('should add to existing shares when purchasing same symbol', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('GME', 5);
    portfolio.purchase('GME', 3);
    expect(portfolio.holdings['GME']).toBe(8);
  });

  test('should subtract shares when making a sale', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('GME', 10);
    portfolio.sell('GME', 3);
    expect(portfolio.holdings['GME']).toBe(7);
  });

  test('should return count of unique ticker symbols', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('GME', 5);
    portfolio.purchase('RBLX', 10);
    expect(portfolio.countSymbols()).toBe(2);
  });

  test('should return 0 symbols for empty portfolio', () => {
    const portfolio = new Portfolio();
    expect(portfolio.countSymbols()).toBe(0);
  });

  test('should remove symbol when all shares are sold', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('GME', 5);
    portfolio.sell('GME', 5);
    expect(portfolio.holdings['GME']).toBeUndefined();
    expect(portfolio.isEmpty()).toBe(true);
  });

  test('should not keep symbols with zero shares', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('GME', 5);
    portfolio.purchase('RBLX', 10);
    portfolio.sell('GME', 5);
    expect(portfolio.countSymbols()).toBe(1);
  });

  test('should return number of shares for a given symbol', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('GME', 15);
    expect(portfolio.getShares('GME')).toBe(15);
  });

  test('should return 0 for symbols not in portfolio', () => {
    const portfolio = new Portfolio();
    expect(portfolio.getShares('TSLA')).toBe(0);
  });

  test('should throw error when selling more shares than owned', () => {
    const portfolio = new Portfolio();
    portfolio.purchase('GME', 5);
    expect(() => {
      portfolio.sell('GME', 10);
    }).toThrow('Not possible to sell this number of shares.');
  });

  test('should throw error when selling shares of non-existent symbol', () => {
    const portfolio = new Portfolio();
    expect(() => {
      portfolio.sell('TSLA', 5);
    }).toThrow('Not possible to sell this number of shares.');
  });
});