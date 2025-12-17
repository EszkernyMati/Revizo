import React from "react";
import ControlPanel from "../components/controlPanel";
import Header from "../components/header";
import Footer from "../components/footer";
import LoadingScreen from "../components/loading-screen";

function ControlPage(){
    return(
        <>
        <LoadingScreen/>
        <Header/>
        <ControlPanel/>
        <Footer/>
        </>

    );
}
export default ControlPage;