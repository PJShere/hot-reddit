import React from "react";
import Subredditcontainer from "./components/SubredditContainer";
import "./style.css";
import Header from "./components/Header";
import Displaycont from "./components/Displaycont";
import { CSSTransitionGroup } from "react-transition-group";
//import Footer from './components/Footer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      subreddit_list: [],
      subreddit: "",
      subreddit_tag: "",
      hot_list: [],
      isloading: null,
			searchval: "",
			iserror: false
    };
    this.getSubList = this.getSubList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit= this.handleSearchSubmit.bind(this);
    this.getSubHot = this.getSubHot.bind(this);
  }

  componentDidMount() {
    this.getSubList();
  }

  getSubList() {
    fetch("http://127.0.0.1:5000/hot-reddit/api/getsubreddits")
      .then(response => response.json())
      .then(data => {
        this.setState({
          subreddit_list: data.sub_list
        });
      });
  }

  getSubHot(value) {
		if (value === "---Please choose a subreddit---") {
			console.log('Invalid input');
			this.setState({
				isloading: null, 
				subreddit_tag: "",
				iserror: true
			})
		}
		else
		{
    var apiurl = "http://127.0.0.1:5000/hot-reddit/api/gethotposts/";
    var hoturl = apiurl.concat(value);
    //console.log(hoturl)
    fetch(hoturl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          hot_list: data.subreddit_hot_data,
					subreddit_tag: value,
          isloading: false,
					iserror: false
        });
			})
			.catch(err => {
				console.log('Invalid Sub')
				this.setState({
					isloading: false,
					iserror: true
				})
			})
		}
	}

  updSubReddit(name, value) {
    this.setState({
      [name]: value,
      isloading: true,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
		this.setState({
			searchval: "",
			iserror: false
		})
    this.updSubReddit(name, value);
    this.getSubHot(value);
  }

  handleSearchChange(event) {
		this.setState({
			searchval: event.target.value,
			subreddit: ""
		})
  }

  handleSearchSubmit(event) {
		event.preventDefault();
		this.setState({
			isloading: true
		})
    this.getSubHot(this.state.searchval);
  }


  render() {
    const { iserror, subreddit_tag, searchval, subreddit_list, hot_list, isloading } = this.state;

    return (
      <div className="App">
        <Header />
        <p>Choose a subreddit and see whats hot</p>
        <br />
				<form className="searchbox" onSubmit={this.handleSearchSubmit}>
					<input type="text" name="searchval" value={searchval}
						onChange={this.handleSearchChange} placeholder="search a sub"/>
						<input type="submit" value="Submit" />
				</form>
				<p>or select a trending sub</p>
        <Subredditcontainer
          handleChange={this.handleChange}
          subreddit_list={subreddit_list}
        />
        <br />
        {isloading ? (
          <div id="fountainG">
            <div id="fountainG_1" className="fountainG" />
            <div id="fountainG_2" className="fountainG" />
            <div id="fountainG_3" className="fountainG" />
            <div id="fountainG_4" className="fountainG" />
            <div id="fountainG_5" className="fountainG" />
            <div id="fountainG_6" className="fountainG" />
            <div id="fountainG_7" className="fountainG" />
            <div id="fountainG_8" className="fountainG" />
          </div>
        ) : null}
        <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={1000}
        >

					{iserror ? <p className="errormsg">Invalid Sub selected, please reselect....</p>: <h4>{subreddit_tag}</h4>}

          {hot_list.length > 0 && !iserror ? <Displaycont hot_list={hot_list} /> : null}

        </CSSTransitionGroup>
      </div>
    );
  }
}

export default App;
