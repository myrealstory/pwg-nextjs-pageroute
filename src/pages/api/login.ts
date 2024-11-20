import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        res.setHeader(
          "Set-Cookie",
          `token=${data.token}; Path=/; Secure; Max-Age=3600; HttpOnly; SameSite=Strict`
        );
        return res.status(200).json({ message: "Login successful" });
      }
      return res.status(401).json({ message: "Invalid credentials" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
