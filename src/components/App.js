
import React, { useState } from "react";
import TopBar from "./TopBar";
import Main from "./Main";

import { TOKEN_KEY } from "../constants";
import "../styles/App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem(TOKEN_KEY) ? true : false
    );

    const logout = () => {
        console.log("log out");
        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
    };


    //这个函数是用来接收回传回来的token
    const loggedIn = (token) => {
        if (token) {
            //window.localStorage.setItem(key, value) write
            localStorage.setItem(TOKEN_KEY, token);//import from constants
            setIsLoggedIn(true);
        }
    };
    return (
        <div className="App">
            <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} />
            <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
        </div>
    );
}
export default App;

