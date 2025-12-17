import React from "react";
import LoginPanel from "../components/login";
import Header from "../components/header";
import Footer from "../components/footer";
import LoadingScreen from "../components/loading-screen";

function LoginPage(){
    return(
        <>
        <LoadingScreen/>
        <Header/>
        <LoginPanel/>
        <Footer/>
        </>

    );
}
export default LoginPage;