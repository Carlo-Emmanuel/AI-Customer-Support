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
            About Headstarter
          </Typography>
          <Divider />
          <Typography variant="h5" gutterBottom>
            We are a team of developers and designers working on the next big
            thing.
          </Typography>
          <Divider />
          <Typography variant="h5" gutterBottom>
            Our mission is to help you build your dreams.
          </Typography>
          <Divider />
          <Typography variant="h5" gutterBottom>
            Learn more about us at our website:{" "}
            <a href="https://headstarter.ai">Headstarter AI</a>
          </Typography>
        </Stack>
      </Box>
    </Layout>
  );
}
