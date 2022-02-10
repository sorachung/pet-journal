import React, { useState, useEffect } from "react";
import PetRepository from "../repositories/PetRepository";
import UserRepository from "../repositories/UserRepository";
import useSimpleAuth from "../hooks/ui/useSimpleAuth";
import { useHistory } from "react-router-dom";
import { ApplicationView } from "./ApplicationView";
import { Navbar } from "./nav/Navbar";
import { Sidebar } from "./nav/Sidebar";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

const drawerWidth = 240;

export const AllView = () => {
    const { getCurrentUser } = useSimpleAuth();
    const [user, updateUser] = useState({});
    const [open, setOpen] = useState(false);
    const [myPets, setMyPets] = useState([]);
    const [defaultPet, setDefaultPet] = useState({});
    const [defaultPetId, setDefaultPetId] = useState(0);
    const history = useHistory();

    const syncUser = () => {
        UserRepository.get(getCurrentUser().id).then((data) => {
            updateUser(data);            
        });
    };

    const syncPets = () => {
        PetRepository.getAllExpandAllByUser(getCurrentUser().id).then((data) => {
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
        setDefaultPetId(user.defaultPetId);
        syncPets();
    }, [user]);

    useEffect(() => {
        setDefaultPet(myPets.find((pet) => user.defaultPetId === pet.id));
    }, [myPets]);


    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Navbar
                open={open}
                setOpen={setOpen}
                myPets={myPets}
                user={user}
                pet={defaultPet}
                syncUser={syncUser}
            />

            <Sidebar open={open} setOpen={setOpen} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: "80px",
                }}
            >
                <ApplicationView
                    user={user}
                    updateUser={updateUser}
                    pet={defaultPet}
                    myPets={myPets}
                    setMyPets={setMyPets}
                    defaultPet={defaultPet}
                    syncPets={syncPets}
                />
            </Box>
        </Box>
    );
};
