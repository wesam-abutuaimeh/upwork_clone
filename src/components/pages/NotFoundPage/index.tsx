"use client";
import React from 'react'
import CustomLink from '@/components/atoms/CustomLink';
import { StyledNotFoundPage } from './style'

const NotFoundPage = () => {
    return (
        <StyledNotFoundPage>
            404 | There&apos;s nothing to see here
            <CustomLink href='/'>Return Home</CustomLink>
        </StyledNotFoundPage>
    )
}

export default NotFoundPage;
