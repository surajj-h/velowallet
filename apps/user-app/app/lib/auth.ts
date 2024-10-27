import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" },
        isSignUp: { label: "Sign up", type: "hidden" },
        name: { label: "Name", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("Phone number and password are required");
        }

        const existingUser = await db.user.findFirst({
          where: { number: credentials.phone },
        });

        if (existingUser) {
          const isValidPassword = await bcrypt.compare(credentials.password, existingUser.password);
          if (isValidPassword) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } else if (credentials.isSignUp === "true") {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const newUser = await db.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
              name: credentials.name || "New User",
            },
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.number,
          };
        }

        throw new Error("User not found. Please sign up first.");
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin"
  },
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    // TODO: can u fix the type here? Using any is bad
    async session({ token, session }: any) {
      session.user.id = token.sub
      return session
    }
  },
  trustHost: true,
}

