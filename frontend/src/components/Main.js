import React , {useState, useEffect} from 'react'
import axios from 'axios'

function Main() {

    const [msg, setMsg] = useState({})

    useEffect(() => {
        axios.get('http://localhost:5000/flask/main')
        .then(response => {
            console.log("SUCCESS", response)
            setMsg(response)
        }).catch(error => {
            console.log(error)
        })
    }, [])


    return (
        <div>
            <div>{msg.status === 200 ?
            <h3>{msg.data.message}</h3>
        :
        <h3> LOADING </h3>}

            </div>
        </div>
    );
}

export default Main;