import { createContext } from "react";

type DbInfo = {
    base: string
    port: number
    baseAddress: () => string
}

export const DbContext = createContext<DbInfo>({
    base: "barubba",
    port: -9999,
    baseAddress: () => "alala"
})