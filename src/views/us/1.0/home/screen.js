import React, { useEffect, useState } from 'react';
import "./style.scss";
import { Helmet } from "react-helmet";
const { defaultConfig: { PLATFORM } } = require(`../../../../config/default`);
const { CountTeller } = require(`../../../../components/atoms/count-teller`);
const {
    DASHBOARD_PAGE_LOGO,
    ROLE_STATS_ICONS,
    PAGE_TITLES,
    SUB_ADMIN_PLATFORM
} = require(`../../../../shared/constants`);

export const Screen = ({
    platformType,
    fetchAllUsersStats,
    fetchChampionshipUserStats,
    championshipUserStat,
}) => {

    useEffect(() => {
        platformType === SUB_ADMIN_PLATFORM ? fetchChampionshipUserStats() : fetchAllUsersStats()
            ;
    }, []);

    return (
        <>
            <Helmet>
                <title>{PAGE_TITLES.dashboard}</title>
            </Helmet>
            <div className="main-panel d-flex flex-column">
                <div className="content-wrapper">
                    <div className="row align-items-center das_blocks">
                        {championshipUserStat && championshipUserStat.length && championshipUserStat.map((item, index) => (
                            <CountTeller
                                tellerIcon={ROLE_STATS_ICONS[item.role - 1]}
                                count={item.total}
                                title={`Total ${item.label}${index < 3 ? 's' : ''}`} />
                        ))}
                    </div>
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