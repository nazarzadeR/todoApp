import { useEffect } from "react";

import { useAuth } from "stores";
import AuthLoader from "./AuthLoader";

const PersistUser = () => {
    const { persistUser } = useAuth();

    useEffect(() => {
        persistUser();
    }, []);

    return <AuthLoader />;
};

export default PersistUser;
