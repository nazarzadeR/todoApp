import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { CirclePicker } from "react-color";
import { useTranslation } from "react-i18next";
import {
    Text,
    VStack,
    Button,
    HStack,
    Center,
    Popover,
    useConst,
    PopoverBody,
    PopoverArrow,
    PopoverTrigger,
    PopoverContent,
} from "@chakra-ui/react";

import { AddTodo } from "interface";
import randomColorArray from "layout/Sidebar/util/colorGenerator";

const ColorPicker = () => {
    const { t } = useTranslation();
    const context = useFormikContext<AddTodo>();
    const colors = useConst(randomColorArray(12));

    useEffect(() => {
        context.setFieldValue("color", colors[0]);
    }, []);

    return (
        <VStack
            py="2"
            gap="2"
            w="full"
            borderRadius="md"
            border="2px solid"
            borderColor={context.values.color}
        >
            <Popover>
                <PopoverTrigger>
                    <HStack w="full" px="1">
                        <Button
                            w="30px"
                            h="30px"
                            cursor="pointer"
                            borderRadius="md"
                            alignSelf="flex-start"
                            bgColor={context.values.color}
                        />
                        <Text alignSelf="center" fontSize="lg">
                            {t("sidebar.addTodo.color")}
                        </Text>
                    </HStack>
                </PopoverTrigger>

                <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody>
                        <Center w="full">
                            <CirclePicker
                                colors={colors}
                                onChangeComplete={(e) =>
                                    context.setFieldValue("color", e.hex)
                                }
                            />
                        </Center>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </VStack>
    );
};

export default ColorPicker;
