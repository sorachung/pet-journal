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
    const [starredView, setStarredView] = useState(false);
    const { getCurrentUser } = useSimpleAuth();

    const syncMyMemories = () => {
        MemoriesRepository.findMemoriesByUser(getCurrentUser().id).then(
            (data) => {
                if (starredView) {
                    data = data.filter((memory) => memory.starred);
                }
                setMyMemories(data);
            }
        );
    };

    useEffect(() => {
        syncMyMemories();
    }, []);

    useEffect(() => {
        if (tagView) {
            MemoriesRepository.findTagsByPetExpandMemories(tagView.id).then(
                (tagsArr) => {
                    let memoriesArr = tagsArr.map((tag) => tag.memory);
                    if (starredView) {
                        memoriesArr = memoriesArr.filter(
                            (memory) => memory.starred
                        );
                    }
                    setMyMemories(memoriesArr);
                }
            );
        } else {
            syncMyMemories();
        }
    }, [tagView, starredView]);

    return (
        <>
            <Container maxWidth="sm">
                <AddMemoryDialog
                    syncMyMemories={syncMyMemories}
                    myPets={myPets}
                    userId={getCurrentUser().id}
                />
                {myPets.map((pet) => (
                    <Button
                        key={pet.id}
                        disableElevation={true}
                        variant={
                            tagView && tagView.id === pet.id
                                ? "contained"
                                : "outlined"
                        }
                        onClick={() => {
                            if (tagView && tagView.id === pet.id) {
                                setTagView(null);
                            } else {
                                setTagView(pet);
                            }
                        }}
                    >
                        {pet.name}
                    </Button>
                ))}
                <Button
                    sx={{ ml: "2em" }}
                    disableElevation={true}
                    variant={starredView ? "contained" : "outlined"}
                    onClick={() => {
                        setStarredView(!starredView);
                    }}
                >
                    Starred
                </Button>
                {myMemories.map((memory) => (
                    <Memory
                        key={memory.id}
                        memory={memory}
                        syncMyMemories={syncMyMemories}
                        setTagView={setTagView}
                        myPets={myPets}
                    />
                ))}
            </Container>
        </>
    );
};
