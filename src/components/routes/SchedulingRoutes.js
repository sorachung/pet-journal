import React from "react";
import { Route } from "react-router-dom";
import { EventsList } from "../scheduling/EventsList";
import { RemindersList } from "../scheduling/RemindersList";
import { ViewSchedule } from "../scheduling/ViewSchedule";

export const SchedulingRoutes = ({pet}) => {
    return (
        <>
            <Route exact path="/schedule">
                <ViewSchedule pet={pet}/>
            </Route>
            <Route exact path="/schedule/events">
                <EventsList pet={pet}/>
            </Route>
            <Route exact path="/schedule/reminders">
                <RemindersList pet={pet}/>
            </Route>
        </>
    )
}