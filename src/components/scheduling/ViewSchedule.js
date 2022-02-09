import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { RemindersList } from "./RemindersList";
import { EventsList } from "./EventsList";

export const ViewSchedule = ({pet}) => {

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
                Scheduling
            </Typography>
            {(pet) ?
                <Grid container spacing={8} direction="column">
                    <Grid item xs={12} key={`reminders`}>
                        <RemindersList />
                    </Grid>
                    
                    <Grid item xs={12} key={`events`}>
                        <EventsList />
                    </Grid>
                </Grid>
            : ""}
        </Container>
    );
};
