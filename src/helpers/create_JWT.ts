import jwt from "jsonwebtoken";

export const createJWToken = (id: string) => {
  const token = jwt.sign(
    { id },
    process.env.SECRET_KEY_JWT || "default_secret_key",
    {
      expiresIn: "12h",
    }
  );
  return token;
};
