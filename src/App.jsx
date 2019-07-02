import React, {Component} from 'react';
import ChatBar from "./CharBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";


class App extends Component {
  render() {
    return (
      <div>
        <MessageList></MessageList>
        <ChatBar></ChatBar>
      </div>
    );
  }
}
export default App;
