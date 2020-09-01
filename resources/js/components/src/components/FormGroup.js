import React, { useContext } from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    textFieldWidth: {
        width : '100%'
    }
}));

const FormGroup = ({ data, onChange, onSubmit, resetInput }) => {
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
                    required
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

            <div className="d-flex justify-content-between">
                <Button
                    variant="contained"
                    color="primary"
                    style={{'width': '100%'}}
                    className="mr-3"
                    type="Submit">
                    Guardar
                </Button>
                <Button
                    variant="contained"
                    style={{'width': '100%'}}
                    className="ml-3"
                    onClick={resetInput}>
                    Cancelar
                </Button>
            </div>
        </form>
    )
}

export default FormGroup;