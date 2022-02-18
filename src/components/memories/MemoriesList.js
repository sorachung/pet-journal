import React, { useEffect, useState } from "react";
import { Memory } from "./Memory";
import MemoriesRepository from "../../repositories/MemoriesRepository";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

import Container from "@mui/material/Container";

export const MemoriesList = ({ user = { user }, myPets = { myPets } }) => {
    const [myMemories, setMyMemories] = useState([]);
    const { getCurrentUser } = useSimpleAuth();

    const syncMyMemories = () => {
        MemoriesRepository.findMemoriesByUserEmbedTags(
            getCurrentUser().id
        ).then((data) => setMyMemories(data));
    };

    useEffect(() => {
        syncMyMemories();
    }, []);

    return (
        <>
            <Container maxWidth="sm">
                {myMemories.map((memory) => (
                    <Memory key={memory.id} memory={memory} syncMyMemories={syncMyMemories} />
                ))}
            </Container>
        </>
    );
};
