const sendToken = (existingUser, statusCode, res, message) => {
  const token = existingUser.generateJsonWebToken();
  const options = {
    expires: new Date(
      Date.now() + 5 * 60 * 1000 //24*60*60*1000
    ),
    httpOnly: true,
  };

  return res.status(statusCode).cookie("token", token, options).json({
    success: message,
    existingUser,
    token,
  });
};

module.exports = sendToken;