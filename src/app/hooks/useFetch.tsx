import { useSession } from "next-auth/react";

export default function useFetch() {
    const { data: session } = useSession();
    const user = session?.user;
    const utilFetch = (method: string) => {
        const headers = new Headers({ "token-session": user?.tokenSession ?? "", "Content-Type": "application/json", })
        return async (url?: string, body?: any) => {
            const req = await fetch(url ?? "", {
                method,
                headers,
                ...(body ? { body: JSON.stringify(body) } : {})
            })
            return await req.json()
        }
    }
    return {
        post: utilFetch("POST"),
        get: utilFetch("GET"),
        put: utilFetch("PUT"),
        delete: utilFetch("DELETE"),
    }
}
