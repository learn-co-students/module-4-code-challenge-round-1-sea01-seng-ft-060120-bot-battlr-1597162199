import React, { Component } from "react";
import BotCard from '../components/BotCard'

class BotCollection extends Component {
  //your code here

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {this.props.botCollection.map(bot => <BotCard key={bot.id} bot={bot} addOrRemoveBot={this.props.addBot} deleteBot={this.props.deleteBot} />)}
        </div>
      </div>
    );
  }
}

export default BotCollection;
