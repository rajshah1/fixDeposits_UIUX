import React,{useState,useEffect} from 'react';
import {auth} from '../componets/Firebase';
import '../stylefiles/addInvest.css';
import axios from 'axios';

function AddInvest(){
    var[idforInvestInfo,SetidforInvestInfo]=useState("");
    var[currentUserId,SetcurrentUserId]=useState(auth.currentUser.uid);
    var[addInvestorForm,SetaddInvestorForm]=useState({
        id:'',
        firstName:'',
        middleName:'',
        lastName:'',
        familyCode:'',
        familyHead:'',
        address:''
    });
    var[InvestmentInfos,SetInvestmentInfo]=useState([{
        id:'',
        comapnyName:'',
        startDate:'',
        period:0,
        maturityDate:'',
        firstName:'',
        secondName:'',
        thirdName:'',
        nomineeName:'',
        newOrRenew:true,
        checkOrCash:true,
        amount:0,
        scheme:'',
        chequeNo:'',
        drawnOfBank:'',
        branch:'',
        maturatyAmount:0,
        certificateNo:''
        
    }]);


    useEffect(()=>{
        showNewCustomer();
    });

    const updateField = e => {
        SetaddInvestorForm({
          ...addInvestorForm,
          [e.target.name]: e.target.value
        });
        
      };
      
    const formateDate=(date)=>{
        var d=date;
        var month = '' + (d.getMonth() + 1);
        var dayv = '' + d.getDate();
        var yearv = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (dayv.length < 2) 
            dayv = '0' + dayv;

        return [yearv, month, dayv].join('-');
    }  

    const updateInvestmentForm=(e,index)=>{
        const valuesInfo = [...InvestmentInfos];
        const nameValue=e.target.name;  
        var x1=document.getElementsByClassName("maturityDate");
        if(nameValue==="comapnyName")      
            valuesInfo[index].comapnyName=e.target.value;
        else if(nameValue==="startDate"){
            valuesInfo[index].startDate=e.target.value;
            var res1 =e.target.value.split('-');
            var dateVariable1=new Date((res1[0]),(res1[1])-1,(res1[2]));
            dateVariable1.setMonth(Number(valuesInfo[index].period)+Number(dateVariable1.getMonth()));
            var matDt=formateDate(dateVariable1);
            if(matDt.length===10){
                x1[index].value=matDt;
                valuesInfo[index].maturityDate=matDt; 
         
            }

        }    
        else if(nameValue==="period"){
            valuesInfo[index].period=Number(e.target.value); 
            var res=valuesInfo[index].startDate.split('-');               
            var dateVariable=new Date((res[0]),(res[1])-1,(res[2]));
            dateVariable.setMonth(Number(e.target.value)+Number(dateVariable.getMonth()));
            var matDt1=formateDate(dateVariable);
            if(matDt1.length===10){
                x1[index].value=matDt1;
                valuesInfo[index].maturityDate=matDt1; 
         
            }
            //document.('maturityDate').value=formateDate(dateVariable);
            //valuesInfo[index].maturityDate=(document.getElementById('maturityDate').value);
        }
       /*  else if(nameValue==="maturityDate")
            valuesInfo[index].maturityDate=e.target.value;
     */ else if(nameValue==="firstName")
            valuesInfo[index].firstName=e.target.value;
        else if(nameValue==="secondName")
            valuesInfo[index].secondName=e.target.value;
        else if(nameValue==="thirdName")
            valuesInfo[index].thirdName=e.target.value;
        else if(nameValue==="nomineeName")
            valuesInfo[index].nomineeName=e.target.value;
        else if(nameValue==="newOrRenew")
            valuesInfo[index].newOrRenew=e.target.value;
        else if(nameValue==="checkOrCash")
            valuesInfo[index].checkOrCash=e.target.value;
        else if(nameValue==="amount")
            valuesInfo[index].amount=Number(e.target.value);
        else if(nameValue==="scheme")
            valuesInfo[index].scheme=e.target.value;
        else if(nameValue==="chequeNo")
            valuesInfo[index].chequeNo=e.target.value;
        else if(nameValue==="drawnOfBank")
            valuesInfo[index].drawnOfBank=e.target.value;
        else if(nameValue==="branch")
            valuesInfo[index].branch=e.target.value;
        else if(nameValue==="maturatyAmount")
            valuesInfo[index].maturatyAmount=Number(e.target.value);
        else if(nameValue==="certificateNo")
            valuesInfo[index].certificateNo=e.target.value;        
        SetInvestmentInfo(valuesInfo);
    //    console.log(valuesInfo[index]);
    
      };
      
    const handleAddFields = () => {
        const valueData = [...InvestmentInfos];
        valueData.push({id:'',
        comapnyName:'',
        startDate:'',
        period:0,
        maturityDate:'',
        firstName:'',
        secondName:'',
        thirdName:'',
        nomineeName:'',
        newOrRenew:true,
        checkOrCash:true,
        amount:0,
        scheme:'',
        chequeNo:'',
        drawnOfBank:'',
        branch:'',
        maturatyAmount:0,
        certificateNo:''
        });

        SetInvestmentInfo(valueData);
      };

      const handleRemoveFields = index => {
        const valueData = [...InvestmentInfos];
        valueData.splice(index, 1);
        SetInvestmentInfo(valueData);
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

    const savenewcustomer=async(e)=>{
        e.preventDefault();
        var responseData=await axios.post(`http://localhost:8080/${currentUserId}/addInvestor`,addInvestorForm);
        //console.log(responseData);
        //console.log(responseData.status);
        if(responseData.status===200){
            var newUserForm=document.getElementById("newform");
            newUserForm.style.pointerEvents="none";
            newUserForm.style.opacity=0.5;
            var investForm=document.getElementById("investment-form");
            investForm.style.display="block";
            SetidforInvestInfo(responseData.data);
        }
        else{
            alert("Error Occured with this code"+responseData.status+" Error message"+responseData.statusText);
        }
    }
    const addAllFDInfo=(e)=>{
        e.preventDefault();
        InvestmentInfos.forEach(RefineData)
        async function RefineData(item,currentIndex,arre){
            arre[currentIndex].maturityDate=new Date(arre[currentIndex].maturityDate);
            arre[currentIndex].startDate=new Date(arre[currentIndex].startDate);
            arre[currentIndex].id=idforInvestInfo;
            //console.log(item);
            //console.log(idforInvestInfo);
             var responseResultAddfdInfo= await axios.post(`http://localhost:8080/${currentUserId}/addfdinfo`,item);
            //console.log(responseResultAddfdInfo); 
        }
        
    };
    return(
    <div className="addInvest">
          <div className="two-button">
                <button className="button-Cust" onClick={showNewCustomer}>New Customer</button>
                <button className="button-Cust" onClick={showExistingCustomer}>Existing Customer</button>
          </div>
          <div id="newUser">
              <h3>Investor Info</h3>
              <form className="newUser-form" id="newform" onSubmit={savenewcustomer}>
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
                    <label htmlFor="address"><b>Address</b></label>
                    <input type="text"  autoComplete="address" placeholder="Enter Address" name="address" value={addInvestorForm.address} onChange={updateField} required/>
                </div>
                    <button type="submit" className="first-button">Save</button>
              </form>
        </div>
        
        
        <div id="UpdateExistingUser">
                <p>This is Developing</p>
        </div>


        <div id="investment-form">
            <h3>Fix Deposit Details</h3>
            <form onSubmit={addAllFDInfo}>
                {InvestmentInfos.map((InvestmentInfo,index)=>(
                <React.Fragment key={`${InvestmentInfo}${index}`}>    
                <div className="addressfield">
                    <label htmlFor="comapnyName"><b>Comapny</b></label>
                    <input type="text" placeholder="Comapny Name" name="comapnyName"value={InvestmentInfo.comapnyName} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                </div>
                
                <div className="nominee">
                    <label htmlFor="firstName"><b>First Name</b></label>
                    <input type="text" placeholder="First Name" name="firstName" autoComplete="firstName"value={InvestmentInfo.firstName} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="secondName"><b>Second Name</b></label>
                    <input type="text" placeholder="Second Name" name="secondName" autoComplete="secondName" value={InvestmentInfo.secondName} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                </div>
                <div className="nominee1">   
                    <label htmlFor="thirdName"><b>Third Name</b></label>
                    <input type="text" placeholder="Third Name" name="thirdName" autoComplete="thirdName" value={InvestmentInfo.thirdName} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="nomineeName"><b>Nominee Name</b></label>
                    <input type="text" placeholder="Nominee Name" name="nomineeName" autoComplete="nomineeName" value={InvestmentInfo.nomineeName} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                </div>
                
                <div className="timeline">
                    <label htmlFor="period"><b>Period</b></label>
                    <input type="number" placeholder="Period" name="period" autoComplete="period" value={InvestmentInfo.period} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="startDate"><b>Start Date</b></label>
                    <input type="date" id="startDate" name="startDate" value={InvestmentInfo.startDate} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="maturityDate"><b>Maturity Date</b></label>
                    <input type="date" className="maturityDate"name="maturityDate"  onChange={e=>{updateInvestmentForm(e,index)}} required readOnly/>
                </div>
                <div className="checkboxes">
                    <label htmlFor="newOrRenew"><b>New Or Renew</b></label>
                    <input type="checkbox" name="newOrRenew" value={InvestmentInfo.newOrRenew}  onChange={e=>{updateInvestmentForm(e,index)}}defaultChecked/>
                    <label htmlFor="checkOrCash"><b>Check Or Cash Payment</b></label>
                    <input type="checkbox" name="checkOrCash" value={InvestmentInfo.checkOrCash}  onChange={e=>{updateInvestmentForm(e,index)}} defaultChecked/>
                </div>
                <div className="amounts">
                    <label htmlFor="amount"><b>Amount</b></label>
                    <input type="number" placeholder="Amount" name="amount" autoComplete="amount" value={InvestmentInfo.amount} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="maturatyAmount"><b>Maturaty Amount</b></label>
                    <input type="number" placeholder="Maturaty Amount" name="maturatyAmount" autoComplete="maturatyAmount" value={InvestmentInfo.maturatyAmount} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                </div>  
                <div className="scheme-dob">    
                    <label htmlFor="scheme"><b>Scheme Name</b></label>
                    <input type="text" placeholder="Scheme Name" name="scheme" autoComplete="scheme"value={InvestmentInfo.scheme} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="drawnOfBank"><b>Drawn Of Bank</b></label>
                    <input type="text" placeholder="Drawn Bank" name="drawnOfBank" autoComplete="drawnOfBank" value={InvestmentInfo.drawnOfBank} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                </div>
                <div className="cbc">
                    <label htmlFor="chequeNo"><b>Cheque No</b></label>
                    <input type="text" placeholder="Cheque No" name="chequeNo" autoComplete="chequeNo"value={InvestmentInfo.chequeNo} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="branch"><b>Branch</b></label>
                <input type="text" placeholder="Branch Name" name="branch" autoComplete="branch"value={InvestmentInfo.branch} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                
                <label htmlFor="certificateNo"><b>Certificate Number</b></label>
                <input type="text" placeholder="Certificate Number" name="certificateNo" autoComplete="certificateNo"value={InvestmentInfo.certificateNo} onChange={e=>{updateInvestmentForm(e,index)}} required/>
                </div>
                <div className="plus-min">
                    <button className="button-Cust" type="button" onClick={()=>handleRemoveFields(index)}>-</button>
                    <button className="button-Cust" type="button" onClick={()=>handleAddFields()}>+</button>
                </div>
            </React.Fragment>
                ))}
                {/* <pre>
                {JSON.stringify(InvestmentInfos, null, 2)}
                </pre> */}
                <button type="submit" className="first-button">Save</button>
            </form>
        </div>

    </div>
    );
}

export default AddInvest;
