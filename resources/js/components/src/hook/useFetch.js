import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (method, endpoint, body) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios({
                    method: method,
                    headers: {
                        'content-type': 'application/json',
                        accept: 'application/json'
                    },
                    data: body && JSON.stringify(body),
                    url : endpoint
                })
                setData(result.data)
                setLoading(true)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, []);

    return { data, loading }
}

export default useFetch;