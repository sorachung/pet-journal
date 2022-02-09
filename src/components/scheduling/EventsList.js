import React, { useEffect, useState } from "react";
import SchedulingRepository from "../../repositories/SchedulingRepository";
import { Event } from "./Event";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export const EventsList = ({ pet }) => {
    const [myPetEvents, setMyPetEvents] = useState([]);
    const [expanded, setExpanded] = useState(false);

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
