import { LightningElement } from 'lwc';

export default class GenericInputComp extends LightningElement {
    str = '';
    searchHandler(e){
        this.str = e.target.value;
        this.dispatchEvent(new CustomEvent('search',{detail:e.target.value}));
    }

}