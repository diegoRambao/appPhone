import React, { useEffect, useState } from 'react'
import { Paper, Typography, makeStyles, TextField } from '@material-ui/core'
import FormSearchPerson from './FormSearchPerson'
import Skeleton from '@material-ui/lab/Skeleton'
import TablePerson from './TablePerson'
import config from '../services/config'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    textSearch: {
        width: '80%'
    }
}));

const TablePersonContainer = ({ people, loading, fetchPeople, setPeople, setLoading }) => {
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
        setLoading(false)
        e.preventDefault()
        const response = await axios.post(`${config.API}personByNum`, formSearch)
        setPeople(response.data)
        setLoading(true)
    }

    const handleSearchName = async(e) => {
        setLoading(false)
        try {
            if(!e.target.value){
                fetchPeople()
            }
            const response = await axios.post(`${config.API}personByName`, {'value' : e.target.value})
            await setPeople(response.data)
            setLoading(true)
        } catch (error) {
            console.log(error)
        }
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

            <div className="mt-2">
                <TextField
                    id="search"
                    label="Buscar"
                    variant="outlined"
                    name='search'
                    onChange={handleSearchName}
                    className={classes.textSearch}
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