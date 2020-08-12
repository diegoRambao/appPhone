import React, { useContext } from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    textFieldWidth: {
        width : '100%'
    }
}));

const FormGroup = ({ data, onChange, onSubmit }) => {
    const classes = useStyles();
    return(
        <form  autoComplete="off" onSubmit={onSubmit}>
            <input hidden name="id" value={data.id}></input>
            <div className="form-group">
                <TextField
                    onChange={onChange}
                    name="name"
                    value={data.name || ''}
                    label="Nombre"
                    variant="outlined"
                    className={classes.textFieldWidth}/>
            </div>
            <div className="form-group">
                <TextField
                    label="Nota"
                    multiline
                    onChange={onChange}
                    value={data.notes || ''}
                    name="notes"
                    rows={4}
                    variant="outlined"
                    className={classes.textFieldWidth}
                />
            </div>

            <div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.textFieldWidth}>
                    Guardar
                </Button>
            </div>
        </form>
    )
}

export default FormGroup;