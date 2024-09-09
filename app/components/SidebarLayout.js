"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  ListItemText,
  Drawer,
  CssBaseline,
  List,
  Divider,
  ListItemButton,
  ListItem,
  createTheme,
  ThemeProvider,
} from "@mui/material";

export default function Layout({ children }) {
  const drawerWidth = 240;
  const router = useRouter();

  const pageRoutes = {
    Home: "/",
    About: "/about",
    // Contact: "/contact",
    HeadstarterAI: "/gpt-headstarter-ai",
    CareerCoach: "/gemini-career-coach",
    // ResumeReview: "/anthropic-review",
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // const otherPages = ["Home", "About", "Contact"];
  // const gptList = ["Headstarter AI Support", "Career Coach", "Resume Review"];

  const handleNavigation = (page) => {
    const route = pageRoutes[page];
    if (route) {
      router.push(route);
    }
  };

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          {/* top title bar */}
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
            {/* side bar */}
            <Toolbar>
              <Typography variant="h5" noWrap component="div">
                MentorMate
              </Typography>
            </Toolbar>
            <Divider />
            <List>
            <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavigation('Home')}>
                  <ListItemText primary='Home' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavigation('About')}>
                  <ListItemText primary='About' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <Typography variant="h6" noWrap component="div" p={2}>
                AI Support
              </Typography>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavigation('HeadstarterAI')}>
                  <ListItemText primary='Headstarter AI' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavigation('CareerCoach')}>
                  <ListItemText primary='Career Coach' />
                </ListItemButton>
              </ListItem>
            </List>
            {/* <List>
              {gptList.map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => handleNavigation(text)}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List> */}
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              p: 3,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              display: "flex",
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
