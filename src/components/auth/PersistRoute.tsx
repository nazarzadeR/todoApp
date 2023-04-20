import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useAuth } from "stores";
import { Roles } from "interface";
import PersistUser from "./PersistUser";

type Props = {
    allow: Roles[];
};

const PersistRoute: React.FC<Props> = (props) => {
    const { allow } = props;
    const location = useLocation();
    const {
        only,
        checked,
        access_token,
        user: { id },
    } = useAuth();

    if (!!!access_token && !checked) {
        return <PersistUser />;
    }

    return only(allow) ? (
        <Outlet />
    ) : !!id ? (
        <Navigate to="/unauthorized" />
    ) : (
        <Navigate to="/signin" state={{ location }} />
    );
};

export default PersistRoute;
