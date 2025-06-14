import { useContext } from "react";
import { DbContext } from "./db-info-context";

export default function useDbContext() {
    const result = useContext(DbContext)
    if (!result) {
        throw new Error("Cannot read Database information")
    }
    return result
}