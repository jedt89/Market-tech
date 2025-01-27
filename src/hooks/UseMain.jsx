const shuffleProducts = (products) => {
  const categoryMap = new Map();
  products.forEach((product) => {
    if (!categoryMap.has(product.category_id)) {
      categoryMap.set(product.category_id, []);
    }
    categoryMap.get(product.category_id).push(product);
  });

  const shuffledProducts = [];
  categoryMap.forEach((categoryProducts) => {
    const randomProduct =
      categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
    shuffledProducts.push(randomProduct);
  });

  return shuffledProducts.sort(() => Math.random() - 0.5).slice(0, 10);
};



export { shuffleProducts };