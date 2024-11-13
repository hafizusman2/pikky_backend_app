const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../configs");
const {
  create_user,
  get_user_by_id
} = require("../redis_services/user.redis-services");

const registerUser = async (email, password, role) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = new User({
    email,
    password,
    role
  });

  await user.save();
  try {
    // save user in cache db
    await create_user(user);
  } catch (err) {
    console.warn(err);
  }
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  const token = jwt.sign({ id: user._id }, config.jwt.secretKey, {
    expiresIn: "2h"
  });
  return { role: user.role, token };
};

const getUserById = async id => {
  try {
    const cachedUser = await get_user_by_id(id);
    if (cachedUser) {
      return cachedUser;
    }
  } catch (redisError) {
    console.warn(
      `Warning: Redis access failed for user ID ${id}. Error: ${redisError.message}`
    );
  }

  const user = await User.findById(id).select("-password");
  if (user) {
    try {
      await redisClient.set(`1:${id}`, JSON.stringify(user));
    } catch (cacheError) {
      console.warn(
        `Warning: Failed to cache user ID ${id} in Redis. Error: ${cacheError.message}`
      );
    }
    return user;
  }

  throw new Error("User not found");
};

module.exports = {
  registerUser,
  loginUser,
  getUserById
};
