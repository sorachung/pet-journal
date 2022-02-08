import React, { useState, useEffect } from "react";
import PetRepository from "../../repositories/PetRepository";
import UserRepository from "../../repositories/UserRepository";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";
import { Sidebar } from "./Sidebar";

const drawerWidth = 240;

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
    const { logout, getCurrentUser } = useSimpleAuth();
    const [user, updateUser] = useState({});
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElPet, setAnchorElPet] = useState(null);
    const [myPets, setMyPets] = useState([]);
    const [defaultPet, setDefaultPet] = useState({});
    const history = useHistory();

    const syncUser = () => {
        UserRepository.get(getCurrentUser().id).then((data) => {
            updateUser(data);
            history.push(history.location.pathname, data);
        });
    };

    const syncPets = () => {
        PetRepository.getAllExpandAllByUser(user.id).then((data) => {
            data.sort((el1) => {
                if (el1.id === user.defaultPetId) {
                    return -1;
                }
            });
            setMyPets(data);
        });
    };

    useEffect(() => {
        syncUser();
    }, []);

    useEffect(() => {
        syncPets();
    }, [user]);

    useEffect(() => {
        setDefaultPet(myPets.find((pet) => user.defaultPetId === pet.id));
    }, [myPets]);

    const changeDefaultPet = (event) => {
        const copy = { ...user };
        copy.defaultPetId = parseInt(event.target.id);
        UserRepository.editAccount(copy).then(() => syncUser());
    };

    // functions for ui
    const handleDrawerOpen = () => {
        setOpen(true);
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
            <AppBar position="static" open={open}>
                <Toolbar
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" onClick={() => history.push()}>
                            Pet Journal
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6" noWrap component="div">
                            {defaultPet?.name}
                        </Typography>
                        <Box sx={{ flexGrow: 0, mr: "2em", ml: "1em" }}>
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
                                {myPets.map((pet) => (
                                    <MenuItem
                                        key={pet.name}
                                        id={pet.id}
                                        onClick={(event) => {
                                            handleClosePetMenu();
                                            changeDefaultPet(event);
                                        }}
                                    >
                                        {pet.name}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        
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
                                <MenuItem
                                    key="logout"
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        logout();
                                        history.push("/login");
                                    }}
                                >
                                    <Typography textAlign="center">
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Sidebar open={open} setOpen={setOpen}/>
            <Main open={open}></Main>
        </Box>
    );
};
