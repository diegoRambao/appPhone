import React, { useContext } from 'react'
import { Icon, Button, makeStyles, TablePagination, TableContainer, Table, TableBody, TableCell, TableHead, TableRow      } from '@material-ui/core';
import GroupContext from '../context/GroupContext'

const useStyles = makeStyles((theme) => ({
    buttonOption: {
        margin: theme.spacing(1),
    }
}));

const columns = [
    {id: 'id', label: 'ID'},
    {id: 'name', label: 'Nombre'},
    {id: 'notes', label: 'Nota'},
]

const TableGroup = ({ groups, deleteGroup }) => {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { UpdateGroup } = useContext(GroupContext)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const cutWord = (word) => {
        word = word.toString()
        if(word.length >= 25){
            let croppedWord = word.substr(1, 22)
            let concatenatedWord = croppedWord.concat('...')
            return concatenatedWord
        }
        return word;
    }
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
                            <TableCell key='acciones'>
                                Acciones
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((group) => {
                            return(
                                <TableRow key={group.id}>
                                    {columns.map((column) => {
                                        const value = group[column.id]
                                        return(
                                            <TableCell key={column.id}>
                                                {cutWord(value)}
                                            </TableCell>
                                        )
                                    })}
                                    <TableCell key='acciones'>
                                        <Button
                                            color="inherit"
                                            className={classes.buttonOption}
                                            onClick={() => deleteGroup(group)}>
                                            <Icon>delete</Icon>
                                        </Button>
                                        <Button
                                            color="inherit"
                                            className={classes.buttonOption}
                                            onClick={() => UpdateGroup(group)}>
                                            <Icon>create</Icon>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage='Filas por página'
                component="div"
                count={groups.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default TableGroup;