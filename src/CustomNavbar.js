import React from "react";
import {Button, Container, Navbar, Dropdown, DropdownButton} from "react-bootstrap";
import logo from "./logo-fighter.svg";
import "./CustomNavbar.css"

export default class CustomNavbar extends React.Component {

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home" className={"inline-brand"}>
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        {this.props.t('app-name')}
                        <DropdownButton id="dropdown-basic-button" title="Version">
                            <Dropdown.Item onClick={() => this.props.changeVersion('fighter')}>Fighter</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.props.changeVersion('worker')}>Worker</Dropdown.Item>
                        </DropdownButton>
                    </Navbar.Brand>
                    {this.renderAccountInformation()}
                </Container>
            </Navbar>
        )
    }

    /**
     * Small bloc that will be displayed if the user is connected. This allow us to keep a render function as generic as possible
     * @returns {JSX.Element|null}
     */
    renderAccountInformation(){
        if (Object.keys(this.props.user).length !== 0) {
            return (
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text onClick={this.props.handleAccountModification}>
                        {this.props.t('custom-navbar-signed-as')}<p className={"accout-modify"}>{this.props.user.name}</p>
                    </Navbar.Text>
                    <Button variant="link" onClick={this.props.handleLogout}>
                        {this.props.t('custom-navbar-logout')}</Button>
                </Navbar.Collapse>
            )
        }
      return null;
    }
}