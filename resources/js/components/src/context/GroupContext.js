import React, { useState } from 'react'

const GroupContext = React.createContext()

const GroupProvider = ({ children }) => {
    const [group, setGroup] = useState({})

    const UpdateGroup = (group) => {
        setGroup(group)
    }

    return(
        <GroupContext.Provider
        value={{
            group,
            UpdateGroup
            }}>
            {children}
        </GroupContext.Provider>
    )
}

export default GroupContext

export { GroupProvider }