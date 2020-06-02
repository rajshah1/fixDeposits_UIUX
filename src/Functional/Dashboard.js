import React,{useState,useEffect} from 'react';
import '../stylefiles/dashboard.css';
import  firebase,{auth} from '../componets/Firebase';


function Dashboard(){
    var [username,Setusername]=useState('');
    useEffect(()=>{
        userInfo();
    },[]);
    var userInfo=()=>{
        if(auth.currentUser!=null){
            //console.log(auth.currentUser.email);
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                // Send token to your backend via HTTPS
                // ...
              }).catch(function(error) {
                // Handle error
                alert("Error ocurred:"+error);
              });


            firebase.firestore().collection("users").doc(auth.currentUser.email).get()
            .then((DocumentType)=>{Setusername(DocumentType.get("Name"))});
            console.log(username);
        }
   }; 
   
   return (
    <div>
        <h5>Welcome {username}</h5>
            
    </div>
    );

}

export default Dashboard;