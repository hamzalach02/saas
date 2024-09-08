export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile","/freeplan",'/choose','/custom','/GenerateSpring'],
  // matcher: ["/((?!register|api|login).*)"],

};
