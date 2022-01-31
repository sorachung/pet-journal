import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PetsIcon from "@mui/icons-material/Pets";
import GridViewIcon from "@mui/icons-material/GridView";
import HealingIcon from "@mui/icons-material/Healing";
import ContactsIcon from "@mui/icons-material/Contacts";
import Avatar from "@mui/material/Avatar";
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';


const drawerWidth = 240;
const profilePages = ['Profile', 'Settings', 'Logout'];
const petPages = ['Pet1', 'Pet2', 'Pet3'];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}

export const Navbar = () => {
    const { isAuthenticated, logout, getCurrentUser } = useSimpleAuth();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openSub, setOpenSub] = useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElPet, setAnchorElPet] = React.useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        setOpenSub(!openSub);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenPetMenu = (event) => {
        setAnchorElPet(event.currentTarget);
    };

    const handleClosePetMenu = () => {
        setAnchorElPet(null);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Pet Journal
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open profile pages">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    {...stringAvatar(getCurrentUser().name)}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {profilePages.map(([page]) => (
                                <MenuItem
                                    key={[page]}
                                    onClick={handleCloseUserMenu}
                                >
                                    <Typography textAlign="center">
                                        {[page]}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open pets">
                            <IconButton
                                onClick={handleOpenPetMenu}
                                sx={{ p: 0 }}
                            >
                               <PetsIcon />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElPet}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElPet)}
                            onClose={handleClosePetMenu}
                        >
                            {petPages.map(([page]) => (
                                <MenuItem
                                    key={[page]}
                                    onClick={handleClosePetMenu}
                                >
                                    <Typography textAlign="center">
                                        {[page]}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem button key={"Dashboard"}>
                        <ListItemIcon>
                            <GridViewIcon />
                        </ListItemIcon>
                        <ListItemText primary={<Link to="/">Dashboard</Link>} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key={"My pets"}>
                        <ListItemIcon>
                            <PetsIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Link to="/mypets">My pets</Link>}
                        />
                    </ListItem>
                </List>
                <List>
                    <ListItem button key={"Medical"} onClick={handleClick}>
                        <ListItemIcon>
                            <HealingIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Medical"} />
                    </ListItem>
                </List>
                <Collapse in={openSub} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText
                                primary={<Link to="/medical">All medical</Link>}
                            />
                        </ListItemButton>
                    </List>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText
                                primary={<Link to="/medical/bio">Bio</Link>}
                            />
                        </ListItemButton>
                    </List>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText
                                primary={
                                    <Link to="/medical/incidents">
                                        Incidents
                                    </Link>
                                }
                            />
                        </ListItemButton>
                    </List>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText
                                primary={
                                    <Link to="medical/vetvisits">
                                        Vet visits
                                    </Link>
                                }
                            />
                        </ListItemButton>
                    </List>
                </Collapse>
                <List>
                    <ListItem button key={"Contacts"}>
                        <ListItemIcon>
                            <ContactsIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Link to="/contacts">Contacts</Link>}
                        />
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}></Main>
        </Box>
    );
};
