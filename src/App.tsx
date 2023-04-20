import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Grid, HStack, GridItem } from "@chakra-ui/react";

import { useUp } from "hooks";
import { Roles } from "interface";
import { Signin, Signup } from "./pages";
import { PersistRoute } from "components";
import { Navigation, Sidebar, MobileNavigation } from "layout";

const Home = React.lazy(() => import("pages/Home"));

const App = () => {
    const upQuery = useUp();
    const { USER, ADMIN } = Roles;

    return (
        <HStack w="full" h="full">
            <Sidebar />
            <Grid px="4" w="full" h="full" templateRows="80px 1fr">
                <GridItem>
                    <Navigation />
                </GridItem>
                <GridItem>
                    <Box as="main" w="full" overflow="scroll">
                        <Routes>
                            <Route path="/signin" element={<Signin />} />
                            <Route path="/signup" element={<Signup />} />

                            <Route
                                path="/"
                                element={<PersistRoute allow={[USER, ADMIN]} />}
                            >
                                <Route
                                    index
                                    element={
                                        <Suspense fallback={"Loading..."}>
                                            <Home />
                                        </Suspense>
                                    }
                                />
                            </Route>
                        </Routes>
                    </Box>
                </GridItem>
            </Grid>
            <MobileNavigation />
        </HStack>
    );
};

export default App;
