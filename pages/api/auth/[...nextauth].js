import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/User";
import { compare } from "bcrypt";
import { ApiError } from "next/dist/server/api-utils";
import jwt from "jsonwebtoken";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getLoyaltyPointFromServer } from "../../../helper/users";
const MySwal = withReactContent(Swal);

const errorContent = () => {
  MySwal.fire({
    title: "Error!",
    text: "Login Failed!. Please try again",
    icon: "error",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: true,
  });
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        await dbConnect();
        // Find user with the email
        const user = await User.findOne({
          email: credentials?.email,
        });
        // Email Not found
        if (!user) {
          console.error("Email is not registered");
          errorContent();
          // push('/signin')
          throw new ApiError(400, "Email is not registered");
        }
        // Check hased password with DB hashed password
        const isPasswordCorrect = await compare(
          credentials?.password,
          user.hashedPassword
        );

        // Incorrect password
        if (!isPasswordCorrect) {
          console.error("Password is incorrect");
          throw new ApiError(400, "Password is incorrect");
        }
        const loyalty = await getLoyaltyPointFromServer(user?.phone);
        const token = await jwt.sign(user.id, process.env.NEXTAUTH_JWT_SECRET);

        return {
          id: user.id,
          name: user.fullname,
          email: user.email,
          image: user.role,
          loyalty: loyalty.data.data.loyalty.total_loyalty_point,
          token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  callbacks: {
    async error({ error, req }) {
      console.error("error:", error);
    },
    async jwt({ token, user }) {
      user && (token.user = user);
      token.secret = process.env.NEXTAUTH_JWT_SECRET;
      token.maxAge = 60 * 60 * 1;
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      session.strategy = "jwt";
      session.maxAge = 60 * 60 * 1;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1,
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
    maxAge: 60 * 60 * 1, //
  },
  secret: process.env.NEXTAUTH_SECRET,
});
