import { auth } from "./app/lib/auth/server";

export default auth.middleware({
    loginUrl: "/login",
});

export const config = {
    matcher: [
        "/profile/:path*"
    ],
};