import React, { useEffect, useState } from "react";
import MemoriesRepository from "../../../repositories/MemoriesRepository";
import useSimpleAuth from "../../../hooks/ui/useSimpleAuth";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Memory } from "../../memories/Memory";

export const DashboardMemories = ({ user = { user }, myPets = { myPets } }) => {
    const [myMemories, setMyMemories] = useState([]);
    const [randomMemory, setRandomMemory] = useState();
    const { getCurrentUser } = useSimpleAuth();

    const syncMyMemories = () => {
        MemoriesRepository.findMemoriesByUser(getCurrentUser().id).then(
            (data) => {
                data = data.filter((memory) => memory.starred);
                setMyMemories(data);
            }
        );
    };

    useEffect(() => {
        setRandomMemory(
            myMemories[Math.floor(Math.random() * myMemories.length)]
        );
    }, [myMemories]);

    useEffect(() => {
        syncMyMemories();
    }, []);

    return randomMemory ? (
        <>
            <Typography variant="h5" gutterBottom align="center">
                Random memory of the moment
            </Typography>
            <Container maxWidth="sm">
                <Memory
                    key={randomMemory.id}
                    memory={randomMemory}
                    syncMyMemories={syncMyMemories}
                    myPets={myPets}
                />
            </Container>
        </>
    ) : (
        ""
    );
};
