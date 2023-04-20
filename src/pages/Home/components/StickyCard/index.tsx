import React from "react";
import { nanoid } from "nanoid";
import {
    Box,
    Card,
    List,
    Text,
    VStack,
    HStack,
    Heading,
    Spinner,
    CardBody,
    CardHeader,
    useBoolean,
    useDisclosure,
} from "@chakra-ui/react";

import { Todo } from "interface";
import CardItem from "./CardItem";
import { Add, Remove } from "components";
import CreateTodoModal from "./CreateTodoModal";
import useRequest from "pages/Home/hook/useRequest";

type Props = {
    todo: Todo;
};

const StickyCard: React.FC<Props> = (props) => {
    const { deleteTodoMutation } = useRequest();
    const [isDeleting, { on }] = useBoolean(false);
    const { isOpen, onClose, onOpen } = useDisclosure();

    const deleteTodo = async () => {
        on();
        await deleteTodoMutation.mutateAsync(props.todo.id);
    };

    const {
        todo: { description, title, color, todo, id },
    } = props;

    return (
        <Card bg={color} maxW="480px" minW="320px" w="full">
            <CardHeader
                pb="2"
                as={HStack}
                color="white"
                justifyContent="space-between"
            >
                <Heading as="h3" size="md" letterSpacing="px">
                    {title}
                </Heading>
                <HStack gap="2" fontSize="xl">
                    <Box>
                        <Add cursor="pointer" onClick={onOpen} />
                        <CreateTodoModal
                            id={id}
                            isOpen={isOpen}
                            onClose={onClose}
                        />
                    </Box>
                    <Box>
                        {isDeleting ? (
                            <Spinner w="14px" h="14px" />
                        ) : (
                            <Remove cursor="pointer" onClick={deleteTodo} />
                        )}
                    </Box>
                </HStack>
            </CardHeader>

            <CardBody pt="2">
                <VStack alignItems="flex-start" color="white">
                    {description && (
                        <Text alignSelf="flex-start">
                            {description.substring(0, 120)}
                        </Text>
                    )}
                    <List>
                        {!!todo &&
                            todo.map((t) => (
                                <CardItem key={nanoid()} todo={t} />
                            ))}
                    </List>
                </VStack>
            </CardBody>
        </Card>
    );
};

export default StickyCard;
