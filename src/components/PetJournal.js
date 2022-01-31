import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { ApplicationView } from "./ApplicationView";
import Login from "./auth/Login";
import { Register } from "./auth/Register";
import { Navbar } from "./nav/Navbar";
import { Sidebar } from "./nav/Sidebar";
import useSimpleAuth from "../hooks/ui/useSimpleAuth";
import "./PetJournal.css"

export const PetJournal = () => {
    const { isAuthenticated } = useSimpleAuth()
    return (
        <>
            <Route render={() => {
                if (isAuthenticated()) {
                    return (
                        <>
                            <Navbar/>
                            <Sidebar />
                            <ApplicationView />
                        </>
                    )
                } else {
                    return <Redirect to="/login" />
                }
            }}/>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </>
    )
}