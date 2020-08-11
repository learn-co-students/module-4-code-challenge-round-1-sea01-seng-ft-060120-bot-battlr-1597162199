import React from 'react';

const  SortBar = props => {
    return (
        <div>
        <strong>Sort by:</strong>
        <label>
            <input type="radio" value="Health" checked={props.sortOption ==='Health' ? true : false } onChange={props.sort}/>
            Health
        </label>
        <label>
            <input type="radio" value="Damage" checked={props.sortOption ==='Damage' ? true : false } onChange={props.sort}/>
            Damage
        </label>
        <label>
            <input type="radio" value="Armor" checked={props.sortOption ==='Armor' ? true : false } onChange={props.sort}/>
            Armor
        </label>
        <br/>

        <label>
            <strong>Filter:</strong>
            <select onChange={props.filterBots}>
                <option value="Assault">Assault</option>
                <option value="Defender">Defender</option>
                <option value="Support">Support</option>
                <option value="Medic">Medic</option>
                <option value="Witch">Witch</option>
                <option value="Captain">Captain</option>
            </select>
        </label>
        </div>
    );

}


export default SortBar;