import React, { useEffect, useState } from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core'
import FormSearchPerson from './FormSearchPerson'
import Skeleton from '@material-ui/lab/Skeleton'
import TablePerson from './TablePerson'
import config from '../services/config'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
}));

const TablePersonContainer = ({ people, loading, fetchPeople, setPeople }) => {
    const classes = useStyles();
    const [formSearch, setFormSearch] = useState([]);

    const deletePerson = async(person) => {
        if (window.confirm(`¿Estas seguro que quieres eliminar "${person.name}"?`)) {
            const result = await axios.delete(`${config.API}person/${person.id}`)
            fetchPeople()
        }
    }

    const handleChangeSearch = (e) => {
        setFormSearch({...formSearch, [e.target.name] : e.target.value})
    }

    const handleSubmitSearch = async(e) => {
        e.preventDefault()
        const response = await axios.post(`${config.API}personByNum`, formSearch)
        setPeople(response.data)
    }

    const handleRefresh = () => {
        fetchPeople()
    }

    useEffect(() => {
        fetchPeople()
    }, []);


    return(
        <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
                Listado de Numeros
            </Typography>

            <div className="mt-5">
                <FormSearchPerson
                    handleChange={handleChangeSearch}
                    formSearch={formSearch}
                    handleSubmit={handleSubmitSearch}
                    handleRefresh={handleRefresh}
                />
            </div>
            {
                !loading
                ? <div>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    <Skeleton animation="wave"/>
                    </div>
                : <TablePerson people={people} deletePerson={deletePerson}/>
            }
        </Paper>
    )
}

export default TablePersonContainer