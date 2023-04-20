import React from "react";
import { useLocation } from "react-router";
import { Box, useMediaQuery } from "@chakra-ui/react";

import { useAuth } from "stores";
import { Roles } from "interface";

interface Props extends React.DetailedHTMLProps<any, any> {
    Only?: Roles[];
    hideBelowMd?: boolean;
    hideRoutesPath?: string[];
}

const NavLink: React.FC<Props> = (props) => {
    const { only } = useAuth();
    const { pathname } = useLocation();
    const [isBelowThen768] = useMediaQuery("(max-width: 768px)");
    const {
        children,
        hideRoutesPath,
        Only = undefined,
        hideBelowMd = false,
    } = props;

    if (!!Only && !!!only(Only)) {
        return null;
    }

    if (hideBelowMd && isBelowThen768) {
        return null;
    }

    if (hideRoutesPath && hideRoutesPath.some((path) => path === pathname)) {
        return null;
    }

    return <Box>{children}</Box>;
};

export default NavLink;