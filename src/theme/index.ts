import { extendTheme } from "@chakra-ui/react";

import theme from "./theme";

const themeConfig = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: true,
    },

    ...theme,
});

export default themeConfig;
