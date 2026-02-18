<<<<<<< HEAD
import { auth } from "./app/lib/auth/server";

export default auth.middleware({
    loginUrl: "/login",
});

export const config = {
    matcher: [
        "/profile/:path*"
    ],
=======
import { auth } from '@/lib/auth/server';

export default auth.middleware({
  // Redirects unauthenticated users to sign-in page
  loginUrl: '/auth/sign-in',
});

export const config = {
  matcher: [
    // Protected routes requiring authentication
    '/account/:path*',
  ],
>>>>>>> main
};