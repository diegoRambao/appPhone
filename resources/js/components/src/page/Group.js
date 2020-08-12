import React, { useState, useEffect } from 'react'
import FormGroupContainer from '../components/FormGroupContainer'
import TableGroupContainer from '../components/TableGroupContainer'
import config from '../services/config'
import { GroupProvider } from '../context/GroupContext'

const Group = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async() => {
        const result = await axios(`${config.API}group`)
        setGroups(result.data)
        setLoading(true)
    }

    useEffect(() => {
        fetchData()
    }, []);

    return(
        <GroupProvider>
            <main>
                <div className="container">
                <div className="row mt-5">
                    <div className="col-md-8">
                        <TableGroupContainer
                            groups={groups}
                            loading={loading}
                            fetchData={fetchData}
                        />
                    </div>
                    <div className="col-md-4">
                        <FormGroupContainer fetchData={fetchData}/>
                    </div>
                </div>
                </div>
            </main>
        </GroupProvider>
    )
}

export default Group;