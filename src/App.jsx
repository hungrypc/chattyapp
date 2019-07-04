import React, { Component } from 'react';
import ChatBar from "./CharBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import { IncomingMessage } from 'http';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
      ],
      webSocket: null
    }
    this.sendMessage = this.sendMessage.bind(this);
  }
  sendMessage(message) {
    const newMessage = {
      type: 'incomingMessage',
      username: this.state.currentUser.name,
      content: message.content
    };
    this.state.webSocket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    const webSocket = new WebSocket('ws://localhost:3001')
    webSocket.onopen = function () {
      console.log('Connected to server')
    }
    this.setState({webSocket})
    webSocket.onmessage = (event) => {
      const receiveMessage = JSON.parse(event.data)
      const messages = this.state.messages.concat(receiveMessage) 
      this.setState({messages: messages})
    } 
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar currentUser={this.state.currentUser} newMessage={this.sendMessage} />
      </div>
    );
  }

  // addMessage = (message) => {
  //   message.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  //   message.username = this.state.currentUser.name;
  //   message.type = "incomingMessage";
  //   const messages = this.state.messages.concat(message);
  //   this.setState({ messages: messages });
  // }
}
export default App;
