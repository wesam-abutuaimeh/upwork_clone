import React, { useEffect } from "react";
import { Card, Typography } from "@mui/material";

// Custom Hooks
import useAPI from "@/hooks/useAPI";
import { API_URL, AUTH_API_URL } from "@/config/api";
import { END_POINTS } from "@/constants/endPoints";

const HeroSection = () => {
    const { get, data } = useAPI(AUTH_API_URL + END_POINTS.PROFILE);
    const TOKEN = typeof window !== "undefined" ? localStorage.getItem("token") : "null";
    const config = {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    }
    useEffect(() => {
        get(config);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config.headers.Authorization])
    console.log(data);

    return (
        <Card sx={{ padding: "20px", borderRadius: "6px" }} variant="outlined">
            <Typography variant="h6" component="h1">
                {new Date().toLocaleDateString("en-us", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                })}
                th
            </Typography>

            <Typography variant="h4" component="h2">
                {`Good Afternoon ${data?.name ? "Good Afternoon," + data?.name : "Unknown"} `}
            </Typography>
        </Card>
    );
};

export default HeroSection;
