import React from "react";
import { Route } from "react-router-dom";
import { EventsList } from "../scheduling/events/EventsList";
import { RemindersList } from "../scheduling/reminders/RemindersList";
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