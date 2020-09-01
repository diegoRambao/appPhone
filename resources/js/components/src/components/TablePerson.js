import React, { useContext, useState } from 'react'
import { Button, Icon, makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PersonContext from '../context/PersonContext'
import SimpleSnackbar from '../components/Snackbar'

const useStyles = makeStyles((theme) => ({
    buttonOption: {
        margin: theme.spacing(1),
    },
    spanBold: {
        fontWeight : "bold"
    }
}));

const columns = [
    {id: 'id', label: 'ID'}
]

const TablePerson = ({ people, deletePerson }) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openSnack, setOpenSnack] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenSnack = () => {
        setOpenSnack(true)
    }

    const cutWord = (word) => {
        word = word.toString()
        if(word.length >= 25){
            let croppedWord = word.substr(0, 22)
            let concatenatedWord = croppedWord.concat('...')
            return concatenatedWord
        }
        return word;
    }

    const { UpdatePerson } = useContext(PersonContext)
    return(
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                            <TableCell key='name'>
                                Nombre
                            </TableCell>
                            <TableCell key='phone'>
                                Telefonos
                            </TableCell>

                            <TableCell key='acciones'>
                                Acciones
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {people.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((person)=> {
                            return(
                                <TableRow key={person.id}>
                                    <TableCell key={person.id}>
                                        { person.id }
                                    </TableCell>
                                    <TableCell key={"name"+person.id}>
                                        { cutWord(`${person.name} ${person.surname || ''}`) }
                                    </TableCell>
                                    <TableCell key={"phone"+person.id}>
                                    {person.phones.map(phone => {
                                        return(
                                            <div key={phone.id}>
                                                <span>{phone.number}</span>
                                            </div>
                                        )
                                    })}
                                    </TableCell>
                                    <TableCell key={"action"+person.id}>
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
                                        <CopyToClipboard text={`${person.name} ${person.surname || ''}`}>
                                            <Button  color="inherit" className={classes.buttonOption} onClick={handleOpenSnack}>
                                                <Icon>content_copy</Icon>
                                            </Button>
                                        </CopyToClipboard>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage='Filas por página'
                component="div"
                count={people.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <SimpleSnackbar message="Nombre Copiado" open={openSnack} setOpenSnack={setOpenSnack}/>
        </div>

    )
}

export default TablePerson;