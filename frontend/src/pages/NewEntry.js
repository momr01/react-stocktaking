import React, {useState, useEffect} from 'react'
import AddNew from '../components/AddNew'
import FormReport from '../components/FormReport'

export default function NewEntry(props) {
    const type = props.match.params.type

    const [tool, setTool] = useState(false)
    const [report, setReport] = useState(false)

    useEffect(()=> {
        const isType = () => {
            switch (type) {
                case "tool":
                    setTool(true)
                    setReport(false)
                    break;
                case "report":
                    setTool(false)
                    setReport(true)
                    break;
                default:
                    setTool(false)
                    setReport(false)
                    break;
            }
        }
        isType()
    }, [type])

    return (
        <>
        {tool && (
            <AddNew />
        )}

        {report && (
            <FormReport />
        )}
         
        </>
    )
}
