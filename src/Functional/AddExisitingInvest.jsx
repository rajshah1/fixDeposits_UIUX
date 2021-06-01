import React, { useState } from 'react';
import { auth } from '../componets/Firebase';
import '../stylefiles/addExistingInevst.css';
import '../stylefiles/addInvest.css';
import AddInvest from './addInvest';
import axios from 'axios';

function AddExistingInvest() {
    var [familycode, SetFamilyCode] = useState("");
    var currentUserId = auth.currentUser.uid;
    var [investorInfoList, SetInvestorInfoList] = useState([]);
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
        certificateNo:'',
        uid:auth.currentUser.uid
    }]);
    const SearchDBByfamilyCode = async (e) => {
         await axios.get(`https://fdproject-api.azurewebsites.net/${currentUserId}/getInvestorsFromID/${familycode}`).then(
            res => {
                SetInvestorInfoList([...res.data]);
            }
        ).then(ShowTableDetails());
    };

    const ShowTableDetails = () =>{
        var existing=document.getElementById("test");
        existing.style.display="block";
    };
    return (
        <div className="addExist-hero">
            <input type='text' className='familycodeSearch' value={familycode} onChange={e => SetFamilyCode(e.target.value)} ></input>
            <button className="three-view-button" onClick={e => SearchDBByfamilyCode(e)}>Search</button>
            <br/><br/><br/>
            
            <div className="display-result-table" id="test">
                <div className="TableCaption">Existing Family Details</div>
                <br/><br/>
                <table className="TableCaption">
                    <tbody>
                    <tr>
                        <th>SR.</th>
                        <th>NAME</th>
                        <th>UPDATE</th>
                    </tr>
                    
                    {investorInfoList.map((investor,index) =>
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{investor.firstName} {investor.lastName}</td>
                            <td><a>Edit</a></td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>

            <div id="investment-form">
            <h3>Fix Deposit Details</h3>
            <form onSubmit={AddInvest.addAllFDInfo} id="Investment-Form-Data">
                {InvestmentInfos.map((InvestmentInfo,index)=>(
                <React.Fragment key={`${InvestmentInfo}${index}`}>    
                <div className="addressfield">
                    <label htmlFor="comapnyName"><b>Comapny</b></label>
                    <input type="text" placeholder="Comapny Name" name="comapnyName"value={InvestmentInfo.comapnyName} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                </div>
                
                <div className="nominee">
                    <label htmlFor="firstName"><b>First Name</b></label>
                    <input type="text" placeholder="First Name" name="firstName" autoComplete="firstName"value={InvestmentInfo.firstName} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="secondName"><b>Second Name</b></label>
                    <input type="text" placeholder="Second Name" name="secondName" autoComplete="secondName" value={InvestmentInfo.secondName} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                </div>
                <div className="nominee1">   
                    <label htmlFor="thirdName"><b>Third Name</b></label>
                    <input type="text" placeholder="Third Name" name="thirdName" autoComplete="thirdName" value={InvestmentInfo.thirdName} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="nomineeName"><b>Nominee Name</b></label>
                    <input type="text" placeholder="Nominee Name" name="nomineeName" autoComplete="nomineeName" value={InvestmentInfo.nomineeName} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                </div>
                
                <div className="timeline">
                    <label htmlFor="period"><b>Period</b></label>
                    <input type="number" placeholder="Period" name="period" autoComplete="period" value={InvestmentInfo.period} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="startDate"><b>Start Date</b></label>
                    <input type="date" id="startDate" name="startDate" value={InvestmentInfo.startDate} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="maturityDate"><b>Maturity Date</b></label>
                    <input type="date" className="maturityDate"name="maturityDate"  onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required readOnly/>
                </div>
                <div className="checkboxes">
                    <label htmlFor="newOrRenew"><b>New Or Renew</b></label>
                    <input type="checkbox" name="newOrRenew" value={InvestmentInfo.newOrRenew}  onChange={e=>{AddInvest.updateInvestmentForm(e,index)}}defaultChecked/>
                    <label htmlFor="checkOrCash"><b>Check Or Cash Payment</b></label>
                    <input type="checkbox" name="checkOrCash" value={InvestmentInfo.checkOrCash}  onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} defaultChecked/>
                </div>
                <div className="amounts">
                    <label htmlFor="amount"><b>Amount</b></label>
                    <input type="number" placeholder="Amount" name="amount" autoComplete="amount" value={InvestmentInfo.amount} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="maturatyAmount"><b>Maturaty Amount</b></label>
                    <input type="number" placeholder="Maturaty Amount" name="maturatyAmount" autoComplete="maturatyAmount" value={InvestmentInfo.maturatyAmount} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                </div>  
                <div className="scheme-dob">    
                    <label htmlFor="scheme"><b>Scheme Name</b></label>
                    <input type="text" placeholder="Scheme Name" name="scheme" autoComplete="scheme"value={InvestmentInfo.scheme} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="drawnOfBank"><b>Drawn Of Bank</b></label>
                    <input type="text" placeholder="Drawn Bank" name="drawnOfBank" autoComplete="drawnOfBank" value={InvestmentInfo.drawnOfBank} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                </div>
                <div className="cbc">
                    <label htmlFor="chequeNo"><b>Cheque No</b></label>
                    <input type="text" placeholder="Cheque No" name="chequeNo" autoComplete="chequeNo"value={InvestmentInfo.chequeNo} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                    <label htmlFor="branch"><b>Branch</b></label>
                <input type="text" placeholder="Branch Name" name="branch" autoComplete="branch"value={InvestmentInfo.branch} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                
                <label htmlFor="certificateNo"><b>Certificate Number</b></label>
                <input type="text" placeholder="Certificate Number" name="certificateNo" autoComplete="certificateNo"value={InvestmentInfo.certificateNo} onChange={e=>{AddInvest.updateInvestmentForm(e,index)}} required/>
                </div>
                <div className="plus-min">
                    <button className="button-Cust" type="button" onClick={()=>AddInvest.handleRemoveFields(index)}>-</button>
                    <button className="button-Cust" type="button" onClick={()=>AddInvest.handleAddFields()}>+</button>
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
export default AddExistingInvest;