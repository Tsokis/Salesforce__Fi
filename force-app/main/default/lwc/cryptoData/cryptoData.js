import { LightningElement,api } from 'lwc';

export default class CryptoData extends LightningElement {
    @api renderComponent;
    @api cryptoData;
    renderedCallback(){
        console.log(this.renderComponent);
    }
}