import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'

class BotsPage extends Component {
  state = {
    allBots: [],
    botCollection: [],
    botArmy: []
  }

  async componentDidMount() {
    try {
      let res = await fetch('http://localhost:6001/bots')
      let data = await res.json()
      this.setState({
        allBots: data,
        botCollection: data
      })
    } catch(err) {
      console.log(err)
    }
  }

  addToArmy = (bot) => {
    if(!this.state.botArmy.some(bots => bots.id === bot.id)) {
      this.setState({
        botArmy: [...this.state.botArmy, bot]
      })
    } else {
      alert('That bot has already enlisted in your army.')
    }
  }

  removeFromArmy = (bot) => {
    let botArmy = this.state.botArmy.filter(bots => bots.id!==bot.id)
    this.setState({
      botArmy
    })
  }

  deleteBot = async (bot) => {
    try {
      await fetch(`http://localhost:6001/bots/${bot.id}`, {method: 'DELETE'})
      let newBots = this.state.allBots.filter(bots => bots.id !== bot.id )
      this.setState({
        botCollection: newBots
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
          {<YourBotArmy 
            botArmy={this.state.botArmy} 
            removeBot={this.removeFromArmy} 
            deleteBot={this.deleteBot}/>
          }
          {<BotCollection 
            botCollection={this.state.botCollection} 
            addBot={this.addToArmy} 
            deleteBot={this.deleteBot}/>
          }
      </div>
    )
  }
}

export default BotsPage;
