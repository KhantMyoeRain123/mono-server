const crypto = require("crypto");

const iterations = 10000;
const keyLength = 64;
const digest = "sha512";

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");

  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, digest)
    .toString("hex");
  return { salt, hashedPassword };
}

function verifyPassword(password, storedHashedPassword, salt) {
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, digest)
    .toString("hex");
  return hashedPassword === storedHashedPassword;
}

module.exports = {
  hashPassword,
  verifyPassword,
};
