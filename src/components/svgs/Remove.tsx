import { createIcon } from "@chakra-ui/icons";

const Remove = createIcon({
    displayName: "Remove",
    viewBox: " 0 0 24 24",
    defaultProps: {
        strokeWidth: 0,
        fill: "currentColor",
        stroke: "currentColor",
    },
    path: (
        <>
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M14 10H3v2h11v-2zm0-4H3v2h11V6zM3 16h7v-2H3v2zm11.41 6L17 19.41 19.59 22 21 20.59 18.41 18 21 15.41 19.59 14 17 16.59 14.41 14 13 15.41 15.59 18 13 20.59 14.41 22z"></path>
        </>
    ),
});

export default Remove;
