import { LightningElement } from 'lwc';
import searchCrypto from "@salesforce/apex/CryptoCtrl.searchCrypto";

export default class CryptoAppWrapper extends LightningElement {
    searchTxt = '';
    cryptoData = [];
    renderCryptoData = false;
    searchHandler(e){
        if(e.detail.length >=3){
            searchCrypto({userSelection:'assets',userSymbol:e.detail})
            .then(res => {
                console.log(res);
                this.cryptoData = res.data;
                this.cryptoData.length !=0?this.renderCryptoData = true:this.cryptoData = false;
            })
            .catch(err => console.log(err));
        }
    }
}