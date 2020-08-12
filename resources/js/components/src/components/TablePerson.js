import React, { useContext } from 'react'
import { Button, Icon, makeStyles } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PersonContext from '../context/PersonContext'

const useStyles = makeStyles((theme) => ({
    buttonOption: {
        margin: theme.spacing(1),
    },
    spanBold: {
        fontWeight : "bold"
    }
}));

const TablePerson = ({ people, deletePerson }) => {
    const classes = useStyles();

    const { UpdatePerson } = useContext(PersonContext)
    return(
        <table className="table mt-5">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Telefonos</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
        {
            people.map(person => (
                <tr key={person.id}>
                    <th scope="row">{person.id}</th>
                    <td className={classes.spanBold}>{person.name} {person.surname}</td>
                    <td>
                        {person.phones.map(phone => {
                            return(
                                <div>
                                    <span className={classes.spanBold}>{phone.number}</span>
                                </div>
                            )
                        })}
                    </td>
                    <td>
                        <Button
                            color="inherit"
                            className={classes.buttonOption}
                            onClick={() => deletePerson(person)}>
                            <Icon>delete</Icon>
                        </Button>
                        <Button
                            color="inherit"
                            className={classes.buttonOption}
                            onClick={() => UpdatePerson(person)}>
                            <Icon>create</Icon>
                        </Button>
                        <CopyToClipboard text={person.name + ' ' + person.surname}>
                            <Button  color="inherit" className={classes.buttonOption}>
                                <Icon>content_copy</Icon>
                            </Button>
                        </CopyToClipboard>
                    </td>
                </tr>
            ))
        }
        </tbody>
        </table>
    )
}

export default TablePerson;