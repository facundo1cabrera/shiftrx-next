import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Backend_URL } from "./Constants";
import { JWT } from "next-auth/jwt";


async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(Backend_URL + "/auth/refresh", {
        method: "POST",
        headers: {
            authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
    });
    console.log("refreshed");

    const response = await res.json();

    return {
        ...token,
        backendTokens: response,
    };
}


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password) return null;
                const { username, password } = credentials;
                const res = await fetch(Backend_URL + "/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: username,
                        password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (res.status !== 201) {
                    return null;
                }
                const user = await res.json();
                return user;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {

            if (user) return { ...token, ...user };

            if (new Date().getTime() < token.backendTokens.expiresIn)
            return token;
    
          return await refreshToken(token);
        },
        async session({ token, session }) {
            session.user = token.user
            session.backendTokens = token.backendTokens;
            return session;
        }
    },

    pages: {
        signIn: '/login'
    }
};