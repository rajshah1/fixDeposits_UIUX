import React, { useState } from 'react';
import { auth, firestore } from '../componets/Firebase';
import '../stylefiles/addExistingInevst.css';
import axios from 'axios';

function AddExistingInvest() {
    var [familycode, SetFamilyCode] = useState("");
    var [currentUserId, SetcurrentUserId] = useState(auth.currentUser.uid);
    var [investObject, SetInvestObject] = useState(null);
    var [investorInfoList, SetInvestorInfoList] = useState([]);

    

    

    const SearchDBByfamilyCode = async(e) => {
        var responseData= await axios.get(`https://fdproject-api.azurewebsites.net/${currentUserId}/getInvestorsFromID/${familycode}`).then(
            res=>{
                SetInvestorInfoList((perv)=>[...perv,...res.data]);
            }
        );
        //console.log(responseData.data);
        //SetInvestorInfoList((perv)=>[...perv,...responseData.data]);
    };
    return (
        <div className="addExist-hero">
            <input type='text' className='familycodeSearch' value={familycode} onChange={e => SetFamilyCode(e.target.value)} ></input>
            <button className="three-view-button" onClick={e => SearchDBByfamilyCode(e)}>Search</button>
            
            <div>{investorInfoList.map(investor=>
                <div key={investor.id}>{investor.firstName}</div>
            )}</div>

            
        </div>
    );
}
export default AddExistingInvest;