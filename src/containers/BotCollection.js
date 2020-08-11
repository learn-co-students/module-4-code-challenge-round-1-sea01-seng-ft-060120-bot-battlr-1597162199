import React, { Component } from "react";
import BotCard from '../components/BotCard'


class BotCollection extends Component {

  render() {
    return (
      <div className="ui four column grid">
        <div className="row">
          {this.props.botCollection.map(bot => <BotCard key={bot.id} bot={bot} specsOrRemoveBot={this.props.showSpecs} deleteBot={this.props.deleteBot} />)}
        </div>
      </div>
    );
  }
}

export default BotCollection;
