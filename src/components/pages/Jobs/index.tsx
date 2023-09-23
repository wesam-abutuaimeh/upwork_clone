"use client";
import React, { useState, useEffect } from "react";

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
  Modal,
  Button,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarsIcon from "@mui/icons-material/Stars";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

//Custom Components
import CustomLink from "@/components/atoms/CustomLink";

// Hooks
import useAPI from "@/hooks/useAPI";
import { useRouter } from "next/navigation";

// APIs End points
import { API_URL } from "@/config/api";
import { END_POINTS } from "@/constants/endPoints";
import { StyledFavoriteButton, MODALSTYLE } from "./style";

const Jobs = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [jobId, setJobId] = useState(1);
  const { get, data, isLoading } = useAPI(`${API_URL}${END_POINTS.JOBS_LIST}`);

  let DATA: any;
  if (typeof window !== "undefined") {
    localStorage.setItem("FullData", JSON.stringify(data));
    DATA = JSON.parse(localStorage.getItem("FullData"));
  }

  const router = useRouter();
  const handleClick = (job: any) => {
    handleOpen();
    setJobId(job.id);
  };
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
            sx={{
              color: "#000",
              textTransform: "capitalize",
              fontWeight: "600",
            }}
            label="Best Matches"
          />
          <Tab
            sx={{
              color: "#000",
              textTransform: "capitalize",
              fontWeight: "600",
            }}
            label="Most Recent"
          />
          <Tab
            sx={{
              color: "#000",
              textTransform: "capitalize",
              fontWeight: "600",
            }}
            label="Saved Jobs"
          />
        </Tabs>
        <Divider />

        <Typography variant="body1" component="p" sx={{ margin: "20px auto" }}>
          Browse jobs that match your experience to a clients hiring
          preferences. Ordered by most relevant
        </Typography>

        <Stack spacing={0}>
          {!isLoading ? (
            displayJobs.map((job: any) => {
              return (
                <Card
                  onClick={() => handleClick(job)}
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" component="p">
                      {job.jobTitle}
                    </Typography>
                    <StyledFavoriteButton onClick={() => console.log("loved")}>
                      <FavoriteBorderOutlinedIcon />
                    </StyledFavoriteButton>
                  </Box>
                  <Typography
                    variant="body2"
                    component="p"
                    sx={{ margin: "10px 0" }}
                  >
                    {job.isHourly ? "Fixed Price" : "Hourly Price "}-
                    {job.level === " senior"
                      ? "Senior level "
                      : "Entery level "}
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
                          <GppMaybeIcon sx={{ color: "#f00000" }} /> Not
                          verified!
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={MODALSTYLE}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <ArrowBackIosIcon
              onClick={handleClose}
              sx={{ fontSize: "26px", fontWeight: "500", cursor: "pointer" }}
            />
            <CustomLink
              href={`/home/${jobId}`}
              style={{
                display: "flex",
                alignItems: "center",
                color: "#108a00",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              <OpenInNewIcon sx={{ marginRight: "10px" }} /> Open job in a new
              window
            </CustomLink>
          </Box>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            {DATA && DATA[jobId - 1] && DATA[jobId - 1]["jobTitle"]}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                border: "1px solid #d5e0d5",
                padding: "20px",
                borderRadius: "11px",
              }}
            >
              <Typography
                variant="body1"
                component="h1"
                sx={{ fontSize: "20px", fontWeight: "500" }}
              >
                {DATA && DATA[jobId - 1] && DATA[jobId - 1]["jobTitle"]}
              </Typography>
              <Typography
                variant="body1"
                component="p"
                mt={3.7}
                mb={0.7}
                sx={{ color: "#108a00", fontWeight: "600" }}
              >
                {DATA && DATA[jobId - 1] && DATA[jobId - 1].category}
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ color: "#5e6d55" }}
              >
                Posted 21 hours ago
              </Typography>

              <Box mt={2} mb={2} sx={{ display: "flex", alignItems: "center" }}>
                <LocationOnIcon sx={{ color: "#1f57c3" }} /> Worldwide
              </Box>
              <Divider />
              <Typography
                variant="body1"
                component="p"
                mt={3.7}
                mb={3.7}
                sx={{ lineHeight: "2.5", maxWidth: "533px" }}
              >
                {/* {data.proposalInfo.description} */}
                {/* [ ] Undefiend error !! */}I need someone to create and
                design a landing page for my business.
              </Typography>
              <Divider />

              <Stack
                mt={2}
                mb={5}
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
              >
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <Box>
                    <Typography variant="h6" component="p">
                      {`$${DATA && DATA[jobId - 1] && DATA[jobId - 1].price}`}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{ color: "#5e6d55", maxWidth: "200px" }}
                    >
                      {DATA && DATA[jobId - 1] && DATA[jobId - 1].isHourly
                        ? "Hourly-price"
                        : "Fixed-price"}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <Box>
                    <Typography
                      variant="h6"
                      component="p"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {DATA && DATA[jobId - 1] && DATA[jobId - 1].level} level
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{ color: "#5e6d55", maxWidth: "200px" }}
                    >
                      {DATA &&
                        DATA[jobId - 1] &&
                        DATA[jobId - 1].level === "entry"
                        ? "i am looking for freelancers with the lowest rates"
                        : "i am looking for freelancers with high experience"}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <Box>
                    <Typography
                      variant="h6"
                      component="p"
                      sx={{ textTransform: "capitalize" }}
                    >
                      Contract-to-hire
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{ color: "#5e6d55", maxWidth: "200px" }}
                    >
                      {DATA &&
                        DATA[jobId - 1] &&
                        DATA[jobId - 1].timeWork === "Full-time"
                        ? "This job has the potential to turn into a full time role"
                        : "This job has the potential to turn into a part time role"}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
              <Divider />
              <Typography
                variant="body1"
                component="p"
                mt={2}
                mb={2}
                sx={{ fontWeight: "500" }}
              >
                Project Type :
                {DATA && DATA[jobId - 1] && DATA[jobId - 1].level === "senior"
                  ? "Complex Project"
                  : "Mid level Project"}
              </Typography>
            </Box>
            <Box
              sx={{
                border: "1px solid #d5e0d5",
                borderRadius: "25px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
              p={1}
            >
              <Button
                variant="contained"
                color="success"
                sx={{
                  boxShadow: "none",
                  borderRadius: "25px",
                  backgroundColor: "#108a00",
                  width: "200px",
                  height: "40px",
                }}
              >
                Apply Now
              </Button>
              <Button
                variant="outlined"
                sx={{
                  boxShadow: "none",
                  borderRadius: "25px",
                  color: "#108a00",
                  textTransform: "capitalize",
                }}
              >
                <FavoriteBorderOutlinedIcon
                  sx={{ width: "16px", marginRight: "5px" }}
                />
                Save Job
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Jobs;
