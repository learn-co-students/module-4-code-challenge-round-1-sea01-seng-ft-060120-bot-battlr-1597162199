import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from './YourBotArmy'
import BotSpecs from '../components/BotSpecs'
import SortBar from '../components/SortBar'

class BotsPage extends Component {
  state = {
    allBots: [],
    botCollection: [],
    botArmy: [],
    specs: false,
    botSpecs: {},
    sortOption: ''
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
    if(!this.state.botArmy.some(bots => bots.id === bot.id || bots.bot_class === bot.bot_class)) {
      let botCollection = this.state.botCollection.filter(bots => bots.id !== bot.id)
      this.setState({
        botCollection,
        botArmy: [...this.state.botArmy, bot],
        specs: false,
        botSpecs: {}
      })
    } else {
      alert(`${bot.bot_class} class has been filled`)
    }
  }

  removeFromArmy = (bot) => {
    let botArmy = this.state.botArmy.filter(bots => bots.id!==bot.id)
    this.setState({
      botArmy,
      botCollection: [...this.state.botCollection, bot]
    })
  }

  deleteBot = async (bot) => {
    try {
      await fetch(`http://localhost:6001/bots/${bot.id}`, {method: 'DELETE'})
      let newBots = this.state.allBots.filter(bots => bots.id !== bot.id )
      let newArmy = this.state.botArmy.filter(bots => bots.id !== bot.id )
      this.setState({
        botCollection: newBots,
        botArmy: newArmy
      })
    } catch (err) {
      console.log(err)
    }
  }

  toggleSpecs = (bot) => {
    if(this.state.specs) {
      this.setState({
        specs: false,
        botSpecs: {}
      })
    } else {
      this.setState({
        specs: true,
        botSpecs: bot
      })
    }
  }

  goBack = () => {
    this.setState({specs: false})
  }

  sortCollection = (e) => {
    if(e.target.value === 'Health'){
      let sortedCollection = this.state.botCollection.sort((a,b) => b.health - a.health)
      this.setState({botCollection: sortedCollection, sortOption: e.target.value})
     } else if (e.target.value === 'Damage') {
       let sortedCollection = this.state.botCollection.sort((a,b) => b.damage - a.damage)
       this.setState({botCollection: sortedCollection, sortOption: e.target.value})
     } else if (e.target.value === 'Armor') {
      let sortedCollection = this.state.botCollection.sort((a,b) => b.armor - a.armor)
      this.setState({botCollection: sortedCollection, sortOption: e.target.value})
    }
  }

  filterBots = (e) => {
    let botCollection = this.state.allBots.filter(bot => bot.bot_class === e.target.value)
    this.setState({botCollection})
  }

  render() {
    return (
      <div>
        {<YourBotArmy 
          botArmy={this.state.botArmy} 
          removeBot={this.removeFromArmy} 
          deleteBot={this.deleteBot}/>
        }
        {<SortBar 
          sort={this.sortCollection}
          sortOption={this.state.sortOption}
          filterBots={this.filterBots}/>
        }
        <h2>Bot Collection</h2>
        {!this.state.specs ?
          <BotCollection 
            botCollection={this.state.botCollection} 
            showSpecs={this.toggleSpecs}
            deleteBot={this.deleteBot}/>
        :
          <BotSpecs 
          bot={this.state.botSpecs}
          goBack={this.toggleSpecs}
          addBot={this.addToArmy} 
          />
        }
      </div>
    )
  }
}

export default BotsPage;
