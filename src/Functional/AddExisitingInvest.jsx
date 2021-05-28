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
        firestore.collection(currentUserId).where("familyCode","==",familycode).get().then((e)=>{e.})
        var responseData=await axios.get(`http://localhost:8080/${currentUserId}/getInvestorsFromID/${familycode}`);
        console.log(responseData.data);
        SetInvestorInfoList((perv)=>[...perv,...responseData.data]);

        console.log(investorInfoList);
        

    };
    return (
        <div className="addExist-hero">
            <input type='text' className='familycodeSearch' value={familycode} onChange={e => SetFamilyCode(e.target.value)} ></input>
            <button className="three-view-button" onClick={e => SearchDBByfamilyCode(e)}>Search</button>
        </div>
    );
}
export default AddExistingInvest;