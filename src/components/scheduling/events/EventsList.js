import React, { useEffect, useState } from "react";
import SchedulingRepository from "../../../repositories/SchedulingRepository";
import { Event } from "./Event";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AddEventDialog } from "./AddEventDialog";
import useSimpleAuth from "../../../hooks/ui/useSimpleAuth";

export const EventsList = ({ pet }) => {
    const [myPetEvents, setMyPetEvents] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const { getCurrentUser } = useSimpleAuth();

    const syncPetEvents = () => {
        SchedulingRepository.findEventsByPet(pet?.id).then((data) =>
            setMyPetEvents(data)
        );
    }

    useEffect(() => {
        syncPetEvents()
    }, [pet]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
                Events
            </Typography>
            <AddEventDialog userId={getCurrentUser().id} pet={pet} syncPetEvents={syncPetEvents}/>
            <Box>
                {myPetEvents.map((petEvent) => {
                    return (
                        <Event
                            key={petEvent.id}
                            petEvent={petEvent}
                            handleChange={handleChange}
                            expanded={expanded}
                            syncPetEvents={syncPetEvents}
                        />
                    );
                })}
            </Box>
        </Container>
    );
};
