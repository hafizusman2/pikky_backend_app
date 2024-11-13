const redisClient = require("../redis/redis-client");
const config = require("../configs");

exports.create_user = async ({ id, email, password, role }) => {
  try {
    let redisKey = `${config.redis.userPrefix}:${id}`;
    const result = await redisClient.setJSON(
      redisKey,
      {
        id,
        email,
        password,
        role
      },
      redisClient.isRedisUserSetEnabled()
    );

    if (result != "OK") {
      throw new Error(`Failed to write data into Redis for key: ${redisKey}`);
    }
  } catch (error) {
    console.error(
      `Error in user.redis-services-services create_user service: ${error}`
    );
    throw error;
  }
};

exports.get_user_by_id = async id => {
  try {
    const user = await redisClient.getJSON(
      `${config.redis.userPrefix}:${id}`,
      redisClient.isRedisUserGetEnabled()
    );
    if (!user) {
      throw new Error("User not exists in redis");
    }
    return user;
  } catch (error) {
    console.error(
      `Error in user.redis-services get_user_by_id service: ${error}`
    );
    throw error;
  }
};

exports.is_exists = async id => {
  try {
    return redisClient.exists(
      `${config.redis.userPrefix}:${id}`,
      redisClient.isRedisUserGetEnabled()
    );
  } catch (error) {
    console.error(`Error in user.redis-services is_exists service: ${error}`);
    throw error;
  }
};
