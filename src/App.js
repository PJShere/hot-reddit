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
					hot_list: [],
					isloading: null
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
					hot_list: data.subreddit_hot_data,
					isloading: false 
			})				
		})
	}

	updSubReddit(name, value) {
			this.setState({
				[name]: value,
				isloading: true
			})
	}

	handleChange(event) {
		const {name, value} = event.target	
		this.updSubReddit(name, value);
		this.getSubHot(value);
	}

		render() {

			const{subreddit_list, subreddit, hot_list, isloading} = this.state

    return (
							<div className="App">
								<Header />
								<p>Choose a subreddit and see whats hot</p>
								<br />
							 <Subredditcontainer 
									handleChange={this.handleChange}
									subreddit={subreddit}
									subreddit_list={subreddit_list}
							/>
							<br />
							{isloading ? <div id="fountainG"> 
								<div id="fountainG_1" className="fountainG"></div>
									<div id="fountainG_2" className="fountainG"></div>
									<div id="fountainG_3" className="fountainG"></div>
									<div id="fountainG_4" className="fountainG"></div>
									<div id="fountainG_5" className="fountainG"></div>
									<div id="fountainG_6" className="fountainG"></div>
									<div id="fountainG_7" className="fountainG"></div>
									<div id="fountainG_8" className="fountainG"></div>	
								</div>: null}
							<CSSTransitionGroup
							transitionName="example"
							transitionEnterTimeout={2000}
							transitionLeaveTimeout={1000}
							>
							<h4>{subreddit}</h4>
							{hot_list.length > 0 ? <Displaycont hot_list={hot_list} /> : null}
						</CSSTransitionGroup>
			</div>
      )
	}
}

export default App;
