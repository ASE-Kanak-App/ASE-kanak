import React from "react";
import {
    Routes,
    BrowserRouter,
    Route
} from "react-router-dom"
import Login from "./components/pages/login"
import Register from "./components/pages/register"
import MainPage from "./components/pages/mainPage";
import PostingPage from "./components/pages/postingPage";


export default class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <React.Fragment>
                        <Route path='/login' element={<Login/>} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/mainpage' element={<MainPage/>}/>
                        <Route path='/posts' element={<PostingPage/>}/>
                    </React.Fragment>
                </Routes>
            </BrowserRouter>
        )
    }
}
