import { createIcon } from "@chakra-ui/icons";

const AddTodo = createIcon({
    displayName: "AddTodo",
    viewBox: "0 0 512 512",
    defaultProps: {
        strokeWidth: 0,
        fill: "currentColor",
        stroke: "currentColor",
    },
    path: (
        <path d="M416 277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416v42.666z"></path>
    ),
});

export default AddTodo;
