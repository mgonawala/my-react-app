import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import Header from "./Header";
import AccountApp from './AccountApp';


class App extends Component {
    state = {
        characters: []
    };

    removeCharacter = index => {
        const { characters } = this.state;
    
        this.setState({
            characters: characters.filter((character, i) => { 
                return i !== index;
            })
        });
    }

    handleSubmit = character => {
        this.setState({characters: [...this.state.characters, character]});
    }

    render() {
        const { characters } = this.state;
        
        return (

            <div className="container">

             <AccountApp />
            </div>
        );
    }
}

export default App;