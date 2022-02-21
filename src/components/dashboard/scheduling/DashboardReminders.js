import React, { useEffect, useState } from "react";
import SchedulingRepository from "../../../repositories/SchedulingRepository";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useSimpleAuth from "../../../hooks/ui/useSimpleAuth";
import { Reminder } from "../../scheduling/reminders/Reminder";
import { convertToTimestamp } from "../../../time/TimeFormatting";


export const DashboardReminders = ({ user }) => {
    const [myReminders, setMyReminders] = useState([]);
    const [expanded, setExpanded] = useState(false);

    const syncMyReminders = () => {
        SchedulingRepository.findRemindersByUser(user?.id).then((data) => {
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
            filteredData.sort((reminder1, reminder2) => {
                return reminder1.complete - reminder2.complete
            })
            setMyReminders(filteredData)
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
            <Typography variant="h5" gutterBottom align="center">
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
                            dashboardView={true}
                        />
                    );
                })}
            </Box>
        </Container>
    );
};
