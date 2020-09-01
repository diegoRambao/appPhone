import React, { useState, useContext, useEffect } from 'react'
import FormGroup from './FormGroup'
import GroupContext from '../context/GroupContext'
import { Paper, Typography, makeStyles } from '@material-ui/core';
import config from '../services/config'
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
}));

const FormGroupContainer = ({ fetchData }) => {

    const classes = useStyles();
    const [data, setData] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const { group, UpdateGroup } = useContext(GroupContext);

    const handleChange = (e) => {
        setData({...data, [e.target.name] : e.target.value})
    }

    const resetInput = () => {
        setData({});
        UpdateGroup({})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            let response;
            if(!data.id){
                response = await axios.post(`${config.API}group`, data)
            }else{
                response = await axios.put(`${config.API}group/${data.id}`, data)
            }
            fetchData()
            resetInput()
            setShowAlert(true)
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            console.log(error)
        }

    }
    const getGroupById = async(group) => {
        const result = await axios(`${config.API}group/${group.id}`)
        setData(result.data)
    }

    useEffect(() => {
        getGroupById(group)
    },[group]);

    return (
        <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
                Crear un Grupo
            </Typography>

            <div className="mt-3">
            {
                showAlert ?
                <Alert severity="success" className="mb-3">¡Datos Guardados con exito!</Alert>
                : null
            }
                <FormGroup data={data} onChange={handleChange} onSubmit={handleSubmit} resetInput={resetInput}/>
            </div>
        </Paper>
    )
}

export default FormGroupContainer;