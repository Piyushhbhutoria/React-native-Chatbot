# React-native-Chatbot
A simple chatbot using react-native-dialogflow and react-native-gifted-chat.

Steps to set-up  
1. Set-up **env.js** file like
```javascript
export const dialogflowConfig = {
    type: "service_account",
    project_id: "finatic",
    private_key_id: "59fd29ca731fxxxxx",
    private_key: "-----BEGIN PRIVATE KEY-----********=\n-----END PRIVATE KEY-----\n",
    client_email: "***.iam.gserviceaccount.com",
    client_id: "108659xxxxxx",
    auth_uri: "https://accounts.google.com/xxxx",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/xxx",
    client_x509_cert_url: "https://www.googleapis.com/robot/xxx/test-141%40finatic-f4060.iam.gserviceaccount.com"
};

```
you can generate this key from the settings in dialogflow.

2. open terminal and run
```shell
npm install
react-native link react-native-dialogflow
react-native link react-native-voice
```
```shell
react-native run-android 
```
or
```shell
react-native run-ios 
```

