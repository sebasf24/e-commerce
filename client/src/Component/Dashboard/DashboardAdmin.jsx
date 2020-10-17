import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import NavbarAdmin from './NavbarAdmin'



const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    },

}));

export default function DashboardAdmin() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}><NavbarAdmin /></Grid>
                <br /> <br />

            </Grid>

        </div>
    )
}