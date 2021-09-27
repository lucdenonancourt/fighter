import React, {useContext} from "react";
import {Button, Container, Navbar, Dropdown, DropdownButton} from "react-bootstrap";
// @ts-ignore
import logo from "./logo-fighter.svg";
import "./CustomNavbar.css"
import {useTranslation} from "react-i18next";
// @ts-ignore
import UserContext from './UserContext'
import {User} from "./User";

export default function CustomNavbar(props : any) {

    const user : User = useContext(UserContext)

    const { t } = useTranslation();
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
                    {t('app-name')}
                    <DropdownButton id="dropdown-basic-button" title="Version">
                        <Dropdown.Item onClick={() => props.changeVersion('fighter')}>Fighter</Dropdown.Item>
                        <Dropdown.Item onClick={() => props.changeVersion('worker')}>Worker</Dropdown.Item>
                    </DropdownButton>
                </Navbar.Brand>
                {renderAccountInformation(props, user, t)}
            </Container>
        </Navbar>
    )

}
    /**
     * Small bloc that will be displayed if the user is connected. This allow us to keep a render function as generic as possible
     * @returns {JSX.Element|null}
     */
function renderAccountInformation(props: any, user: User, t: typeof useTranslation){
    if (Object.keys(user).length !== 0) {
        return (
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text onClick={props.handleAccountModification}>
                    {t('custom-navbar-signed-as')}<p className={"accout-modify"}>{user.name}</p>
                </Navbar.Text>
                <Button variant="link" onClick={props.handleLogout}>
                    {t('custom-navbar-logout')}</Button>
            </Navbar.Collapse>
        )
    }
}