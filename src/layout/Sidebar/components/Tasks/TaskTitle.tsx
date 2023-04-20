import React from "react";
import { motion } from "framer-motion";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type Props = {
    title?: string;
    sideOpen: boolean;
};

const TaskTitle: React.FC<Props> = ({ sideOpen, title = "tasks" }) => {
    const { t } = useTranslation();
    return (
        <>
            {sideOpen && (
                <Heading
                    pl="2"
                    size="md"
                    as={motion.h2}
                    alignSelf="flex-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                    }}
                >
                    {t(`sidebar.${title}`)}
                </Heading>
            )}
        </>
    );
};

export default TaskTitle;
