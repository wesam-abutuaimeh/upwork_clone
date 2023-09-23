"use client";
import React, { useEffect, useState } from 'react'

// MUI
import { Container, Box, Avatar, Typography, Modal, Divider, Chip, TextField, Button } from '@mui/material';

// Icons
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';

// Custom Component
import Footer from '@/components/organisms/Footer';

// Redux
import { getUser, editUser } from '@/redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { modalStyle } from './style';
import useAPI from '@/hooks/useAPI';
import { API_URL } from '@/config/api';
import { END_POINTS } from '@/constants/endPoints';

const Portfoilo = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // const dispatch = useDispatch<AppDispatch>();
    const { data, get } = useAPI(`${API_URL}${END_POINTS.USERS}`);
    useEffect(() => {
        get();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [jobTitle = data[0]?.jobTitle, setJobTitle] = useState();

    return (
        <div>
            <Container>
                <Box sx={{ border: '1px solid #e2eae2', borderRadius: "11px", padding: "20px" }}>
                    <Box sx={{ display: 'flex' }}>
                        <Avatar src="/upwork_favicon.jpeg" alt="User Avatar" sx={{ width: 70, height: 70 }} />
                        <Box sx={{ marginLeft: "20px" }}>
                            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: "500" }}>
                                {data[0]?.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: "center" }}> <LocationOnIcon sx={{ color: "#5e6d55" }} /> Gaza, Palestinian Territories - 3:07 pm local time</Box>
                        </Box>
                    </Box>

                    <Box mt={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="h6" component="h2" sx={{ fontWeight: "500", marginRight: "5px" }}>
                                    {data[0]?.jobTitle}
                                </Typography>
                                <EditIcon sx={{ color: "#108a00", width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #d5e0d5", padding: "6px", cursor: "pointer" }}
                                    onClick={handleOpen} />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="h6" component="h2" sx={{ fontWeight: "500", marginRight: "5px" }}>
                                    {`$${data[0]?.pricePerHour}.00/hr`}
                                </Typography>
                                <EditIcon sx={{ color: "#108a00", width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #d5e0d5", padding: "6px", cursor: "pointer" }}
                                    onClick={() => console.log("edited!")} />
                            </Box>
                        </Box>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="p">
                                    Edit your title
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Your title
                                    Enter a single-sentence description of your professional skills/experience (e.g. Expert Web Designer with Ajax experience)
                                </Typography>
                                <TextField
                                    label="change_job_title"
                                    type="change_job_title"
                                    id="change_job_title"
                                    autoComplete="change_job_title"
                                    required
                                    fullWidth
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    sx={{
                                        borderRadius: "11px", marginTop: "15px"
                                    }} />
                                <Box mt={2} sx={{ position: "relative", right: "-300px" }}>
                                    <Button variant="text" sx={{ boxShadow: "none", borderRadius: "25px", color: "#108a00" }} onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" color="success" sx={{
                                        boxShadow: "none", borderRadius: "25px", color: "#ffffff", marginLeft: "5px"
                                    }}
                                        onClick={() => dispatch(editUser)}>
                                        Save
                                    </Button>
                                </Box>
                            </Box>

                        </Modal>
                        <Box>
                            <Box mt={3} mb={3} sx={{ display: 'flex' }}>
                                <Typography variant="subtitle1" component="p" sx={{ fontWeight: "500", marginRight: "5px" }}>
                                    {data[0]?.bio}
                                </Typography>
                                <EditIcon sx={{ color: "#108a00", width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #d5e0d5", padding: "6px", cursor: "pointer" }}
                                    onClick={() => console.log("edited!")} />
                            </Box>
                            <Divider sx={{ color: "#d5e0d5" }} />

                            <Box>
                                <Box mt={3} mb={3} sx={{ display: 'flex' }}>
                                    <Typography variant="h6" component="p" sx={{ fontWeight: "600", marginRight: "5px" }}>
                                        Skills
                                    </Typography>
                                    <EditIcon sx={{ color: "#108a00", width: "30px", height: "30px", borderRadius: "50%", border: "1px solid #d5e0d5", padding: "6px", cursor: "pointer" }}
                                        onClick={() => console.log("edited!")} />
                                </Box>
                                <Box sx={{ display: 'flex', flexWrap: "wrap", gap: "10px", fontWeight: "500" }}>
                                    {data[0]?.skills.map((skill: any, index: number) => {
                                        return <Chip key={index} label={skill} sx={{ fontSize: "15px", backgroundColor: "#d5e0d5" }} />
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Footer />
        </div >
    )
}

export default Portfoilo;
