import React, { useEffect, useState } from 'react';
import "./style.scss";
import { Helmet } from "react-helmet";
const {
    DASHBOARD_PAGE_LOGO,
    PAGE_TITLES,
} = require(`../../../../shared/constants`);

export const Screen = ({
}) => {
    return (
        <>
            <Helmet>
                <title>{PAGE_TITLES.dashboard}</title>
            </Helmet>
            <div className="main-panel d-flex flex-column">
                <div className="content-wrapper">
                   
                    <div className="row text-center align-items-center py-3 py-md-5 mt-2 mt-md-5">
                        <div className="col-12">
                            <figure>
                                <img src={DASHBOARD_PAGE_LOGO} alt={'dashboard-logo'} className="img-fluid" />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}