const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const getFoodListTask1_a = async () => {
  await wait(115); // 115ms

  const foodList = [
    { name: "Pizza", description: "Italian pizza with cheese", price: 8 },
    { name: "Samosa", description: "Spicy fried pastry", price: 2 }
  ];

  return { foodList };
};

const getAvailableLocationsTask1_b = async () => {
  await wait(2 * 60 * 1000); // 2 minutes in ms

  const availableLocations = ["Goa", "Mumbai", "Delhi"];

  return { availableLocations };
};

const getNutritionInfoTask1_c = async () => {
  await wait(300); // 300 ms

  const nutritionInfo = [
    { name: "Pizza", calories: 300, protein: 15 },
    { name: "Samosa", calories: 200, protein: 5 }
  ];

  return { nutritionInfo };
};

const getStockOutFoodTask1_d = async () => {
  await wait(100); // 100 ms

  const stockOut = ["Burger", "Sandwich"];

  return { stockOut };
};

const task1 = async () => {
  const [foodList, availableLocations, nutritionInfo, stockOut] =
    await Promise.all([
      getFoodListTask1_a(),
      getAvailableLocationsTask1_b(),
      getNutritionInfoTask1_c(),
      getStockOutFoodTask1_d()
    ]);

  return { foodList, availableLocations, nutritionInfo, stockOut };
};

module.exports = {
  task1
};
