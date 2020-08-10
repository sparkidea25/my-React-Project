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
                            <th>Show</th>
                            <th>Host</th>
                            <th>Sports</th>
                            <th>League</th>
                            <th>Platform</th>
                            <th>Month</th>
                            <th>Date</th>
                            <th>Time (EST).</th>
                            <th>Content lenght</th>
                            <th>Joined</th>
                            <th>Intrested </th>
                            <th></th>
                        </thead>
                        <tbody>
                            <td><div class="input_field"><input type="text" placefolder="Content Name" /></div></td>
                            <td><div class="input_field"><input type="text" placefolder="Host Name" /></div></td>
                            <td>
                                <div class="input_field">
                                    <select>
                                        <option>Select</option>
                                        <option>Yes</option>
                                        <option>No</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div class="input_field">
                                    <select>
                                        <option>Select</option>
                                        <option>TNT</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div class="input_field">
                                    <select>
                                        <option>Select</option>
                                        <option>Jan</option>
                                        <option>Feb</option>
                                    </select>
                                </div>
                            </td>
                            <td><div class="input_field"><input type="date" /></div></td>
                            <td><div class="input_field"><input type="time" /></div></td>
                            <td><div class="input_field"><input type="number" /></div></td>
                            <td><div class="input_field"><input type="number" /></div></td>
                            <td><button class="btn btn-sm btn-primary"></button></td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}