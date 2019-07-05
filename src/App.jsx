import React, { Component } from 'react';
import ChatBar from './CharBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import { IncomingMessage } from 'http';
import NavBar from './NavBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous', // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 1,
      webSocket: null
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  sendMessage(message) {
    const newMessage = {
      type: 'incomingMessage',
      username: this.state.currentUser,
      content: message.content
    };
    this.state.webSocket.send(JSON.stringify(newMessage));
  }

  updateUser(input) {
    const newNotif = {
      type: 'incomingNotification',
      content: `${this.state.currentUser} has changed their name to ${input}`
    }
    if (this.state.currentUser !== input) {
      this.setState({ currentUser: input })
      this.state.webSocket.send(JSON.stringify(newNotif));
    }
  }

  componentDidMount() {
    const webSocket = new WebSocket('ws://localhost:3001')
    webSocket.onopen = function () {
      console.log('Connected to server')
    }
    this.setState({ webSocket })
    webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      switch (data.type) {
        case 'incomingMessage':
          const messages = this.state.messages.concat(data);
          this.setState({ messages: messages })
          break;
        case 'incomingNotification':
          const notif = this.state.messages.concat(data);
          this.setState({ messages: notif })
          break;
        case 'clientSize':
          const cl = data.clientSize;
          this.setState({userCount: cl})
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('unknown event type ' + data.type)
      }
    };
  }

  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount}></NavBar>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar currentUser={this.state.currentUser} newMessage={this.sendMessage} updateUser={this.updateUser} />
      </div>
    );
  }
}
export default App;
