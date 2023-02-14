import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import tinycolor, { random } from "tinycolor2";
import "animate.css";

export default function App() {
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [bgColor, setBgColor] = useState("#151515");

  useEffect(() => {
    handleFetchQuote();
  }, []);

  const changeCol = () => {
    let randomColor = tinycolor.random();
    setBgColor(randomColor);
  };

  const handleFetchQuote = async () => {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (data) {
      setCurrentQuote(data.content);
      setCurrentAuthor(data.author);
      changeCol();
    }
  };

  return (
    <div
      className="App animate__animated animate__fadeIn"
      style={{ backgroundColor: bgColor }}
    >
      <div
        id="quote-box"
        className="container bg-white rounded d-flex flex-column justify-content-center align-items-center py-4"
        style={{ minHeight: "15em", width: "42em" }}
      >
        {currentQuote !== "" && (
          <div className="container w-75 d-flex justify-content-center align-items-center flex-column">
            <div className="d-flex row">
              <div className="col-1">
                <FontAwesomeIcon icon={faQuoteLeft} size="1x" />
              </div>
              <div
                id="text"
                className="ml-1 col-11"
                style={{ fontSize: "18px" }}
              >
                {currentQuote}
              </div>
            </div>

            <div
              id="author"
              className="no-select d-flex justify-content-end w-100 mt-4 blockquote-footer"
            >
              {currentAuthor}
            </div>

            <div className="d-flex align-items-center justify-content-between w-100 mt-3">
              <a id="tweet-quote" href="https://twitter.com/intent/tweet" target="_blank" >
                <div className="d-flex">
                  <FontAwesomeIcon
                    className="d-block"
                    size="2x"
                    icon={faTwitterSquare}
                    style={{ color: "#1D9BF0" }}
                  />
                </div>
              </a>
              <button
                onClick={handleFetchQuote}
                style={{
                  height: "28px",
                  fontSize: "12px",
                  borderRadius: "3px",
                  width: "9em",
                  backgroundColor: "#1D9BF0",
                  color: "white",
                  border: "none",
                }}
                className='no-select'
                id="new-quote"
              >
                New Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
