public with sharing class CryptoCtrl {
    // init test set up
     @AuraEnabled
    public static Map<String,Object> searchCrypto(String userSelection,String userSymbol){
        HttpRequest HttpRequest = new HttpRequest();
        HttpRequest.setEndpoint('https://api.lunarcrush.com/v2?data='+userSelection+'&key=your_api_key&symbol='+userSymbol);
        HttpRequest.setMethod('GET');
        Map<String,Object> cryptoJsonData = new Map<String,Object>();
        String strResponse = null;
        try {
            Http http = new Http();
            HttpResponse HttpResponse = http.send(HttpRequest);
            if(HttpResponse.getStatusCode() == 200){
                strResponse = HttpResponse.getBody();
            }else{
                throw new CalloutException(HttpResponse.getBody());
            }
        }catch(Exception ex){
            throw ex;
        }
        if(!String.isBlank(strResponse)){
            cryptoJsonData = (Map<String,Object>)JSON.deserializeUntyped(strResponse);
        }
        if(!cryptoJsonData.isEmpty()){
            return cryptoJsonData;
        }else{
            return null;
        }
    }

    @AuraEnabled
    public static List<Crypto_Analysis__c> getRecords(){
        List<Crypto_Analysis__c> recData= [select id,Crypto_Name_Form__c,Price_In_Form__c,Price_Out_Form__c from Crypto_Analysis__c];
        if(recData.size()!=0){
            return recData;
        }else {
            return null;
        }
    }
    
}
