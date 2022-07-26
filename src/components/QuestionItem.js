import React from "react";

function QuestionItem({ question, handleOnDelete, handleOnAnsChange}) {
  //extract fields from question obj
  const { id, prompt, answers, correctIndex } = question; 
  //Make options for questions: iterate through answers array and make an array with an index and shit
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(event)=>handleOnAnsChange(id, event.target.value)}>{options}</select>
      </label>
      <button onClick={(e) => handleOnDelete(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
