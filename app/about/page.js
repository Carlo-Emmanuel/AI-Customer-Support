"use client";

import Layout from "../components/SidebarLayout";

import { Box, Typography, Divider, Stack } from "@mui/material";

import { useState } from "react";

export default function AboutPage() {
  return (
    <Layout>
      <Box
        sx={{ flexGrow: 1, p: 3 }}
        justifyContent={"center"}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
      >
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" justifyContent={"center"} display={"flex"}>
            About MentorMate
          </Typography>
          <Divider />
          <Typography variant="h5" gutterBottom>
            MentorMate is a platform that provides AI support for College Students!
          </Typography>
          <Divider />
          <Typography variant="h5" gutterBottom>
            Our mission is to help you build your dreams.
          </Typography>
        </Stack>
      </Box>
    </Layout>
  );
}
