import React from 'react';
import  firebase,{auth} from '../componets/Firebase';


function viewInfoData(){
    return(
        <div className="view-main">
            <form className="view-form-first">
                <button className="three-view-button">Managment Report</button>
                <button className="three-view-button">Client Report</button>
                <button className="three-view-button">Client Statement</button>
                
                <label htmlFor="startDate"><b>Start Date</b></label>
                <input type="date" id="startDate" name="startDate"  required/>
                <label htmlFor="endDate"><b>End Date</b></label>
                <input type="date" className="endDate"name="endDate"  required readOnly/>
               

            </form>
        </div>
    );
};

export default viewInfoData;