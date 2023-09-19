"use client";
import React, { useEffect, useState } from "react";

// MUI Components
import {
  Box,
  Card,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
  Pagination,
  Skeleton,
  Modal
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarsIcon from "@mui/icons-material/Stars";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Hooks
import useAPI from "@/hooks/useAPI";
import { useRouter } from "next/navigation";

// APIs End points
import { API_URL } from "@/config/api";
import { END_POINTS } from "@/constants/endPoints";
import { StyledFavoriteButton, MODALSTYLE } from "./style";
import CustomLink from "@/components/atoms/CustomLink";

const Jobs = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { get, data, isLoading } = useAPI(`${API_URL}${END_POINTS.JOBS_LIST}`);
  // localStorage.setItem("Full-Data", JSON.stringify(data));
  // const fullDataObj: any = JSON.parse(localStorage.getItem("Full-Data"));

  const router = useRouter();
  const handleJobId = (job: any) => job.id;
  const handleRouting = (job: any) => {
    router.push(`/home/${job.id}`);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const ITEM_PER_PAGE = 5;
  const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
  const endIndex = startIndex + ITEM_PER_PAGE;
  const displayJobs = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / ITEM_PER_PAGE);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetData = (id: string) => {
    console.log(fullDataObj[id].jobTitle);
  };

  return (
    <>
      <Box
        sx={{
          padding: "20px",
          borderRadius: "11px",
          border: "1px solid #ecf1ec",
        }}
      >
        <Typography variant="h6" component="p">
          Jobs you might like
        </Typography>
        <Tabs>
          <Tab
            sx={{ color: "#000", textTransform: "capitalize", fontWeight: "600" }}
            label="Best Matches"
          />
          <Tab
            sx={{ color: "#000", textTransform: "capitalize", fontWeight: "600" }}
            label="Most Recent"
          />
          <Tab
            sx={{ color: "#000", textTransform: "capitalize", fontWeight: "600" }}
            label="Saved Jobs"
          />
        </Tabs>
        <Divider />

        <Typography variant="body1" component="p" sx={{ margin: "20px auto" }}>
          Browse jobs that match your experience to a clients hiring preferences.
          Ordered by most relevant
        </Typography>

        <Stack spacing={0}>
          {!isLoading ? (
            displayJobs.map((job: any) => {
              return (
                <Card
                  // onClick={() => handleJobId(job)}
                  onClick={handleOpen}
                  key={job.id}
                  id={job.id}
                  variant="outlined"
                  sx={{
                    padding: "20px",
                    fontWeight: "700",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#eee",
                    },
                  }}
                >
                  {/* <button onClick={() => handleGetData(job.id)}>hada</button> */}
                  <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" component="p">
                      {job.jobTitle}
                    </Typography>
                    <StyledFavoriteButton onClick={() => console.log('red')}>
                      <FavoriteBorderOutlinedIcon />
                    </StyledFavoriteButton>
                  </Box>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{ margin: "10px 0" }}
                  >
                    {job.isHourly ? "Fixed Price" : "Hourly Price "}-
                    {job.level === " senior" ? "Senior level " : "Entery level "}
                    posted 21 hour ago
                  </Typography>
                  <span>{job.proposalInfo.description}</span>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{ margin: "10px 0" }}
                  >
                    {`Propsoals: ${job.proposalInfo.proposalCounts}`}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                      margin: "10px 0",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "2px" }}
                    >
                      {job.proposalInfo.isVerified ? (
                        <>
                          <VerifiedIcon sx={{ color: "#1f57c3" }} /> Payment
                          verified
                        </>
                      ) : (
                        <>
                          <GppMaybeIcon sx={{ color: "#f00000" }} /> Not verified!
                        </>
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      {Array.from({ length: job.proposalInfo.starCount }).map(
                        (_, index) => {
                          return (
                            <StarsIcon key={index} sx={{ color: "green" }} />
                          );
                        }
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "10px",
                      }}
                    >
                      <LocationOnIcon sx={{ color: "#5e6d55" }} />{" "}
                      {job.proposalInfo.location}
                    </Box>
                  </Box>
                </Card>
              );
            })
          ) : (
            <Skeleton animation="wave" />
          )}
        </Stack>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          hidePrevButton
          hideNextButton
          sx={{ margin: "10px auto 0" }}
        />
      </Box>
      <div>
        <Modal open={open} onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={MODALSTYLE}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <ArrowBackIosIcon onClick={handleClose} sx={{ fontSize: "26px", fontWeight: "500", cursor: "pointer" }} />
              <CustomLink href="/" style={{ display: 'flex', alignItems: 'center', color: "#108a00", fontSize: "18px", fontWeight: "500" }}>
                <OpenInNewIcon sx={{ marginRight: "10px" }} /> Open job in a new window
              </CustomLink>
            </Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>


        </Modal>
      </div>
    </>

  );
};

export default Jobs;
