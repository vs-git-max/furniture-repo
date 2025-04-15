import bcrypt from "bcryptjs";

export const hashPassword = async (password, salt = 10) => {
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedValue) => {
  return await bcrypt.compare(password, hashedValue);
};
