import React,{useState,useEffect} from 'react';
import './App.css';
import  Navbar from'./componets/Nav';
import  FirstPage from'./componets/FirstPage';
import  dashboard from'./Functional/Dashboard';
import  {auth} from './componets/Firebase';
import  AddInvest from './Functional/addInvest';
import  viewInfoData from './Functional/viewInfoData';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom';
function App() {
  var [userVal,SetuserVal]=useState(null);
  

  useEffect(()=>{
      auth.onAuthStateChanged(function(userVal){ if(userVal){
      SetuserVal(userVal);  
    }}); 
},[]);

  const PrivateRoute=({component:Component,...rest})=>(
    <Route render={
      props => ( userVal ? <Component/> : <Redirect to='/'/> )
    }/>
  );


  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Switch>
      <PrivateRoute path='/viewInfo' extact  component={viewInfoData}/>  
      <PrivateRoute path='/addInvestor' extact  component={AddInvest}/>
      <PrivateRoute path='/dashboard' extact component={dashboard}/>
      <Route path='/' exatct component={FirstPage}></Route>
      
      </Switch>
    </div>
    </Router>
  );
}

export default App;
