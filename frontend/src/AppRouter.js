import React from "react";
import {
    Routes,
    BrowserRouter,
    Route
} from "react-router-dom"
import Login from "./components/pages/login"
import Register from "./components/pages/register"


export default class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <React.Fragment>
                        <Route path='/login' element={<Login/>} />
                        <Route path='/register' element={<Register/>} />
                    </React.Fragment>
                </Routes>
            </BrowserRouter>
        )
    }
}