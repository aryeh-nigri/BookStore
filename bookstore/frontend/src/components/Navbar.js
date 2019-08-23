import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/logo.svg";
import contactUsImg from "../assets/contact-us.svg";
import { ButtonContainer } from "./Button";

import { isAuthenticated, getRole, getName, logout } from '../services/auth';

export default class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            role: '',
            isAuthenticated: false
        };

        this.localStorageUpdated = this.localStorageUpdated.bind(this)
    }

    componentDidMount() {
        this.updateState();

        if (typeof window !== 'undefined') {
            window.addEventListener('storage', this.localStorageUpdated);
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('storage', this.localStorageUpdated)
        }
    }

    updateState = () => {
        this.setState({
            username: getName(),
            role: getRole(),
            isAuthenticated: isAuthenticated()
        });
    };

    localStorageUpdated() {
        this.updateState();
    }

    render() {
        const { username, role, isAuthenticated } = this.state;

        return (
            <Nav className="navbar  navbar-expand-lg  navbar-dark px-sm-5">
                <Link to="/" >
                    <img src={logo} alt="store" className="navbar-brand" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navbarNavDropdown" className="navbar-collapse collapse">
                    <ul className="navbar-nav align-items-center mr-auto">
                        <li className="nav-item ml-5">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        {role === 'admin' &&
                            <li className="nav-item ml-5">
                                <Link to="/booksAdministration" className="nav-link">
                                    Books Administration
                                </Link>
                            </li>
                        }
                        <li className="nav-item ml-5">
                            <Link to="/aboutUs" className="nav-link">
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item ml-5">
                            <Link to="/contactUs" className="nav-link ">
                                Contact Us <img src={contactUsImg} alt="store" className="navbar-brand" />
                            </Link>
                        </li>

                        {isAuthenticated &&
                            <li className="nav-item ml-5">
                                <h2 className="text-capitalize font-weight-bold text-white">
                                    Welcome <strong>{username}</strong>
                                </h2>
                            </li>
                        }

                    </ul>
                    {!isAuthenticated ? (
                        <ul class="navbar-nav">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    <ButtonContainer>
                                        Login
                                </ButtonContainer>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link ">
                                    <ButtonContainer>
                                        Sign Up
                                    </ButtonContainer>
                                </Link>
                            </li>
                        </ul>
                    ) : (
                            <ul class="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link ">
                                        <ButtonContainer onClick={logout()}>
                                            Logout
                                        </ButtonContainer>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/cart" className="ml-auto nav-link">
                                        <ButtonContainer>
                                            <span className="mr-2">
                                                <i className="fas fa-cart-plus " />
                                            </span>
                                            my cart
                                        </ButtonContainer>
                                    </Link>
                                </li>
                            </ul>
                        )}
                </div>
            </Nav>
        )
    }
}

const Nav = styled.nav`
          background: var(--mainBlue);
  .nav-link {
                    color: var(--mainWhite) !important;
                font-size:1.3rem;
                text-transform:capitalize;
              }
            
  @media (max-width: 576px) {
    .navbar - nav {
                flex-direction: row !important;
              }
`;