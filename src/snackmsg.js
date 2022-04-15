import React from 'react';

import {Snackbar} from '@material-ui/core';

const SnackbarMsg = (props) => {
    return (
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose} message={props.message}></Snackbar>
    );
}

export default SnackbarMsg;