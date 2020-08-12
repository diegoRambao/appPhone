import React, { useState, useEffect, useContext } from 'react'
import { Paper, Typography, makeStyles } from '@material-ui/core'
import config from '../services/config'
import Alert from '@material-ui/lab/Alert'
import FormPerson from './FormPerson'
import PersonContext from '../context/PersonContext'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }
}));

const FormPersonContainer = ({ fetchPeople }) => {

    const classes = useStyles();
    const [showAlert, setShowAlert] = useState(false);
    const [groups, setGroups] = useState([]);
    const [data, setData] = useState([]);
    const [phone, setPhone] = useState([]);
    const { person } = useContext(PersonContext);

    const handleChange = (e) => {
        setData({...data, [e.target.name] : e.target.value})
    }

    const addChip = value => {
        const chips = phone.slice();
        chips.push(value);
        setPhone(chips)
    };
    const removeChip = (chip,index) => {
        const chips = phone.slice();
        chips.splice(index, 1);
        setPhone(chips)
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        data.phones = phone;
        try {
            let response;
            if(!data.id){
                response = await axios.post(`${config.API}person`, data)
            }else{
                response = await axios.put(`${config.API}person/${data.id}`, data)
            }
            resetInput()
            fetchPeople()
            setShowAlert(true)
            setTimeout(() => setShowAlert(false), 3000);
        } catch (error) {
            console.log(error)
        }
    };

    const resetInput = () => {
        setData({name: '', surname: '', group_id: ''});
        setPhone([])
    }

    const getPersonById = async(person) => {
        const result = await axios(`${config.API}person/${person.id}`)
        await setData(result.data)
        const phones = result.data.phones
        let phoneArray = []
        phones.forEach((phone) => {
            phoneArray.push(phone.number)
        })
        await setPhone(phoneArray)
    }

    const fetchGroup = async() => {
        const result = await axios(`${config.API}group`)
        setGroups(result.data)
    }

    useEffect(() => {
        fetchGroup()
        getPersonById(person)
    }, [person]);

    return(
        <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
                Crear Miembro
            </Typography>

            <div className="mt-3">
                {
                    showAlert ?
                    <Alert severity="success" className="mb-3">¡Datos guardados con exito!</Alert>
                    : null
                }
                <FormPerson
                    groups={groups}
                    onChange={handleChange}
                    data={data}
                    addChip={addChip}
                    removeChip={removeChip}
                    phone={phone}
                    handleSubmit={handleSubmit}
                    />
            </div>
        </Paper>
    )
}

export default FormPersonContainer