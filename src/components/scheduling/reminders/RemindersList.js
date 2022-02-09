import React, { useEffect, useState } from "react";
import SchedulingRepository from "../../../repositories/SchedulingRepository";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useSimpleAuth from "../../../hooks/ui/useSimpleAuth";
import { Reminder } from "./Reminder";
import { AddReminderDialog } from "./AddReminderDialog";

export const RemindersList = ({ pet }) => {
    const [myPetReminderss, setMyPetReminders] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const { getCurrentUser } = useSimpleAuth();

    const syncPetReminders = () => {
        SchedulingRepository.findRemindersByPet(pet?.id).then((data) =>
            setMyPetReminders(data)
        );
    }

    useEffect(() => {
        syncPetReminders()
    }, [pet]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom align="center">
                Reminders
            </Typography>
            <AddReminderDialog userId={getCurrentUser().id} pet={pet} syncPetReminders={syncPetReminders}/>
            <Box>
                {myPetReminderss.map((petReminder) => {
                    return (
                        <Reminder
                            key={petReminder.id}
                            petReminder={petReminder}
                            handleChange={handleChange}
                            expanded={expanded}
                            syncPetReminders={syncPetReminders}
                        />
                    );
                })}
            </Box>
        </Container>
    );
};
