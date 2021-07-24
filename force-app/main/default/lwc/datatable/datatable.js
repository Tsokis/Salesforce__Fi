import { LightningElement } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRecords from "@salesforce/apex/CryptoCtrl.getRecords";


export default class Datatable extends LightningElement {
    data = [];
    saveDraftValues = [];
    columns = [
        { label: 'Name', fieldName: 'Crypto_Name_Form__c', type: 'text', wrapText: true,editable: true },
        { label: 'Price In', fieldName: 'Price_In_Form__c', type: 'currency', wrapText: true,editable: true },
        { label: 'Price Out', fieldName: 'Price_Out_Form__c', type: 'currency', wrapText: true,editable: true }
    ];
     connectedCallback(){
        getRecords().then(res => {this.data = [...res]}).catch(err => console.log(err));
    }

    handleSave(e){
        this.saveDraftValues = e.detail.draftValues;
        const recordInputs = this.saveDraftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
        console.log(recordInputs);
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(res => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Records Updated Successfully!!',
                    variant: 'success'
                })
            );
            this.saveDraftValues = [];
            getRecords().then(res => {this.data = [...res]}).catch(err => console.log(err));
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'An Error Occured!! '+error,
                    variant: 'error'
                })
            );
        }).finally(() => {
            this.saveDraftValues = [];
        });
    }
    
}