import React, { Component } from "react";
import BotCard from '../components/BotCard'

class YourBotArmy extends Component {
  render() {
    return (
      <div className="ui segment inverted olive bot-army">
        <h2>Bot Army</h2>
        <div className="ui five column grid">
          <div className="row bot-army-row">
            {this.props.botArmy.map(bot => <BotCard key={bot.id} bot={bot} specsOrRemoveBot={this.props.removeBot} deleteBot={this.props.deleteBot}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default YourBotArmy;
