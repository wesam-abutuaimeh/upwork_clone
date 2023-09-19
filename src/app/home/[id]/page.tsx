"use client";
import React, { useState, useEffect } from 'react'

// MUI Components
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Stack,
    Typography,
    Skeleton
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// Hooks
import useAPI from "@/hooks/useAPI"

// APIs End points
import { API_URL } from "@/config/api";
import { END_POINTS } from "@/constants/endPoints";

// Style
import { StyledAside } from "@/styles/commen";

const HomePageDetails = ({ params }: any) => {
    const JOB_LINK: (string | null) = typeof window !== "undefined" ? window.location.href : null;

    const [copySuccess, setCopySuccess] = useState(false);
    const handleCopy = (textToCopy: string) => {
        const tempInput = document.createElement('input');
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);

        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        setCopySuccess(true);

        setTimeout(() => {
            setCopySuccess(false);
        }, 1500);
    };

    const { get, data, isLoading } = useAPI(`${API_URL}${END_POINTS.JOBS_LIST}/${params.id}`);
    useEffect(() => {
        get();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <Typography variant="h6" component="p">Job details</Typography>
            {!isLoading ?
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ border: "1px solid #d5e0d5", padding: "20px", borderRadius: "11px" }}>

                        <Typography variant="body1" component="h1" sx={{ fontSize: "20px", fontWeight: "500" }}>
                            {data.jobTitle}
                        </Typography>
                        <Typography variant="body1" component="p" mt={3.7} mb={.7} sx={{ color: "#108a00", fontWeight: "600" }}>
                            {data.category}
                        </Typography>
                        <Typography variant="body1" component="p" sx={{ color: "#5e6d55" }}>
                            Posted 21 hours ago
                        </Typography>

                        <Box mt={2} mb={2} sx={{ display: "flex", alignItems: "center" }}><LocationOnIcon sx={{ color: "#1f57c3" }} /> Worldwide
                        </Box>
                        <Divider />
                        <Typography variant="body1" component="p" mt={3.7} mb={3.7} sx={{ lineHeight: "2.5", maxWidth: "533px" }} >
                            {/* {data.proposalInfo.description} */}
                            {/* [ ] Undefiend error !! */}
                            I need someone to create and design a landing page for my business.
                        </Typography>
                        <Divider />

                        <Stack mt={2} mb={5} spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                            <Box sx={{ display: "flex", gap: "5px" }}>
                                <PriceChangeIcon />
                                <Box>
                                    <Typography variant="h6" component="p">
                                        {`$${data.price}`}
                                    </Typography>
                                    <Typography variant="body1" component="p" sx={{ color: "#5e6d55", maxWidth: "200px" }}>
                                        {data.isHourly ? "Hourly-price" : "Fixed-price"}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "5px" }}>
                                <PsychologyIcon />
                                <Box>
                                    <Typography variant="h6" component="p" sx={{ textTransform: "capitalize" }}>
                                        {data.level} level
                                    </Typography>
                                    <Typography variant="body1" component="p" sx={{ color: "#5e6d55", maxWidth: "200px" }}>
                                        {data.level === "entry" ? 'i am looking for freelancers with the lowest rates' : 'i am looking for freelancers with high experience'}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: "5px" }}>
                                <TextSnippetOutlinedIcon />
                                <Box>
                                    <Typography variant="h6" component="p" sx={{ textTransform: "capitalize" }}>
                                        Contract-to-hire
                                    </Typography>
                                    <Typography variant="body1" component="p" sx={{ color: "#5e6d55", maxWidth: "200px" }}>
                                        {
                                            data.timeWork === "Full-time" ?
                                                'This job has the potential to turn into a full time role' :
                                                'This job has the potential to turn into a part time role'
                                        }
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                        <Divider />
                        <Typography variant="body1" component="p" mt={2} mb={2} sx={{ fontWeight: "500" }}>
                            Project Type : {data.level === "senior" ? "Complex Project" : "Mid level Project"}
                        </Typography>
                    </Box>
                    <StyledAside>
                        <Button variant="contained" color="success" fullWidth sx={{ boxShadow: "none", borderRadius: "25px", backgroundColor: "#108a00" }}>
                            Apply Now
                        </Button>
                        <Button variant="outlined" fullWidth sx={{ boxShadow: "none", borderRadius: "25px", color: "#108a00", textTransform: "capitalize" }}>
                            <FavoriteBorderIcon sx={{ width: "16px", marginRight: "5px" }} /> Save Job
                        </Button>

                        <Typography variant="body1" component="p" sx={{ fontWeight: "600" }}>
                            Job Link
                        </Typography>
                        <Chip label={JOB_LINK} sx={{ backgroundColor: "#e3ebe3", color: "#9aaa97", borderRadius: "11px", height: "40px" }}
                            onClick={() => handleCopy(JOB_LINK)}
                            variant="outlined"
                        />
                        {copySuccess && <p>Copied to clipboard!</p>}
                    </StyledAside>
                </Box>
                : <Skeleton animation="wave" />
            }
        </Container>
    )
}

export default HomePageDetails;
