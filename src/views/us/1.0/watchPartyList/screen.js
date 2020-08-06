import React, { Component, useState, useEffect } from 'react'
const { CustomPagination } = require('../../../../components/atoms/pagination')

export const Screen = ({ listWatchParty }) => {
    useEffect(() => {
        listWatchParty(() => { }, () => { })
    }, [])
    return (
        <div>
            <h4>Content Management</h4>
        </div>)
}