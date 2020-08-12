import React, { useState } from 'react'

const PersonContext = React.createContext()

const PersonProvider = ({ children }) => {
    const [person, setPerson] = useState({})

    const UpdatePerson = (person) => {
        setPerson(person)
    }

    return(
        <PersonContext.Provider
        value={{
            person,
            UpdatePerson
            }}>
            {children}
        </PersonContext.Provider>
    )
}

export default PersonContext

export { PersonProvider }