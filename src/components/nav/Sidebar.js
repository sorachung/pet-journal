import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PetsIcon from "@mui/icons-material/Pets";
import GridViewIcon from "@mui/icons-material/GridView";
import HealingIcon from "@mui/icons-material/Healing";
import ContactsIcon from "@mui/icons-material/Contacts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export const Sidebar = ({open, setOpen}) => {
    const theme = useTheme();
    const [openSub, setOpenSub] = useState(false);
    const history = useHistory();

    const handleDrawerClose = () => {
        setOpen(false);
        setOpenSub(false);
    };

    const handleClick = () => {
        setOpenSub(!openSub);
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            variant="temporary"
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
                <ListItem
                    button
                    key={"Dashboard"}
                    onClick={() => {
                        handleDrawerClose();
                        history.push("/");
                    }}
                >
                    <ListItemIcon>
                        <GridViewIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Dashboard"} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem
                    button
                    key={"My pets"}
                    onClick={() => {
                        handleDrawerClose();
                        history.push("/mypets");
                    }}
                >
                    <ListItemIcon>
                        <PetsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"My pets"} />
                </ListItem>
                <ListItem button key={"Medical"} onClick={handleClick}>
                    <ListItemIcon>
                        <HealingIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Medical"} />
                    {openSub ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItem>
                <Collapse in={openSub} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                            sx={{ pl: 12 }}
                            onClick={() => {
                                handleDrawerClose();
                                history.push("/medical");
                            }}
                        >
                            <ListItemText primary={"All medical"} />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 12 }}
                            onClick={() => {
                                handleDrawerClose();
                                history.push("/medical/bio");
                            }}
                        >
                            <ListItemText primary={"Bio"} />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 12 }}
                            onClick={() => {
                                handleDrawerClose();
                                history.push("/medical/vaccinations");
                            }}
                        >
                            <ListItemText primary={"Vaccinations"} />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 12 }}
                            onClick={() => {
                                handleDrawerClose();
                                history.push("/medical/medications");
                            }}
                        >
                            <ListItemText primary={"Medications"} />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 12 }}
                            onClick={() => {
                                handleDrawerClose();
                                history.push("/medical/incidents");
                            }}
                        >
                            <ListItemText primary={"Incidents"} />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 12 }}
                            onClick={() => {
                                handleDrawerClose();
                                history.push("/medical/vetvisits");
                            }}
                        >
                            <ListItemText primary={"Vet visits"} />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItem
                    button
                    key={"Contacts"}
                    onClick={() => {
                        handleDrawerClose();
                        history.push("/contacts");
                    }}
                >
                    <ListItemIcon>
                        <ContactsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Contacts"} />
                </ListItem>
                <ListItem
                    button
                    key={"Notes"}
                    onClick={() => {
                        handleDrawerClose();
                        history.push("/notes");
                    }}
                >
                    <ListItemIcon>
                        <StickyNote2Icon />
                    </ListItemIcon>
                    <ListItemText primary={"Notes"} />
                </ListItem>
            </List>
        </Drawer>
    );
};
