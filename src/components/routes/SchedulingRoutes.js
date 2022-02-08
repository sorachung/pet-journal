import React from "react";
import { Route } from "react-router-dom";
import { EventsList } from "../scheduling/EventsList";
import { RemindersList } from "../scheduling/RemindersList";
import { ViewSchedule } from "../scheduling/ViewSchedule";

export const SchedulingRoutes = () => {
    return (
        <>
            <Route exact path="/schedule">
                <ViewSchedule />
            </Route>
            <Route exact path="/schedule/events">
                <EventsList />
            </Route>
            <Route exact path="/schedule/reminders">
                <RemindersList />
            </Route>
        </>
    )
}