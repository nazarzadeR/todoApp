import { createIcon } from "@chakra-ui/icons";

const Moon = createIcon({
    displayName: "Moon",
    viewBox: "0 0 24 24",
    defaultProps: {
        strokeWidth: 2,
        fill: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
    },
    path: (
        <>
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 5v14l8 -7z"></path>
            <path d="M14 5v14l8 -7z"></path>
        </>
    ),
});

export default Moon;
