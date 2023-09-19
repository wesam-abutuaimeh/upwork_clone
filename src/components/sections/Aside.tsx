import React from "react";
import { Avatar } from "@mui/material";
import { StyledAside } from "@/styles/commen";

interface Iprops {
    name: string;
    jobTitle: string;
}

const Aside: React.FC<Iprops> = ({ name = "Unknown", jobTitle = "Unknown" }) => {
    return (
        <StyledAside>
            <Avatar />
            <span>{name}</span>
            <span>{jobTitle}</span>
        </StyledAside>
    );
};

export default Aside;
