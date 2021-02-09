import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false, 
    toys: [],
    name: '',
    image: ''
  }

  //fetches 
  componentDidMount(){
    this.getToys()
  }

  getToys = () => {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => this.setState({toys}))
  }


  //handlers 
  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  //form functions 
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let toyData = {
        name: this.state.name,
        image: this.state.image,
        likes: 0
      }
    this.createNewToy(toyData)
  }

  createNewToy = (toyData) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      header: {'Content-Type':'application/json'},
      body: JSON.stringify(toyData)
    })
    .then(resp => resp.json())
    .then(() => this.setState({
      toys: [...this.state.toys, toyData]
    }))
  }

  donateToy = (toy) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(() => {
      let deleteToy = this.state.toys.filter(t => t.id !== toy.id)
      this.setState({
        toys: deleteToy
      })
    })
  }

  addLikes = (id, currentLikes) => {
    let likeUp = currentLikes + 1
    console.log(likeUp)
    let configObj = ({
      method: 'PATCH',
      header: {'Content-Type':'application/json'},
      body: JSON.stringify({"likes": likeUp})
    })

    let newToys = [...this.state.toys]
    let likedToy = this.state.toys.findIndex(t => t.id === id)
    newToys[likedToy].likes = likeUp

    fetch(`http://localhost:3000/toys/${id}`, configObj)
    .then(resp => resp.json())
    .then(() => this.setState({
      toys: newToys
    }))
  }

  render(){
    console.log(this.state.toys)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} addLikes={this.addLikes} donateToy={this.donateToy} />
      </>
    );
  }

}

export default App;
