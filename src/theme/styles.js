
export const styles = {
    commonStyles: {
        boxSizing: 'border-box'
    },
    screenHocContainer: {
        flexDirection: 'row',
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    screenContentContainer: {
        width: '100%',
        paddingTop: '90px'
    },
    goBackText: {
        color: 'darkgrey',
        cursor: 'pointer'
    },
    screenName: {
        fontWeight: 500,
        fontSize: 24
    },
    loginPage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    loginInputs: {
        border: '1px solid #522da8',
        borderRadius: '6px',
        fontSize: '16px',
        padding: '12px 16px',
        lineHeight: 1
    },
    loginButton: {
        minWidth: '230px',
        backgroundColor: '#3a81fa',
        color: '#fff',
        fontSize: '19px',
        borderRadius: '30px',
    },
    submitButton: {
        minWidth: '150px',
        backgroundColor: '#3a81fa',
        color: '#fff',
        padding: '8px 10px',
        fontSize: '19px',
        borderRadius: '30px',
        marginTop: '30px'
    },
    disabledButton: {
        minWidth: '150px',
        backgroundColor: '#8f8c8c',
        color: '#fff',
        boxShadow: '0px 4px 23.04px 0.96px rgba(66, 141, 252, 0.28)',
        padding: '8px 10px',
        fontSize: '19px',
        cursor: 'not-allowed',
        borderRadius: '30px',
        marginTop: '30px'
    },

    activePageStyle: {
        backgroundColor: 'white'
    },

    hasError: {
        border: '1px solid red',
        borderRadius: '6px',
        fontSize: '16px',
        lineHeight: 1
    },
};
