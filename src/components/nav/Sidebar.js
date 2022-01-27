import React from "react";
import { Link } from "react-router-dom";


export const Sidebar = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/mypets">My pets</Link>
                    </li>
                    <li>
                        <Link to="/medical">Medical</Link>
                        <ul>
                            <li>
                                <Link to="/medical/bio">Bio</Link>
                            </li>
                            <li>
                                <Link to="/medical/incidents">Incidents</Link>
                            </li>
                            <li>
                                <Link to="medical/vetvisits">Vet visits</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/contacts">Contacts</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}