import React, { Component } from "react";
import Header from "../../frontend/src/components/views/Header";
import AppRouter from "./AppRouter";

class App extends Component {
    render() {
        return (
            <div>
                <Header height= {"100"} />
                <AppRouter />
            </div>
        );
    }
}

export default App;