// Import authentication service functions
const { registerUser, loginUser } = require("../services/auth.services");

// Controller to handle user registration
const handleUserRegistration = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const newUser = await registerUser(email, password, role);
    res
      .status(201)
      .json({
        message: "Registration successful",
        user: newUser,
        success: true
      });
  } catch (err) {
    res.status(500).json({
      message: `Error during registration: ${err.message}`,
      success: false
    });
  }
};

// Controller to handle user login
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const authResult = await loginUser(email, password);

    if (authResult) {
      res.status(200).json({ success: true, data: authResult });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: `Login failed: ${err.message}` });
  }
};

// Exporting the controllers
module.exports = {
  handleUserRegistration,
  handleUserLogin
};
