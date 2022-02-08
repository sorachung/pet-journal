import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { ApplicationView } from "./ApplicationView";
import Login from "./auth/Login";
import { Register } from "./auth/Register";
import { Navbar } from "./nav/Navbar";
import useSimpleAuth from "../hooks/ui/useSimpleAuth";
import "./PetJournal.css";
import UserRepository from "../repositories/UserRepository";
import { AllView } from "./AllView";

export const PetJournal = () => {
    const { isAuthenticated } = useSimpleAuth();

    return (
        <>
            <Route
                render={() => {
                    if (isAuthenticated()) {
                        return <AllView />;
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </>
    );
};
