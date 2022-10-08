import axios from "axios";
import React, { useContext, useState } from "react";
import "../index.css";
import { UserContext } from "./UserContext";
import { useEffect } from "react";

const Quote = () => {
  const [result, setResult] = useState([]);
  const { userState } = useContext(UserContext);
  const [changeScore, setChangedScore] = useState(false);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/quotes", {
  //       headers: { Authorization: "Bearer " + userState.accessToken },
  //     })
  //     .then((res) => {
  //       setResult({ result: res.data.quotes });
  //       console.log(result.id);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  const postUpvote = (result) => {
    if (result.givenVote === "upvote") {
      axios.delete(`http://localhost:8000/quotes/${result.id}/upvote`, {
        headers: { Authorization: "Bearer " + userState.accessToken },
      });
    } else {
      if (result.givenVote === "downvote") {
        console.log("tu sam", result.givenVote);
        axios.delete(`http://localhost:8000/quotes/${result.id}/downvote`, {
          headers: { Authorization: "Bearer " + userState.accessToken },
        });
      }
      axios.post(`http://localhost:8000/quotes/${result.id}/upvote`, null, {
        headers: { Authorization: "Bearer " + userState.accessToken },
      });
    }

    setChangedScore((prev) => !prev);
  };

  const postDownvote = (result) => {
    if (result.givenVote === "downvote") {
      axios.delete(`http://localhost:8000/quotes/${result.id}/downvote`, {
        headers: { Authorization: "Bearer " + userState.accessToken },
      });
    } else {
      if (result.givenVote === "upvote") {
        console.log("tu sam", result.givenVote);
        axios.delete(`http://localhost:8000/quotes/${result.id}/upvote`, {
          headers: { Authorization: "Bearer " + userState.accessToken },
        });
      }
      axios.post(`http://localhost:8000/quotes/${result.id}/downvote`, null, {
        headers: { Authorization: "Bearer " + userState.accessToken },
      });
    }

    setChangedScore((prev) => !prev);
  };

  useEffect(() => {
    const render = async () => {
      const { data } = await axios.get("http://localhost:8000/quotes", {
        headers: { Authorization: "Bearer " + userState.accessToken },
      });
      setResult(data.quotes);
    };
    render();
  }, [userState.accessToken, changeScore]);

  const percentage = (upvotes, downvotes) => {
    return ((100 / (upvotes + downvotes)) * upvotes).toFixed(0);
  };

  const renderedQuote = result.map((el) => {
    return (
      <div className="container">
        <div className="arrows">
          <span
            className="material-icons"
            onClick={() => {
              postUpvote(el);
            }}>
            arrow_drop_up
          </span>
          <span className="percents">
            {percentage(el.upvotesCount, el.downvotesCount)}%
          </span>
          {el.upvotesCount}/{el.downvotesCount}
          <span
            className="material-icons"
            onClick={() => {
              postDownvote(el);
            }}>
            arrow_drop_down
          </span>
        </div>
        <div className="quote-content">
          {el.content}
          <div className="quote-author">{el.author}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="quotes-container">
      <h1>QUOTE LIST</h1>
      <br></br>
      {renderedQuote}
    </div>
  );
};

export default Quote;
