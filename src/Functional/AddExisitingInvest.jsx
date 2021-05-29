import React, { useState } from 'react';
import { auth } from '../componets/Firebase';
import '../stylefiles/addExistingInevst.css';
import axios from 'axios';

function AddExistingInvest() {
    var [familycode, SetFamilyCode] = useState("");
    var currentUserId = auth.currentUser.uid;
    var [investorInfoList, SetInvestorInfoList] = useState([]);

    const SearchDBByfamilyCode = async (e) => {
        // If SomeOne access this Button Once Again Clear Last values
        SetInvestorInfoList([]);
         await axios.get(`https://fdproject-api.azurewebsites.net/${currentUserId}/getInvestorsFromID/${familycode}`).then(
            res => {
                SetInvestorInfoList((perv) => [...perv, ...res.data]);
            }
        );
    };
    return (
        <div className="addExist-hero">
            <input type='text' className='familycodeSearch' value={familycode} onChange={e => SetFamilyCode(e.target.value)} ></input>
            <button className="three-view-button" onClick={e => SearchDBByfamilyCode(e)}>Search</button>
            <br/><br/><br/>
            <div className="display-result-table">

                <div>{investorInfoList.map(investor =>
                    <div key={investor.id}>{investor.firstName}</div>
                )}</div>
            </div>

        </div>
    );
}
export default AddExistingInvest;