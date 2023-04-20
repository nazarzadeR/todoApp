import { createIcon } from "@chakra-ui/icons";

const List = createIcon({
    displayName: "CloseEye",
    viewBox: " 0 0 24 24",
    defaultProps: {
        strokeWidth: 0,
        fill: "currentColor",
        stroke: "currentColor",
    },
    path: (
        <>
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M21 11.01L3 11v2h18zM3 16h12v2H3zM21 6H3v2.01L21 8z"></path>
        </>
    ),
});

export default List;
