import React, { useState } from 'react'
import TableGroup from './TableGroup'
import { Paper, Typography, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import config from '../services/config'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
}));

const TableGroupContainer = ({ loading, groups, fetchData }) => {
    const classes = useStyles();
    const [group, setGroup] = useState([]);

    const deleteGroup = async(group) => {
        if (window.confirm(`¿Estas seguro que quieres eliminar "${group.name}"?`)) {
            const result = await axios.delete(`${config.API}group/${group.id}`)
            fetchData()
            alert('Dato Eliminado')
        }
    }

    return(
        <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
                Lista de Grupos
            </Typography>
            {
                !loading
                ? <div>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    </div>
                : <TableGroup
                    groups={groups}
                    deleteGroup={deleteGroup}
                />
            }
        </Paper>
    )
}

export default TableGroupContainer;