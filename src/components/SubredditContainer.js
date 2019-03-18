import React from 'react'

function Subredditcontainer (props) {

	if (props.subreddit_list[0] !== '---Please choose a subreddit---') {
	props.subreddit_list.unshift('---Please choose a subreddit---')
	}

	const div_red = (		<div className="select-style">
											<select
											className="select"
											value= {props.subreddit_list[0]}
											onChange={props.handleChange}
											name="subreddit"
										>
										{
											props.subreddit_list.map((s,i) => {
											return	(
												<option	key={i} value={s}>{s}</option>
											)
											})
										}

										</select>
									</div>
									)
										
			return (
							div_red
						 )
	 }

export default Subredditcontainer
