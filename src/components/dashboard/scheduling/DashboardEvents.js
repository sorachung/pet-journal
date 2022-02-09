import React, { useEffect, useState } from "react";
import SchedulingRepository from "../../../repositories/SchedulingRepository";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useSimpleAuth from "../../../hooks/ui/useSimpleAuth";
import { Event } from "../../scheduling/events/Event";

export const DashboardEvents = ({ user }) => {
    const [myEvents, setMyEvents] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncEvents = () => {
        SchedulingRepository.findStarredEventsByUser(user?.id).then((data) =>
            setMyEvents(data)
        );
    }

    useEffect(() => {
        syncEvents()
    }, [user]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
                Events
            </Typography>
            <Box>
                {myEvents.map((petEvent) => {
                    return (
                        <Event
                            key={petEvent.id}
                            petEvent={petEvent}
                            handleChange={handleChange}
                            expanded={expanded}
                            syncPetEvents={syncEvents}
                        />
                    );
                })}
            </Box>
        </Container>
    );
};
