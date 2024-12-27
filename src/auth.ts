import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { loginUser } from "./lib/actions";
import { ZodError } from "zod";
import GoogleProvider from "next-auth/providers/google";

// export class InvalidLoginError extends AuthError {
//   code = "invalid_credentials"; // lỗi mặc định
//   constructor(public message: string) {
//     super(message);
//     this.code = message;
//   }
// }

export class InvalidLoginError extends AuthError {
  constructor(public code: string, public details?: string) {
    // kế thừa từ AuthError
    super(details || "Đăng nhập thất bại!");

    // gán đè
    this.code = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(">>> credentials", credentials);

        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const user = await loginUser(email as string, password as string);

          console.log(">>> user", user);

          if (!user) {
            throw new InvalidLoginError(
              "invalid_credentials",
              "Thông tin đăng nhập không hợp lệ!!"
            );
          }

          return user;
        } catch (error) {
          // Nếu lỗi là ZodError, thì xử lý lỗi
          if (error instanceof ZodError) {
            console.log(">>> error", error.issues);
            throw new InvalidLoginError(
              "zod_error",
              error?.issues?.[0]?.message
            );
          }
          throw error; // Ném lại nếu là InvalidLoginError
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account && profile) {
        console.log(">>> account", account);
        console.log(">>> profile", profile);

        token.id = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
        token.picture = profile.picture;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
