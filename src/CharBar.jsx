import React, { Component } from 'react';

class Chatbar extends Component {
    constructor(props) {
        super(props);
    }
    userCheck() {
        if (this.props.currentUser) {
            return (
                <input className="chatbar-username" defaultValue={this.props.currentUser.name} />
            )
        } else {
            return (
                <input className="chatbar-username" defaultValue="Anonymous" />
            )
        }
    }

    render() {
        return (
            <footer className="chatbar">
                {this.userCheck()}
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.onKeyDown} />
            </footer>
        )
    }
    onKeyDown = event => {
        if (event.key === "Enter") {
            const message = { content: event.target.value };
            this.props.newMessage(message);
            event.target.value = "";
        }
    }
}

export default Chatbar;