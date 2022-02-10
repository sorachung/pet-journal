import React, { useEffect, useState } from "react";
import SchedulingRepository from "../../../repositories/SchedulingRepository";
import { convertToTimestamp } from "../../time/TimeFormatting";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useSimpleAuth from "../../../hooks/ui/useSimpleAuth";
import { Event } from "../../scheduling/events/Event";

export const DashboardEvents = ({ user }) => {
    const [myEvents, setMyEvents] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncEvents = () => {
        SchedulingRepository.findEventsByUser(user?.id).then((data) => {
            const filteredData = data.filter(event => {
                const eventTimestamp = convertToTimestamp(event.date, event.time)
                let comingUp = eventTimestamp - Date.now() < 172800000 ? true : false

                return event.starred || comingUp
            })
            filteredData.sort((a,b) => {
                const timestampA = convertToTimestamp(a.date, a.time);
                const timestampB = convertToTimestamp(b.date, b.time);
                return timestampA - timestampB;
            })
            setMyEvents(filteredData)
        });
    }

    useEffect(() => {
        syncEvents()
    }, [user]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h5" gutterBottom align="center">
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
