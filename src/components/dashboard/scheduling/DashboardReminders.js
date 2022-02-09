import React, { useEffect, useState } from "react";
import SchedulingRepository from "../../../repositories/SchedulingRepository";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useSimpleAuth from "../../../hooks/ui/useSimpleAuth";
import { Reminder } from "../../scheduling/reminders/Reminder";

export const DashboardReminders = ({ user }) => {
    const [myReminders, setMyReminders] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncMyReminders = () => {
        SchedulingRepository.findStarredRemindersByUser(user?.id).then((data) => {
            data.sort((reminder) => {
                if(!reminder.complete) {
                    return -1
                }
            })
            setMyReminders(data)
        });
    }

    useEffect(() => {
        syncMyReminders()
    }, [user]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" gutterBottom align="center">
                Reminders
            </Typography>
            <Box>
                {myReminders.map((reminder) => {
                    return (
                        <Reminder
                            key={reminder.id}
                            petReminder={reminder}
                            handleChange={handleChange}
                            expanded={expanded}
                            syncPetReminders={syncMyReminders}
                        />
                    );
                })}
            </Box>
        </Container>
    );
};
