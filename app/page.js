"use client";

import Image from "next/image";
import {
  Box,
  Button,
  Typography,
  Stack,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Container,
  Drawer,
  CssBaseline,
  List,
  Divider,
  Tooltip,
  ListItemButton,
  ListItem,
} from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import App from "next/app";

const pages = ["General", "Career Coach", "Resume Review"];

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I am the Headstarter Support Agent. How may I assist you today?`,
    },
  ]);
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    setMessage(""); // resets the message textfield
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    const response = fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        // read the stream
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Int8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  const gptList = ['Headstarter AI Support', 'Career Coach', 'Resume Review'];

  const drawerWidth = 244;

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Headstarter AI Support
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Divider />

          <List>
            {gptList.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />

          <List>
            {pages.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
      <Toolbar />
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">Headstarter AI Chat</Typography>
        <Stack
          direction="column"
          width="800px"
          height="700px"
          border="1px solid black"
          p={2}
          spacing={3}
          overflow="auto"
        >
          <Stack
            direction="column"
            maxWidth="100%"
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.map((msg, index) => (
              // if its the assistant, it starts on the left and if its the user it starts on the right
              <Box
                key={index}
                display="flex"
                justifyContent={
                  msg.role === "assistant" ? "flex-start" : "flex-end"
                }
              >
                <Box
                  bgcolor={
                    // if its the assistant, primary color, if its the user, secondary color
                    msg.role === "assistant" ? "info.main" : "secondary.main"
                  }
                  color="white"
                  borderRadius={16}
                  p={3}
                  maxWidth="75%"
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {
              //if text field is empty, button is hidden so user can't send empty messages
              message !== "" && (
                <Button
                  variant="contained"
                  hidden={message != "" ? false : true}
                  onClick={sendMessage}
                >
                  Send
                </Button>
              )
            }
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
