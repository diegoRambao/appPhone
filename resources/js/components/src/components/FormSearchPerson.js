import React from 'react'
import { TextField, Button, Icon, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formSearch: {
        display: 'flex',
        alignItems: 'center'
    },
    textSearch: {
        margin: theme.spacing(1),
    },
    spaceButton:{
        margin: theme.spacing(1)
    }
}));

const FormSearchPerson = ({ handleChange, formSearch, handleSubmit, handleRefresh }) => {
    const classes = useStyles();
    return(
        <form className={classes.formSearch} onSubmit={handleSubmit}>
            <TextField
                id="first"
                label="Firts Num"
                variant="outlined"
                value={formSearch.firstNum}
                name='firstNum'
                onChange={handleChange}
                className={classes.textSearch}
            />

            <TextField
            id="second"
            label="Second Num"
            value={formSearch.secondNum}
            variant="outlined"
            name='secondNum'
            onChange={handleChange}
            className={classes.textSearch}
            />

            <Button
                variant="contained"
                color="primary"
                type='submit'>
                    <Icon>search</Icon>
            </Button>
            <Button
                className={classes.spaceButton}
                variant="contained"
                color="primary"
                onClick={handleRefresh}>
                    <Icon>refresh</Icon>
            </Button>
        </form>
    )
}


export default FormSearchPerson;