// Middleware allows you to run code before a request is completed.
// Then, based on the incoming request, you can modify the response by rewriting, redirecting,
// modifying the request or response headers, or responding directly.

// import { withAuth } from 'next-auth/middleware';

// export default withAuth(
//     function middleware() {
//         //return NextResponse
//     },
//     {
//         callbacks: {
//             authorized({token}){
//                 return token?.role == 'admin'
//             }
//         }
//     }
// )

export { default } from "next-auth/middleware"

export const config = { matcher: ["/hr/:path*"] }
