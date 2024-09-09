"use client";

import Layout from ".//components/SidebarLayout";
import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  Divider
} from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
// import App from "next/app";

export default function HeadstarterAI() {

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
          <Typography variant="h2" justifyContent={"center"} display={"flex"}>
            Welcome!
          </Typography>
          <Divider />
          <Typography variant="h5" gutterBottom>
            We are a team of developers and designers working on the next big
            thing.
          </Typography>
          <Divider />
          <Typography variant="h5" gutterBottom>
            Learn more about Headstarter:{" "}
            <a href="https://headstarter.ai">Headstarter AI</a>
          </Typography>
        </Stack>
      </Box>
    </Layout>
  );
}
