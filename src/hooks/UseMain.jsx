const useMain = () => {
  const shuffleProducts = (products) => {
    if (!products || (products && products.length == 0)) return;
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

  const getProductName = (id, products) => {
    const product_name = products.find((product) => product.id === id);
    return product_name.title || 'Sin nombre';
  };

  const getDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
  };


  return {
    shuffleProducts,
    getProductName,
    getDate
  };
};

export default useMain;
