export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile","/freeplan",'/choose','/custom','/GenerateSpring','/simple'],
  // matcher: ["/((?!register|api|login).*)"],

};
