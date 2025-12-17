import React from "react";
import ReservationSuccess from "../components/ReservationSucces";
import Header from "../components/header";
import Footer from "../components/footer";
import LoadingScreen from "../components/loading-screen";

function ReservationSuccesPage(){
    return(
        <>
        <LoadingScreen/>
        <Header/>
        <ReservationSuccess/>
        <Footer/>
        </>

    );
}
export default ReservationSuccesPage;