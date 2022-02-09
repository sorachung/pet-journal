import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { RemindersList } from "./reminders/RemindersList";
import { EventsList } from "./events/EventsList";

export const ViewSchedule = ({pet}) => {

    return (
        <Container maxWidth="lg">
            <Typography variant="h1" gutterBottom align="center" fontSize="3em">
                Scheduling
            </Typography>
            {(pet) ?
                <Grid container spacing={8} direction="column">
                    <Grid item xs={12} key={`reminders`}>
                        <RemindersList pet={pet}/>
                    </Grid>
                    
                    <Grid item xs={12} key={`events`}>
                        <EventsList pet={pet} />
                    </Grid>
                </Grid>
            : ""}
        </Container>
    );
};
