import React from "react";

function Displaycont(props) {
  return (
    <div className="disphot">
      {props.hot_list.map((d, i) => {
        return (
          <div key={i} className="news">
            {d.thumbnail.startsWith("https://") ? (
              <img className="thumb" src={d.thumbnail} alt="" />
            ) : (
              <img className="thumbreddit" src="reddit_icon_1.png" alt="" />
            )}
            <div className="text">
              <p>{d.title}</p>
            </div>
            <div className="newsfooter">
              <a href={"https://old.reddit.com".concat(d.permalink)}>
                <img
                  src="comment-white-oval-bubble.svg" alt="" title="comment"
                />
              </a>
              <a href={d.url}>
                <img src="chain-links.svg" alt="" title="link" />
              </a>
              <span title="total comments">
                {d.num_comments < 1000
                  ? d.num_comments
                  : (d.num_comments / 1000).toFixed(2) + "K"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Displaycont;
