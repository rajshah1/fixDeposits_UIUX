import React from 'react';
import "../stylefiles/viewInfo.css";
import firebase, { auth } from '../componets/Firebase';
import { useState } from 'react';
import axios from 'axios';




function ViewInfoData() {
    var hostval="https://fdproject-api.azurewebsites.net";
    var [currentUserId, SetcurrentUserId] = useState(auth.currentUser.uid);
    var [familyId, SetFamilyId] = useState("");
    var [searchParams, SetSearchParams] = useState({
        searchField: 'startDate',
        initialDate: '',
        lastDate: ''
    });

    const updateField = (e) => {
        SetSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        });
    };


    const MangementReportCall= async (e) => {
        e.preventDefault();
        axios({
            url: `${hostval}/${currentUserId}/managmentReport`, data: searchParams
            , responseType: 'blob', method: 'POST'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ManagmentReport.pdf');
            document.body.appendChild(link);
            link.click();
        });
    };

    const ClientReportCall = async (e) => {
        e.preventDefault();
        //console.log(searchParams);
        axios({
            url: `${hostval}/${currentUserId}/PrintMultiReportPDF`, data: searchParams
            , responseType: 'blob', method: 'POST'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ClientIntimationReport.pdf');
            document.body.appendChild(link);
            link.click();
        });
    };
    const ClientFullStatment = (e) => {
        e.preventDefault();
        axios({
            url: `${hostval}/${currentUserId}/fullstatByClientID/${familyId}`, responseType: 'blob', method: 'GET'
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const pdffilename =
                link.setAttribute('download', familyId + '.pdf');
            document.body.appendChild(link);
            link.click();
        });
    };
    return (
        <div className="view-main">
            <h2>View Report</h2>
            <form className="view-form-first">
                <div className="viewinfo-form">
                    <div className="selector-init-matu">
                        <select name="searchField" id="dateTypeSelector" onChange={e => updateField(e)} value={searchParams.searchField}>
                            <option value="startDate">StartDate</option>
                            <option value="maturityDate">MaturityDate</option>
                        </select>

                    </div>
                    <div className="viewform-datesInput">
                        <label htmlFor="initialDate"><b>Start Date </b></label><br />
                        <input type="date" id="initialDate" name="initialDate" onChange={e => updateField(e)} value={searchParams.initialDate || ''} required />
                        <br />
                        <label htmlFor="lastDate"><b>End Date </b></label><br />
                        <input type="date" className="lastDate" name="lastDate" onChange={e => updateField(e)} value={searchParams.lastDate || ''} required />
                        <br />
                    </div>
                    <div className="action-button">
                        <button className="three-view-button" onClick={e=>MangementReportCall(e)} >Managment Report</button>
                        <br />
                        <button className="three-view-button" onClick={e => ClientReportCall(e)}>Client Intimation Report</button>
                        <br />
                        <input type="text" className="searchCustomerById" onChange={e => SetFamilyId(e.target.value)} value={familyId} />
                        <button className="three-view-button" onClick={e => ClientFullStatment(e)}>Client Overall Statement</button>
                        <br />
                    </div>
                </div>


            </form>
        </div>
    );
}

export default ViewInfoData;