import React, { useState, useEffect } from 'react'
import config from '../services/config'
import TablePersonContainer from '../components/TablePersonContainer'
import FormPersonContainer from '../components/FormPersonContainer'
import { PersonProvider } from '../context/PersonContext'

const Home = () => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPeople = async() => {
        const result = await axios(`${config.API}person`)
        setPeople(result.data)
        setLoading(true)
    }
    return(
        <PersonProvider>
            <main>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-8">
                            <TablePersonContainer
                                people={people}
                                setPeople={setPeople}
                                loading={loading}
                                fetchPeople={fetchPeople}
                            />
                        </div>
                        <div className="col-md-4">
                            <FormPersonContainer fetchPeople={fetchPeople}/>
                        </div>
                    </div>
                </div>
            </main>
        </PersonProvider>
    )
}

export default Home;