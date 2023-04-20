export default {
    styles: {
        global: {
            "html, body, #root": {
                w: "full",
                h: "full",
            },

            "*::-webkit-scrollbar": {
                display: "none",
            },
        },
    },
    semanticTokens: {
        fonts: {
            heading: `'Roboto'  sans-serif`,
            body: `'Roboto' sans-serif`,
        },
        colors: {
            "bg-dark": {
                default: "gray.100",
                _dark: "gray.900",
            },
            "bg-light": {
                default: "gray.50",
                _dark: "gray.700",
            },
        },
    },
};
