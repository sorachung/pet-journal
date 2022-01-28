import React from "react";
import { Link } from "react-router-dom";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./Navbar.css"


export const Navbar = () => {
    const { isAuthenticated, logout, getCurrentUser } = useSimpleAuth()
    return (
        <>
            <nav className="nav">
                <div className="nav__pets__dropdown nav__dropdown">
                    <div>Pets</div>
                    <ul className="nav__pets__dropdown__content nav__dropdown__content">
                        <li className="nav__item dropdown__item">
                            Pet 1
                        </li>
                        <li className="nav__item dropdown__item">
                            Pet 2
                        </li>
                    </ul>
                </div>
                <div className="nav__profile__dropdown nav__dropdown">
                    <div>Hello, {getCurrentUser.name}</div>
                    <ul className="nav__profile__dropdown__content nav__dropdown__content">
                        <li className="nav__item dropdown__item">
                            Settings
                        </li>
                        <li className="nav__item dropdown__item">
                            {
                                isAuthenticated()
                                    ? <Link onClick={() => {
                                        logout()
                                    }} className="nav-link" to="/login">Logout</Link>
                                    : <Link className="nav-link" to="/login">Login</Link>
                            }
                        </li>
                        <li className="nav-item">
                            {
                                !isAuthenticated()
                                    ? <Link className="nav-link" to="/register">Register</Link>
                                    : ""
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}