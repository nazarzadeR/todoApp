import React, { useContext, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Box, BoxProps, Center } from "@chakra-ui/react";

import { useFilter, Filter } from "stores";
import { ElementContext } from "./elementContext";

type Props = {
    onDo?: any;
    indicator?: Filter;
    Icon: React.ReactNode;
    children: React.ReactNode;
} & BoxProps;

const NavLink: React.FC<Props> = (props) => {
    const ref = useRef<any>(null);
    const control = useAnimation();
    const { filter } = useFilter();
    const { element, setElement } = useContext(ElementContext);
    const { Icon, children, indicator, onDo, ...rest } = props;

    const isSelected = element === ref.current;

    const onClickHandler = () => {
        onDo && onDo();
        setElement && setElement(() => ref.current);
    };

    useEffect(() => {
        control.start(isSelected ? "open" : "close");

        if (!isSelected && indicator && filter === indicator) {
            onClickHandler();
        }
    }, [isSelected]);

    return (
        <Center
            {...rest}
            ref={ref}
            w="70px"
            h="full"
            zIndex="10"
            textAlign="center"
            position="relative"
            onClick={onClickHandler}
        >
            <Box
                as={motion.div}
                animate={control}
                position="relative"
                variants={{
                    initial: {
                        y: 0,
                        transition: {
                            duration: 0.4,
                        },
                    },
                    open: {
                        y: -35,
                        transition: {
                            duration: 0.4,
                        },
                    },
                    close: {
                        y: 0,
                        transition: {
                            duration: 0.4,
                        },
                    },
                }}
            >
                {Icon}
            </Box>
            <Box
                w="full"
                p=".2rem"
                fontSize="sm"
                lineHeight="4"
                as={motion.div}
                animate={control}
                initial="initial"
                position="absolute"
                variants={{
                    initial: {
                        y: 20,
                        opacity: 0,
                        display: "none",
                    },
                    open: {
                        y: 0,
                        opacity: 1,
                        display: "initial",
                        transition: {
                            duration: 0.3,
                            transitionStart: {
                                display: "initial",
                            },
                        },
                    },
                    close: {
                        y: 20,
                        opacity: 0,
                        transition: {
                            duration: 0.3,

                            transitionEnd: {
                                display: "none",
                            },
                        },
                    },
                }}
            >
                {children}
            </Box>
        </Center>
    );
};

export default NavLink;
