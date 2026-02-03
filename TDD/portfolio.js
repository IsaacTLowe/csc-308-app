// portfolio.js
class Portfolio {
  constructor() {
    this.holdings = {};
  }

  isEmpty() {
    return Object.keys(this.holdings).length === 0;
  }

  purchase(symbol, shares) {
    if (this.holdings[symbol]) {
      this.holdings[symbol] += shares;
    } else {
      this.holdings[symbol] = shares;
    }
  }

  sell(symbol, shares) {
    const currentShares = this.holdings[symbol] || 0;
    if (shares > currentShares) {
      throw new Error('Not possible to sell this number of shares.');
    }
    this.holdings[symbol] -= shares;
    if (this.holdings[symbol] === 0) {
      delete this.holdings[symbol];
    }
  }

  countSymbols() {
    return Object.keys(this.holdings).length;
  }

  getShares(symbol) {
    return this.holdings[symbol] || 0;
  }
}

module.exports = Portfolio;