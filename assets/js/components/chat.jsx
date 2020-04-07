import React from 'react';
import { connect } from 'react-redux';
import { post } from "../ajax";
import { Widget, addResponseMessage, addUserMessage, dropMessages } from 'react-chat-widget';
import _ from 'lodash';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      messages: []
    }
    console.log("seeee channel", this.props.channel)
    if(this.props.channel.topic != this.props.current_channel) {
      this.props.dispatch({
        type: "CHANGE_CURRENT_CHANNEL",
        data: this.props.channel.topic
      });
    }
    if(this.props.channel.state != "joined") {
      this.props.channel.join().receive("ok", (resp) => {
        console.log("chat channel joined", resp)
      })
    }
    console.log("check here", this.state.messages)
    this.props.channel.on("send_msg",payload=> {
        console.log("received heere", payload)
        let msg = this.state.messages;
        msg.push(payload)
        let state = _.cloneDeep(this.state);
          state.messages = msg;
          this.setState(state);
        });
        this.list_messages(this.props.channel.topic);
        console.log("messages seeee", this.state.messages)
  }
  
  list_messages(room) {
    dropMessages()
    console.log("clicked")
    post('/messages/' + room, {room: room})
    .then((resp) => {
      console.log("check messages", resp)
      console.log("id", this.props.session.user_id)
      for(var i = 0; i < resp.data.length; i++) {
        console.log("senddd", resp.data[i].sender_id)
        if(resp.data[i].sender_id == this.props.session.user_id) {
          addUserMessage(resp.data[i].text)
        }else {
          addResponseMessage(resp.data[i].text)
        }
      }
      console.log("messages")
      let state = _.cloneDeep(this.state);
          state.messages = resp.data;
          this.setState(state);
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
          console.log("herehahha", resp)
            if(channel.state != "joined") {
              channel.join().receive("ok", (resp) => {console.log(resp)})
            }
          
          let data = {text: message.text, sender_name: message.name, id: message.id,
            room: channel.topic, sender_id: message.id}
          console.log("data", data)
          channel.push("send_msg", data).receive("ok", console.log("received"));

          let msg = this.state.messages;
        msg.push(data)
        let state = _.cloneDeep(this.state);
          state.messages = msg;
          this.setState(state);
        console.log("current state", state)
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

  change(e) {
    console.log("pattern", e)
    console.log("changed")
  }

  render() {
      dropMessages()
      console.log(this.state.messages.length)
      for(var i = 0; i < this.state.messages.length; i++) {
      if(this.state.messages[i].sender_id == this.props.session.user_id) {
        addUserMessage(this.state.messages[i].text);
      } else {
        addResponseMessage(this.state.messages[i].text);
      }}
      console.log("check state", this.state.messages)
    return( 
      <div>   
    {console.log("hereeeee")}
    <Widget title={this.props.name}
    subtitle={"Let's chat"}
    handleNewUserMessage={(message) => {this.newMessage({name: this.props.session.user_name ,
        text: message, id: this.props.session.user_id},
          this.props.channel)
    }} 
    handleQuickButtonClicked={()=> {
      if(this.props.channel.state != "joined") {
        this.props.channel.join().receive("ok", (resp) => {
          console.log("chat channel joined", resp)
        })
      }
    }}></Widget>
      </div>
    );
  }
}

function stateToProps(state) {
  return state;
}

export default connect(stateToProps)(Chat);