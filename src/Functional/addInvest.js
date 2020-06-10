import React,{useState,useEffect} from 'react';

import '../stylefiles/addInvest.css';

function AddInvest(){
    
    var[addInvestorForm,SetaddInvestorForm]=useState({
        id:'',
        firstName:'',
        middleName:'',
        lastName:'',
        familyCode:'',
        familyHead:'',
        addressValue:''
    });


    useEffect(()=>{
        showNewCustomer();
    });
    const updateField = e => {
        SetaddInvestorForm({
          ...addInvestorForm,
          [e.target.name]: e.target.value
        });
      };

    const showNewCustomer=()=>{
        var existing=document.getElementById("UpdateExistingUser");
        existing.style.display="none";
        var newUser=document.getElementById("newUser");
        newUser.style.display="block";
    };
    
    const showExistingCustomer =()=>{
        var newUser=document.getElementById("newUser");
        newUser.style.display="none";
        var existing=document.getElementById("UpdateExistingUser");
        existing.style.display="block";

    };

    const loging=(e)=>{
        e.preventDefault();
        console.log(addInvestorForm);

    }
    return(
        <div className="addInvest">
          <div className="two-button">
                <button className="button-Cust" onClick={showNewCustomer}>New Customer</button>
                <button className="button-Cust" onClick={showExistingCustomer}>Existing Customer</button>
          </div>
          <div id="newUser">
              <form className="newUser-form" onSubmit={loging}>
                <div className="newUser-first">
                    <label htmlFor="firstName"><b>First </b></label>
                    <input type="text"  autoFocus placeholder="First Name" autoComplete="firstName" name="firstName" value={addInvestorForm.firstName} onChange={updateField} required/>
                    <label htmlFor="middleName"><b>Middle </b></label>
                    <input type="text" placeholder="Middle Name" name="middleName" autoComplete="middleName" value={addInvestorForm.middleName} onChange={updateField} required/>
                    <label htmlFor="lastName"><b>Last </b></label>
                    <input type="text"  placeholder="Last Name"  autoComplete="lastName" name="lastName" value={addInvestorForm.lastName} onChange={updateField} required/>
                </div>
                <div className="familycode">
                    <label htmlFor="familyCode"><b>FamilyCode</b></label>
                    <input type="text"  placeholder="Family Code" name="familyCode" value={addInvestorForm.familyCode} onChange={updateField} required/>
                    <label htmlFor="familyHead"><b>FamilyHead</b></label>
                    <input type="text"  placeholder="Family Head" name="familyHead" value={addInvestorForm.familyHead} onChange={updateField} required/>
                </div>
                <div className="addressfield">
                    <label htmlFor="addressValue"><b>Address</b></label>
                    <input type="text"  autoComplete="addressValue" placeholder="Enter Address" name="addressValue" value={addInvestorForm.addressValue} onChange={updateField} required/>
                </div>
                    <button type="submit" className="first-button">Save</button>
              </form>
          </div>
          <div id="UpdateExistingUser">
                <p>This is Developing</p>
          </div>
        </div>
    );
}

export default AddInvest;
