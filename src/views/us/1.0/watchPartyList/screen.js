import React, { Component, useState, useEffect } from 'react'
const { CustomPagination } = require('../../../../components/atoms/pagination')

export const Screen = ({ listWatchParty }) => {
    useEffect(() => {
        listWatchParty(() => { }, () => { })
    }, [])
    return (
        <div class="container-fluid">
            <div class="content-panel">
                <div class="page-title">
                    <h1>Content Management</h1>
                </div>
                <div class="table-responsive">
                    <table class="table">

                    </table>
                </div>
            </div>
        </div>
    )
}