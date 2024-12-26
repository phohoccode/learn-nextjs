import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { loginUser } from "./lib/actions";
import { ZodError } from "zod";

// export class InvalidLoginError extends AuthError {
//   code = "invalid_credentials"; // lỗi mặc định
//   constructor(public message: string) {
//     super(message);
//     this.code = message;
//   }
// }

export class InvalidLoginError extends AuthError {
  constructor(public code: string, public details?: string) {
    super(details || "Đăng nhập thất bại!");
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
          // const { email, password } = credentials;

          // Validate the sign in data
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
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Nếu URL hiện tại là trang đăng nhập, chuyển hướng về trang khác
      if (url.startsWith(baseUrl + "/auth/login")) {
        return baseUrl + "/"; // Trang chuyển hướng mong muốn
      }
      return url || baseUrl;
    },
  },
});
