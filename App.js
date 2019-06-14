/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, KeyboardAvoidingView} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from './env';

const BOT_USER = {
    _id: 2,
    name: 'Finatic',
    avatar: 'https://placeimg.com/140/140/any'
};
const USER = {
    _id: 1,
    name: 'Finatic',
    avatar: 'https://placeimg.com/140/140/any'
};

export default class App extends Component {
    componentWillMount() {
        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowConfig.project_id
        );

        this.setState({
            messages: [
                {
                    _id: 1,
                    text: `Hello, I am Fin!`,
                    quickReplies: {
                        type: 'radio',
                        keepIt: true,
                        values: [
                            {
                                title: 'Word of the day',
                                value: 'Word of the day',
                            },
                            {
                                title: 'What is Loan?',
                                value: 'What is Loan?',
                            },
                            {
                                title: 'Define interest',
                                value: 'Define interest',
                            },
                        ],
                    },
                    createdAt: new Date(),
                    user: BOT_USER
                }
            ],
        })
    }

    onSend(messages = []) {
        // console.log(messages);
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));

        let message = messages[0].text;
        Dialogflow_V2.requestQuery(
            message,
            result => {
                // console.log(result);
                return this.handleGoogleResponse(result);
            },
            error => console.log(error)
        );
    }

    onQuickReply(messages = []){
        // console.log(messages);
        messages = [
            {
                _id: this.state.messages.length + 1,
                text: messages[0].value,
                createdAt: new Date(),
                user: USER
            }
        ];
        // console.log(messages);
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));

        let message = messages[0].text;
        // console.log(message);
        Dialogflow_V2.requestQuery(
            message,
            result => {
                // console.log(result);
                return this.handleGoogleResponse(result);
            },
            error => console.log(error)
        );
    }

    handleGoogleResponse(result) {
        if(result.queryResult.webhookPayload !== undefined) {
            let text = result.queryResult.fulfillmentMessages[0].text.text[0];
            // console.log(result.queryResult.webhookPayload.google.richResponse.items[0].simpleResponse.displayText);
            let qp = result.queryResult.webhookPayload.google.richResponse.suggestions;
            let QuickReplies = [qp[0].title, qp[1].title, qp[2].title];
            // console.log(QuickReplies);
            this.sendBotResponse(text, QuickReplies);
            // console.log('QuickReplies');
        } else {
            let text = result.queryResult.fulfillmentMessages[0].text.text[0];
            this.sendBotResponse2(text);
            // if(result.queryResult.webhookPayload != undefined) {
            //     console.log(result.queryResult.webhookPayload);
            // }
            // console.log('no QuickReplies');
        }
    }

    sendBotResponse(text, QuickReplies) {
        let msg = {
            _id: this.state.messages.length + 1,
            text: text,
            quickReplies: {
                type: 'radio',
                keepIt: true,
                values: [
                    {
                        title: QuickReplies[0],
                        value: QuickReplies[0],
                    },
                    {
                        title: QuickReplies[1],
                        value: QuickReplies[1],
                    },
                    {
                        title: QuickReplies[2],
                        value: QuickReplies[2],
                    },
                ],
            },
            createdAt: new Date(),
            user: BOT_USER
        };

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [msg])
        }));
    }

    sendBotResponse2(text) {
        let msg = {
            _id: this.state.messages.length + 1,
            text: text,
            createdAt: new Date(),
            user: BOT_USER
        };

        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [msg])
        }));
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }} behavior="padding" enabled>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    onQuickReply={messages => this.onQuickReply(messages)}
                    showAvatarForEveryMessage={true}
                    showUserAvatar={true}
                    user={USER}
                />
                <Button title="talk" onPress={() => {
                    Dialogflow_V2.startListening(result=>{
                        console.log(result);
                    }, error=>{
                        console.log(error);
                    });
                }}
                />
            </View>
        );
    }
}
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
