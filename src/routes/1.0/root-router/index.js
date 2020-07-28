import React from 'react';
import {
    BrowserRouter,
} from 'react-router-dom';

import { connect } from 'react-redux';
import AuthRouter from '../auth-router';
import AuthenticatedRouter from '../authenticated';
import { Loader } from '../../../components/atoms/loader';

export const MainRouter = (props) => {
    const { userToken, loader } = props;
    return (
        <BrowserRouter>
            {loader && <Loader />}
            {userToken
                ? <AuthenticatedRouter {...props} />
                : <AuthRouter {...props} />}
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken,
        platformType: state.CommonReducer.platformType,
        loader: state.CommonReducer.loader
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export const RootRouter = connect(mapStateToProps, mapDispatchToProps)(MainRouter);