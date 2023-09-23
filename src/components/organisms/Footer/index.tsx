import React from 'react'

import { Container, Box, Stack, Divider } from '@mui/material'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';

import CustomLink from '@/components/atoms/CustomLink'

import { StyledFooter } from "./style";

const Footer = () => {
    return (
        <div>
            <Container sx={{ marginTop: '40px', marginBottom: "20px" }} maxWidth="xl">
                <StyledFooter>
                    <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <Stack>
                            <CustomLink href="/aboutus">About Us</CustomLink>
                            <CustomLink href="/feedback">Feedback</CustomLink>
                            <CustomLink href="/community">Community</CustomLink>
                        </Stack>
                        <Stack>
                            <CustomLink href="/security">Trust, Safety & Security</CustomLink>
                            <CustomLink href="/feedback">Help & support</CustomLink>
                            <CustomLink href="/foundation">Upwork Foundation</CustomLink>
                        </Stack>
                        <Stack>
                            <CustomLink href="/terms">Terms of Service</CustomLink>
                            <CustomLink href="/poilcy">Privacy Poilcy</CustomLink>
                            <CustomLink href="/notice">CA Notice at Collection</CustomLink>
                            <CustomLink href="/cookie-settings">Cookie Settings</CustomLink>
                        </Stack>
                        <Stack>
                            <CustomLink href="/accessibility">Accessibility</CustomLink>
                            <CustomLink href="/poilcy">Desktop App</CustomLink>
                            <CustomLink href="/cookie-policy">Cookie Policy</CustomLink>
                            <CustomLink href="/enterprise">Enterprise Solutions</CustomLink>
                        </Stack>
                    </Box>
                    <Box mt={2} sx={{ display: 'flex', justifyContent: "space-between" }}>
                        <Box sx={{ display: 'flex', alignItems: "center", gap: "15px" }}>
                            Follow Us
                            <CustomLink href="/" className='icon'>
                                <FacebookOutlinedIcon />
                            </CustomLink>
                            <CustomLink href="/" className='icon'>
                                <LinkedInIcon />
                            </CustomLink>
                            <CustomLink href="/" className='icon'>
                                <TwitterIcon />
                            </CustomLink>
                            <CustomLink href="/" className='icon'>
                                <YouTubeIcon />
                            </CustomLink>
                            <CustomLink href="/" className='icon'>
                                <InstagramIcon />
                            </CustomLink>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: "center", gap: "15px" }}>
                            Mobile app
                            <CustomLink href="/" className='icon'>
                                <AndroidIcon />
                            </CustomLink>
                            <CustomLink href="/" className='icon'>
                                <AppleIcon />
                            </CustomLink>
                        </Box>
                    </Box>
                    <Divider sx={{ bgcolor: "#ffffff", marginTop: "10px" }} />
                    <span className='copy_msg'>
                        <small>© 2015 - 2023 Upwork® Global Inc. •</small>
                    </span>
                </StyledFooter>
            </Container>
        </div>
    )
}

export default Footer
