import React, { Component } from 'react';

class Chatbar extends Component {
    constructor(props) {
        super(props);
        this.changeUser = this.changeUser.bind(this);
    }
    userCheck() {
        if (this.props.currentUser !== 'Anonymous') {
            return (
                <input className="chatbar-username" defaultValue={this.props.currentUser} onBlur={this.changeUser} />
            )
        } else {
            return (
                <input className="chatbar-username" placeholder="Your Name (Optional)" onBlur={this.changeUser}  />
            )
        }
    }

    changeUser(event) {
        let userInput;
        if (event.target.value === '') {
            userInput = 'Anonymous';
        } else {
            userInput = event.target.value;
        }
        this.props.updateUser(userInput);
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
            event.target.value = '';
        }
    }
}

export default Chatbar;