import React, { useEffect, useState } from "react";
import { Memory } from "./Memory";
import MemoriesRepository from "../../repositories/MemoriesRepository";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { AddMemoryDialog } from "./AddMemoryDialog";

export const MemoriesList = ({ user = { user }, myPets = { myPets } }) => {
    const [myMemories, setMyMemories] = useState([]);
    const [tagView, setTagView] = useState(null);
    const { getCurrentUser } = useSimpleAuth();

    const syncMyMemories = () => {
        MemoriesRepository.findMemoriesByUser(getCurrentUser().id).then(
            (data) => setMyMemories(data)
        );
    };

    useEffect(() => {
        syncMyMemories();
    }, []);

    useEffect(() => {
        if (tagView) {
            MemoriesRepository.findTagsByPetExpandMemories(tagView.id).then(
                (tagsArr) => setMyMemories(tagsArr.map((tag) => tag.memory))
            );
        } else {
            syncMyMemories();
        }
    }, [tagView]);

    return (
        <>
            <Container maxWidth="sm">
                <AddMemoryDialog
                    syncMyMemories={syncMyMemories}
                    myPets={myPets}
                    userId={getCurrentUser().id}
                />
                {tagView ? (
                    <Typography>
                        Viewing {tagView.name}.{" "}
                        <Button onClick={() => setTagView(null)}>
                            View all
                        </Button>
                    </Typography>
                ) : (
                    ""
                )}
                {myMemories.map((memory) => (
                    <Memory
                        key={memory.id}
                        memory={memory}
                        syncMyMemories={syncMyMemories}
                        setTagView={setTagView}
                    />
                ))}
            </Container>
        </>
    );
};
