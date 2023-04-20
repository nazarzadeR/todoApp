import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";

const AuthLoader = () => {
    return (
        <Center
            w="full"
            h="full"
            top="50%"
            left="50%"
            position="absolute"
            transform="translate(-50%, -50%)"
        >
            <Box
                w="32px"
                h="32px"
                color="pageLoader"
                as={motion.div}
                background={`conic-gradient(from  -45deg at top    16px left 50% ,#0000 ,currentColor 1deg 90deg,#0000 91deg),
          conic-gradient(from   45deg at right  16px top  50% ,#0000 ,currentColor 1deg 90deg,#0000 91deg),
          conic-gradient(from  135deg at bottom 16px left 50% ,#0000 ,currentColor 1deg 90deg,#0000 91deg),
          conic-gradient(from -135deg at left   16px top  50% ,#0000 ,currentColor 1deg 90deg,#0000 91deg)
                    `}
                animate={{
                    width: ["32px", "48px", "32px"],
                    height: ["32px", "48px", "32px"],
                    rotate: [0, 180, 360],
                    transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: [0.3, 1, 0, 1],
                        repeatType: "loop",
                    },
                }}
            ></Box>
        </Center>
    );
};

export default AuthLoader;
