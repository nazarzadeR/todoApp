import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { ReactQueryDevtools } from "react-query/devtools";

import "lib/i18next";
import App from "App";
import theme from "theme";

if (import.meta.env.PROD) {
    disableReactDevTools();
}

const queryClient = new QueryClient();
const isDevelopment = !import.meta.env.PROD;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <App />
                    {isDevelopment && (
                        <ReactQueryDevtools
                            initialIsOpen={false}
                            position="bottom-right"
                        />
                    )}
                </QueryClientProvider>
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>
);
