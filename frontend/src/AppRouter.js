import React from "react";
import {
    Routes,
    BrowserRouter,
    Route
} from "react-router-dom"
import Login from "./login"


export default class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <React.Fragment>
                        <Route path='/login' element={<Login/>} />
                    </React.Fragment>
                </Routes>
            </BrowserRouter>
        )
    }
}