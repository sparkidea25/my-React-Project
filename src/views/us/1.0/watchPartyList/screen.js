import React, { Component, useState, useEffect } from 'react'
const { CustomPagination } = require('../../../../components/atoms/pagination')

export const Screen = ({ listWatchParty, getPlatforms, getLeagues, allPlatforms, allLeagues }) => {

    useEffect(() => {
        listWatchParty(() => { }, () => { })
        getPlatforms(() => { }, () => { })
        getLeagues(() => { }, () => { })

    }, [])
    return (
        <div class="container-fluid">
            <div class="content-panel">
                <div class="page-title">
                    <h1>Content Management</h1>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <th></th>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    )
}