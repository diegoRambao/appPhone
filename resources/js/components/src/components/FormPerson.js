import React, { Fragment, useEffect, useState } from 'react'
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, makeStyles } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

const useStyles = makeStyles((theme) => ({
    textFieldWidth: {
        width : '100%'
    }
}));

const FormPerson = ({ groups, onChange, data, addChip, phone, handleSubmit, removeChip, resetInput }) => {
    const classes = useStyles();

    return(
        <form  autoComplete="off" onSubmit={handleSubmit}>
            <input hidden name="id" value={data.id}></input>
            <div className="form-group">
                <TextField
                    label="Nombre"
                    variant="outlined"
                    onChange={onChange}
                    value={data.name || ''}
                    name="name"
                    required
                    className={classes.textFieldWidth}/>
            </div>
            <div className="form-group">
                <TextField
                    label="Apellidos"
                    variant="outlined"
                    onChange={onChange}
                    value={data.surname || ''}
                    name="surname"
                    className={classes.textFieldWidth}/>
            </div>
            <div className="form-group">

                <FormControl variant="outlined" className={classes.textFieldWidth}>
                    <InputLabel id="demo-simple-select-outlined-label">Grupo</InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Grupo"
                    name="group_id"
                    onChange={onChange}
                    value={data.group_id || ''}
                    >

                    {
                        groups.map(group => {
                            return <MenuItem value={group.id} key={group.id}>{group.name}</MenuItem>
                        })
                    }
                    </Select>
                </FormControl>
            </div>
            <div className="form-group">
            <ChipInput
                label='Telefonos'
                value={phone || []}
                onAdd={value => addChip(value)}
                onDelete={(chip, index) => removeChip(chip, index)}
                className={classes.textFieldWidth}
                variant='outlined'
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

export default FormPerson;