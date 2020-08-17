import React, { useEffect, useState } from 'react';
import "./style.scss";
import { Helmet } from "react-helmet";
const {
    PAGE_TITLES, ROUTES
} = require(`../../../../shared/constants`);

export const Screen = ({
    history
}) => {

    return (
        <>

            <Helmet>
                <title>{PAGE_TITLES.dashboard}</title>
            </Helmet>
            <div className="container-fluid">
                <div className="content-panel">
                    <ul className="content_section">
                        <li onClick={() => history.push(ROUTES.WATCH_PARTY)}><a href="#">Content Management </a></li>
                        <li><a href="#">User Management</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}