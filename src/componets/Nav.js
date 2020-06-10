import React,{ useState , useEffect} from 'react';
import '../App.css'; 
import  {auth,provider} from'../componets/Firebase';
import {Link,useHistory} from 'react-router-dom';



function Navbar(props){

    var [emailId,SetemailId]=useState("");
    var [pass,Setpass]=useState("");
    var[user,setuser]=useState(null);
    const history=useHistory();
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{if(user){setuser({user})
        ActivateDashBoard();
    }
    }); 
    },[]);
    
    var modalShow=()=>{
        var s=document.getElementById("myModal");
        //console.log(s);
        s.style.display="block";
        
    };
    var modalClose=()=>{
        var s=document.getElementById("myModal");
        //console.log(s);
        s.style.display="none";
        
    };
    var logout=()=>{
        if(user!=null){
            auth.signOut().then(()=>{
                setuser(null);
                DeactiveDashBoard();
                history.push('/');
            });
        }
    };

    var DeactiveDashBoard=()=>{
            var DashboardButton=document.getElementById('sign-up');
            DashboardButton.style.opacity=0.3;
            DashboardButton.style.cursor="not-allowed";
    
};
    var ActivateDashBoard=()=>{
            var DashboardButton=document.getElementById('sign-up');
            DashboardButton.style.opacity=1;
            DashboardButton.style.cursor="pointer";
        
    };
    var GoogleLogin=(e)=>{
        e.preventDefault();
        try{
        auth.signInWithPopup(provider).then((result)=>{
            const user=result.user;
            setuser({user});
          //  console.log(user);
            ActivateDashBoard();
        }).catch(error=>{alert("Error occured : " +error.code);});
        }
        catch(message){
            alert(message+"Please try again");
        }
    };

    var validateAndSignIn=(e)=>{
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(emailId) && pass.length>=8){
            e.preventDefault();
            try{
                var response=auth.signInWithEmailAndPassword(emailId,pass).then((result)=>{
                const user=result.user;
                setuser({user});
                console.log(user);
                ActivateDashBoard();
                modalClose();
            }).catch(error=>{
                window.location.reload();
                alert("Error occured :     " +error.code);});
            
        }
            catch(err){
                
                alert(err+'\n'+"Please try again");
            }         
        }
        else{
            alert("Invalid Email-Please try again");
        }
        
    };

    return(
        <div>
        <nav className='nav-bar'>
            <img src={require('../logo-dark.png')} height="28" alt="CoolBrand"></img>
            <ul className='nav-links'>
                <Link className='nav-button' id='sign-up'to='/dashboard'>Dashboard</Link>
                {user? 
                <button className='nav-button' id='logout' onClick={logout}>Logout</button>
                :<button className='nav-button' id='logIn' onClick={modalShow}>Login</button>
                }
            </ul>
        </nav>
        
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={modalClose}>&times;</span>
            <div className="bg-img">
                <form onSubmit={validateAndSignIn} className="container">
                <button className="loginBtn loginBtn--google" onClick={GoogleLogin}>Login with Google</button>
                    <h4>OR</h4>    
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" value={emailId} onChange={e=>{SetemailId(e.target.value)}} required/>
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" value={pass} onChange={e=>{Setpass(e.target.value)}}required/>
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
            </div>
        </div>
    </div>
    );
}

export default Navbar;