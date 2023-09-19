"use client";
import React from "react";

// MUI Components
import { Container, Box } from "@mui/material";

// Custom Components
import HeroSection from "@/components/sections/Hero";
import Jobs from "@/components/pages/Jobs";
import Aside from "@/components/sections/Aside";
import Searchbar from "@/components/molecules/SearchFilter";

const page = () => {
    return (
        <Container sx={{ display: "flex" }}>
            <Box sx={{ flex: "2", position: "relative" }}>
                <HeroSection />
                <Searchbar />
                <Jobs />
            </Box>
            <Aside name="Mohammed S." jobTitle="Full stack web developer" />
        </Container>
    );
};
export default page;
