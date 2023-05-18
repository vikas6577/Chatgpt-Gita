import React from "react";
import Spinner from "./Spinner";
const MainFile = () => {
  const [question, setQuestion] = React.useState("");
  const [result, setResult] = React.useState(
    "Ask me anything about Bhagavad Geeta and Mahabharat"
  );
  const [loading, setLoading] = React.useState(false);
  // console.log(question)
  const handlequestion = async () => {
    // console.log(question);
    // if(!question){
    //     setError(true);
    //     return;
    // }
    setLoading(true);
    let response = await fetch("http://localhost:5000/handleAPIRequest", {
      method: "POST",
      body: JSON.stringify({
        question,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response.data);
    setResult(response.data);
    setQuestion("");
    setLoading(false);
  };
  return (
    <div className="mainclass">
      <div className="submainclass">
        <h1>Guide to Bhagavad Gita</h1>
        <div className="question">
          <h2>Write your question in the Input Box</h2>
        </div>
        <textarea
          className="inputBox"
          placeholder="Write your question here"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
        <button className="appButton" type="button" onClick={handlequestion}>
          Submit
        </button>
      </div>
      <div>
        {result !== "" && !loading ? (
          <div className="result">{result}</div>
        ) : (
          <div className="result">
            {" "}
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};
export default MainFile;
