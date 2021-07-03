import { LightningElement } from 'lwc';
import searchCrypto from "@salesforce/apex/CryptoCtrl.searchCrypto";

export default class CryptoAppWrapper extends LightningElement {
    searchTxt = '';
    searchHandler(e){
        console.log(e.detail);
        console.log(e.detail.length);
        if(e.detail.length >=3){
            searchCrypto({userSelection:'assets',userSymbol:e.detail})
            .then(res => console.log(res))
            .catch(err => console.log(err));
        }
    }
}