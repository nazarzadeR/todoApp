import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ElementContext } from "./elementContext";

const sxOfSame: React.CSSProperties = {
    top: "6px",
    width: "30px",
    height: "30px",
    content: "''",
    borderRadius: "50%",
    position: "absolute",
    background: "transparent",
};

const Indicator: React.FC<React.PropsWithChildren> = (props) => {
    const { element } = useContext(ElementContext);

    if (!element) return null;

    const { width, left } = element?.getBoundingClientRect() as any;

    return (
        <Box
            {...props}
            m="0 !important"
            h="70px"
            w={width || "70px"}
            top="-60%"
            zIndex="1"
            as={motion.div}
            bgColor="bg-dark"
            position="absolute"
            borderRadius="full"
            _before={{
                ...sxOfSame,
                left: "-28px",
                boxShadow: "15px 18px var(--chakra-colors-bg-dark)",
            }}
            _after={{
                ...sxOfSame,
                right: "-28px",
                boxShadow: "-15px 18px var(--chakra-colors-bg-dark)",
            }}
            animate={{
                left: `${left}px`,
                transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                },
            }}
        />
    );
};

export default Indicator;
