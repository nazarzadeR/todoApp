import { createIcon } from "@chakra-ui/icons";

const Moon = createIcon({
    displayName: "Moon",
    viewBox: " 0 0 20 20",
    defaultProps: {
        strokeWidth: 0,
        fill: "currentColor",
    },
    path: (
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
    ),
});

export default Moon;
