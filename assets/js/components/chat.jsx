import React from 'react';
import { connect } from 'react-redux';
import { post } from "../ajax";
import { Launcher } from 'react-chat-window';
import { Widget } from 'react-chat-widget';
import { Button, Badge } from 'react-bootstrap';
import { Collapse } from 'react-bootstrap';
import _ from 'lodash';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      currentMessage: "",
      messages: [],
      open: true
    }

    this.props.channel.join().receive("ok", (resp) => {
      console.log("channel joined", resp)
    })

    this.list_messages(this.props.channel.topic);

    this.props.channel.on("send_msg",payload=> {
        let msg = this.state.messages;
        msg.push(payload)
        let state = _.cloneDeep(this.state);
          state.messages = msg;
          this.setState(state);
        });
    
  }
  
  list_messages(room) {
    post('/messages/' + room, {room: room})
    .then((resp) => {
      this.setState({messages: resp.data})
    });
  }

  newMessage(message, channel) {
    let date = new Date();
    post('/messages', {
      message: {
        date: date,
        sender_id: message.id,
        text: message.text,
        room: channel.topic,
        sender_name: message.name
      }
    }).then((resp) => {
          if(channel.state != "joined") {
            channel.join().receive("ok", (resp) => {console.log(resp)})
          }
          channel.push("send_msg", {text: message.text, sender_name: message.name, id: message.id,
          room: channel.topic}).receive("ok", console.log("received"));
        });
  }

  inputChange(e) {
    let currentMessage = e.target.value;
    this.setState({currentMessage: currentMessage});
  }

  toggle() {
    let open = !this.state.open
    this.setState({open: open})
  }

  render() {
      let messages = [];
      for(var i = 0; i < this.state.messages.length; i++) {
        messages.push(<h6 key={i}>{this.state.messages[i].sender_name}
      : {this.state.messages[i].text}</h6>)
      }
      
    return( 
      <div>   
      <div className="chat-box">
      <div className="chat-header" onClick={() => this.toggle()}>Chat</div>
      <Collapse in={this.state.open}>
      <div className="chat-body">
        <div className="chat-messages" id="chat-messages">{messages}</div>
        <input type="text" onChange={(e) => this.inputChange(e)}/>
        <Button onClick={() => this.newMessage({name: this.props.session.user_name ,
        text: this.state.currentMessage, id: this.props.session.user_id},
          this.props.channel)}>Send</Button>
      </div>
      </Collapse>
    </div>
      </div>
    );
  }
}

function stateToProps(state) {
  return state;
}

export default connect(stateToProps)(Chat);