import React from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

interface Props extends React.DetailedHTMLProps<any, any> {}

const childSx = {
    h: "4px",
    w: "4px",
    bg: "#93228D",
    display: "block",
    position: "absolute",
    transformOrigin: "center",
};

const BeatLoader: React.FC<Props> = (props) => {
    return (
        <Box w="full" h="full" {...props}>
            {React.Children.toArray(
                Array.from({ length: 6 }).map((val, idx) => (
                    <Box
                        sx={childSx}
                        as={motion.span}
                        animate={"load"}
                        top="-5px"
                        left={`${-13 + idx * 6}px`}
                        variants={{
                            load: {
                                transformOrigin: "center",
                                y: ["0px", "-10px", "0px", "0px"],
                                height: [10, 30, 10, 10],
                                background: [
                                    "#485563",
                                    "#606c88",
                                    "#3f4c6b",
                                    "#29323c",
                                ],
                                transition: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    repeatType: "mirror",
                                    delay: 1 + idx * 0.1,
                                },
                            },
                        }}
                    />
                ))
            )}
        </Box>
    );
};

export default BeatLoader;
