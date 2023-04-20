import React from "react";
import { ListIcon, ListItem } from "@chakra-ui/react";

import { miniTodo } from "interface";
import { Check, Note } from "components";

type Props = {
    todo: miniTodo;
};

const CardItem: React.FC<Props> = (props) => {
    const {
        todo: { completed, title, id },
    } = props;

    return (
        <ListItem>
            <ListIcon
                as={completed ? Check : Note}
                color={completed ? "green.500" : "whitesmoke"}
            />
            {title}
        </ListItem>
    );
};

export default CardItem;
