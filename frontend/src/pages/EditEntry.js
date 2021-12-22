import React, {useState, useEffect} from 'react'
import EditTool from '../components/EditTool'
import axios from 'axios'
import url from '../helpers/url'
import Loading from '../components/Loading'

export default function EditEntry(props) {
    const id = props.match.params.id

    const [data, setData] = useState()

    useEffect(() => {
        async function findData() {
            const info = await axios.get(`${url.backTools}/${id}`)
            setData(info.data)
        }

        findData()
    }, [id])



    
    return (
        <>
        {data ? (
            <EditTool id={id} data={data} />
        ) : (
            <Loading />
        )}
         
        </>
    )
}
