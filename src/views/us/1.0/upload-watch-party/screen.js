import React, { useEffect, useState } from 'react';
import { FieldArray, reduxForm, Field } from "redux-form";
import validator from './validator'
import { connect } from 'react-redux';
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { UploadForm } = require('./form')
const { onSubmitFail, convertToESTTimeZone, diff_minutes } = require(`../../../../helpers`);
const { Form } = require(`../../../../components/atoms/form`);
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const { ROUTES, PAGE_TITLES } = require(`../../../../shared/constants`);

const UploadScreen = ({ allPlatforms, history, exportWatchParty, allLeagues, getLeagues, uploadImage, getPlatforms, handleSubmit = () => { } }) => {
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });

    const onsubmit = (credentials) => {

        if (credentials && credentials.WatchParty && credentials.WatchParty.length > 0) {

            let data = credentials.WatchParty.map(party => {
                let startTime = new Date(new Date(party.startTime).setSeconds(0, 0));
                let endTime = new Date(new Date(party.endTime).setSeconds(0, 0));
                return ({
                    ...party,
                    contentLength: diff_minutes(startTime, endTime),
                    startTime: convertToESTTimeZone(startTime),
                    endTime: convertToESTTimeZone(endTime),
                    league: party && party.league && party.league.value,
                    platform: party.platform.value,
                    sports: party.sports.value === 'Yes' ? true : false,
                })

            })
            exportWatchParty(data, (response) => {
                setSnackBarData({
                    variant: response.status ? 'success' : 'error',
                    message: response.msg
                });
                setOpenSnackbar(true)
                history.push(ROUTES.WATCH_PARTY)
            }, (error) => {
                setSnackBarData({
                    variant: error.status ? 'success' : 'error',
                    message: error.msg
                });
                setOpenSnackbar(true)
            })
        }
    }
    useEffect(() => {
        getLeagues(() => { }, () => { })
        getPlatforms(() => { }, () => { })
    }, [])
    return (
        <div class="container-fluid">
            <div class="content-panel">
                <SnackbarWrapper
                    visible={openSnackBar}
                    onClose={() => setOpenSnackbar(false)}
                    variant={snackbarData.variant}
                    message={snackbarData.message}
                />
                <div class="page-title"><h4>{PAGE_TITLES.ADD_WATCH_PARTY}</h4></div>

                <Form onSubmit={handleSubmit(onsubmit)}>
                    <FieldArray
                        name="WatchParty"
                        component={UploadForm}
                        allLeagues={allLeagues}
                        allPlatforms={allPlatforms}

                        uploadImage={uploadImage}
                    />
                    <InputSubmit buttonLabel={'Upload'} />
                </Form>
            </div>
        </div>
    )
}

const ReduxFunction = reduxForm({
    form: "uploadWatchParty",
    fields: ['parties'],
    // onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(UploadScreen);

const mapStateToProps = (state, ownProps) => {
    return {
        values: state && state.form && state.form.uploadWatchParty && state.form.uploadWatchParty.values && state.form.uploadWatchParty.values.WatchParty
    }
}

const mapDispatchToProps = (state, props) => {
    return {}
}
export const Screen = connect(mapStateToProps, mapDispatchToProps)(ReduxFunction);

