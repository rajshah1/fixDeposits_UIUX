import React,{useState,useEffect} from 'react';
import '../stylefiles/dashboard.css';
import  firebase,{auth} from '../componets/Firebase';
import addImage from '../plus.svg';
import removeImage from '../delete.svg';
import updateImage from '../update.svg';
import printImage from '../print.svg';
import viewImage from '../marketing.svg';
import {Link} from 'react-router-dom';

function Dashboard(){
    
    var [username,Setusername]=useState('Guest');
    useEffect(()=>{
    },[]);
    //change this in prod to !=
    if(auth.currentUser==null){
            
        //    console.log(auth.currentUser.email);
            firebase.firestore().collection("users").doc(auth.currentUser.email).get()
            .then((DocumentType)=>{Setusername(DocumentType.get("name"))});
         //    console.log(username);
    }

   
   return (
    <div className="dashboard-start">
        <h5>Welcome {username}</h5>
        <div className="flex-con">
        
        <Link className="dashboard-link" to='/addInvestor'><div className="flex-item"><img className="flex-image" src={addImage} height="100" alt='addImage'/>ADD</div></Link>
            <div className="flex-item"><img className="flex-image" src={updateImage} height="100" alt='addImage'/>UPDATE</div>
        <Link className="dashboard-link" to='/viewInfo'><div className="flex-item"><img className="flex-image" src={viewImage} height="100" alt='addImage' />VIEW</div></Link>
            <div className="flex-item"><img className="flex-image" src={printImage} height="100" alt='addImage'/>PRINT</div>
            <div className="flex-item"><img className="flex-image" src={removeImage} height="100" alt='addImage'/>DELETE</div>
        </div>
 
    </div>
    );

}

export default Dashboard;