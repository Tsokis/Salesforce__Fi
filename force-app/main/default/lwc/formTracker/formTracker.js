import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FormTracker extends LightningElement {
    recId = '';
    cryptoName = '';
    priceIn=0;
    priceOut = 0;
    onOpen = false;
    
    submithandler(e){
        let fields = this.buildFieldsObj(this.cryptoName,this.priceIn,this.priceOut);
        const recordInput = { apiName: 'Crypto_Analysis__c', fields };
        createRecord(recordInput)
            .then(res => {
                this.recId = res.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Position has been added',
                        variant: 'success',
                    }),
                );
                window.location.reload();// will be removed
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating Position',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
       
    }
    getName(e){
        this.cryptoName = e.target.value;
    }
    getPriceIn(e){
        this.priceIn = e.target.value;
    }
    getPriceOut(e){
        this.priceOut = e.target.value;
    }
    buildFieldsObj(name,pIn,pOut){
        //Crypto Analysis Obj
        let fields = {
            Crypto_Name_Form__c:name,
            Price_In_Form__c:pIn,
            Price_Out_Form__c:pOut
        }
        return fields;
    }
    openModal(){
        this.onOpen = true;
    }
    closeModal(){
        this.onOpen = !this.onOpen;
    }
}