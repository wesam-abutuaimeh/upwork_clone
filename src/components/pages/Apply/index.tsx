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

const Apply = ({ params }: any) => {
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

    let DATA: any;
    useEffect(() => {
        if (typeof window !== "undefined") {
            DATA = JSON.parse(localStorage.getItem("FullData"));
        }
        console.log(DATA)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Container>
                <Typography variant="h6" component="p">Job details</Typography>
            </Container>
        </div>
    )
}

export default Apply;
