import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { ApplicationView } from "./ApplicationView";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Navbar } from "./nav/Navbar";
import { Sidebar } from "./nav/Sidebar";


export const PetJournal = () => {
    const istAuthenticated = true;
    return (
        <>
            <Route render={() => {
                if (istAuthenticated) {
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
            <Route path="register">
                <Register />
            </Route>
        </>
    )
}