import React, {Component} from "react"
import Subredditcontainer from './SubredditContainer'
import Displaycont from './Displaycont'

class  Subredselector extends Component {
constructor() {
	super()
	  this.state = {
			character: {},
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const {name, value} = event.target	
		this.setState({
			[name]: value
		})


		fetch("https://swapi.co/api/people/1")
		.then(response => response.json())
		.then(data => {
			this.setState ({
			character: data
			}) 
		})
				console.log(this.state.character)
	}

	render() {

	  return (
	    <div>
				<Subredditcontainer
					handleChange={this.handleChange}
					data={this.state}
			/>
			{this.state.character.name ? 
				<Displaycont data = {this.state}/> : null}
			</div>
	    )
		}
  }

export default  Subredselector

/*
	const todoItems = this.state.todos.map(item => <ToDoItem key={item.id} item={item}
			handleChange={this.handleChange}/>)

	return (
		<div className="todo-list">
		{todoItems}
		</div>
	)
*/
