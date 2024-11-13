const { task1: task1Service } = require("../services/task1.services");

const getTask1 = async (req, res) => {
  try {
    const response = await task1Service();
    res.status(201).json({
      message: "Data fetched successfully",
      data: response,
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: `Error in fetching data: ${err.message}`,
      success: false
    });
  }
};

// Exporting the controllers
module.exports = {
  getTask1
};
