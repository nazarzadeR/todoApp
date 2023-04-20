import React from "react";
import { t } from "i18next";
import { motion } from "framer-motion";
import { Button, ButtonProps, Tooltip } from "@chakra-ui/react";

import { useUp } from "stores";
import { BeatLoader } from "components";

type Props = {
    children: React.ReactNode;
} & ButtonProps;

const SignButton: React.FC<Props> = (props) => {
    const { up } = useUp();
    const { children } = props;

    return (
        <Tooltip label={!up && t("sign.up")}>
            <Button
                disabled={!up}
                as={motion.button}
                spinner={<BeatLoader />}
                whileHover={{ scale: 1.08 }}
                type={up ? "submit" : "button"}
                cursor={!up ? "wait" : "pointer"}
                {...props}
            >
                {children && children}
            </Button>
        </Tooltip>
    );
};

export default SignButton;
