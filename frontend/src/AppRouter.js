
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
import ProfilePage from "./components/pages/profilePage";
import UserProfilePage from "./components/pages/userprofilepage";



export default class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <React.Fragment>
                        <Route path='/register' element={<Register/>} />
                        <Route path='/mainpage' element={<MainPage/>}/>
                        <Route path='/posts' element={<PostingPage/>}/>
                        <Route path='/profile' element={<ProfilePage/>}/>
                        <Route path='/user/:id' element={<UserProfilePage/>} />
                        <Route exact path='/' element={<Login/>} />
                    </React.Fragment>
                </Routes>

            </BrowserRouter>
        )
    }
}