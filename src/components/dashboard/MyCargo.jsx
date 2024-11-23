import React from "react";
import './css/admin.css';
import Title from "./title";
import StatusList from "./StatusList";
import FilialList from "./FilialList";
import Settings from "./Settings";
import Banners from "./Banners"
import LogoCargo from "./LogoCargo"
// import Contacts from "./Contacts";
const MyCargo = () => {
    const role = localStorage.getItem('role')
    return (
      
        <div className="my-cargo mainAdmin">
            <Title text="Мой карго"/>
            <div className="section-my-cargo">
                <Settings/>
                <div className="my-cargo-flex2">
                    {/* <Contacts/> */}
                </div>
            </div>
            <div className="section-my-cargo">
               
            {role === 'filial' && 
                <LogoCargo/>
            }
                <Banners/>

            </div>
            <div className="section-my-cargo">
                <StatusList/>
                <FilialList/>

            </div>


        </div>

    )
}

export default MyCargo;