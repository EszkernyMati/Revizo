import React from "react";
import ReservationPanel from "../components/Reservation";
import Header from "../components/header";
import Footer from "../components/footer";
import LoadingScreen from "../components/loading-screen";

function ReservationPage(){
    return(
        <>
        <LoadingScreen/>
        <Header/>
        <ReservationPanel/>
        <Footer/>
        </>

    );
}
export default ReservationPage;