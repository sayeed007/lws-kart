import { AuthContext } from "@/contexts";
import { useContext } from "react";

export const useModifiedAuth = () => {
    const { modifiedAuth, setModifiedAuth } = useContext(AuthContext);

    return { modifiedAuth, setModifiedAuth };
}