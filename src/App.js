import React from 'react';
import Subredditcontainer from './components/SubredditContainer';
import './style.css';
import Header from './components/Header';
import Displaycont from './components/Displaycont'
import { CSSTransitionGroup } from 'react-transition-group'
//import Footer from './components/Footer';

class App extends React.Component {
		constructor() {
				super()
				this.state ={
					subreddit_list: [],
					subreddit:"",
					hot_list: [] 
				}
		this.getSubList = this.getSubList.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.getSubHot = this.getSubHot.bind(this)
		}


		componentDidMount() {
			this.getSubList()
		}

		getSubList() {
		fetch("http://127.0.0.1:5000/hot-reddit/api/getsubreddits")
		.then(response => response.json())
		.then(data => { 
			this.setState({
					subreddit_list: data.sub_list
			})				
		})
	}

		getSubHot(value) {
		var apiurl = 'http://127.0.0.1:5000/hot-reddit/api/gethotposts/'
		var hoturl = apiurl.concat(value)
		//console.log(hoturl)
			fetch(hoturl)
			.then(response => response.json())
			.then(data => { 
				this.setState({
					hot_list: data.subreddit_hot_data
			})				
		})
	}

	updSubReddit(name, value) {
			this.setState({
				[name]: value
			})
	}

	handleChange(event) {
		const {name, value} = event.target	

		this.updSubReddit(name, value);
		this.getSubHot(value);
	}

		render() {

    return (
      <div className="App">
				<Header />
				<p>Choose a subreddit and see whats hot</p>
				<br />
			 <Subredditcontainer 
					handleChange={this.handleChange}
					subreddit={this.state.subreddit}
					subreddit_list={this.state.subreddit_list}
			/>
			<br />
			<h4>{this.state.subreddit}</h4>
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
					{this.state.hot_list.length > 0 ? 
					<Displaycont hot_list={this.state.hot_list} /> : null}
        </CSSTransitionGroup>
	</div>

      )
	
	}
}

export default App;
