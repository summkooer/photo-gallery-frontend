import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router";

import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function Main(props) {
    const { isLoggedIn, handleLoggedIn } = props; //通过props拿到isLoggedIn,handleLoggedIn

    const showLogin = () => {
        //case 1 : isLoggedIn -> show Home
        //case 2 : not isLoggedIn -> show LogIn
        return isLoggedIn ? (
            <Redirect to="/home" /> //LogIn成功，跳转到Home组件
        ) : (
            <Login handleLoggedIn={handleLoggedIn} />//LogIn失败，跳回到LogIn页面
        );
    };

    const showHome = () => {
        //case 1 : isLoggedIn -> show Home
        //case 2 : not isLoggedIn -> show LogIn
        return isLoggedIn ? <Home /> : <Redirect to="/login" />;
    };
    return (
        <div className="main">
            <Switch>
                <Route path="/" exact render={showLogin} /> //exact 完全匹配
                <Route path="/login" render={showLogin} />
                <Route path="/register" component={Register} />
                <Route path="/home" render={showHome} />
            </Switch>
        </div>
    );
}

export default Main;