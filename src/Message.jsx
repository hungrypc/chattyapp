import React, { Component } from 'react';
// import MessageList from './MessageList.jsx';

class Message extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.message.type === 'incomingMessage') {
            return (
                    <div className="message">
                        <span className="message-username">{this.props.message.username}</span>
                        <span className="message-content">{this.props.message.content}</span>
                    </div>
            )
        } else if (this.props.message.type === 'incomingNotification') {
            return (    
                <div className="message system">
                    {this.props.message.content}
                </div>    
            )
        }
    }
}

export default Message;