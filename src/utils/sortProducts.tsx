/**
 * Sorts an array of products by price.
 * 
 * @param {Array} products - Array of products to sort.
 * @param {String} sortOrder - The order to sort by ('priceAsc' or 'priceDesc').
 * @returns {Array} - The sorted array of products.
 */


export const sortProductsByPrice = (products: Array<any>, sortOrder: string): Array<any> => {
    return products.slice().sort((a, b) => {
      if (sortOrder === 'priceAsc') return a.price - b.price;
      if (sortOrder === 'priceDesc') return b.price - a.price;
      return 0; // Default: no sorting
    });
  };
  