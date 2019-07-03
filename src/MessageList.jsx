import React, {Component} from 'react'; 
import Message from "./Message.jsx";

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: this.props.messages
        }
      }
    render() {
        return <main className="messages">
            {this.props.messages.map(message => <Message message={message} key={message.id} />)} 
            {/* DONT FORGET TO CHANGE THE KEY LATER */}
        </main>
    }
}

export default MessageList;