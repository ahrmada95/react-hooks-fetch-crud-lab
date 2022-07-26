import React, {useState, useEffect} from "react";
import QuestionItem from './QuestionItem'


function QuestionList() {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      const req = await fetch("http://localhost:4000/questions");
      const res = await req.json();
      setQuestionList(res) 
    }
    fetchData();
  }, [])

  const handleDelete = async(id) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method:"DELETE",
      headers: {
        "content-type":"application/json"
      },
    })
    setQuestionList(questionList.filter((question) => question.id !== id))
  }

  const handleAnswerChange = (id, correctIndex) => {
    let tempList = questionList;

    fetch(`http://localhost:4000/questions/${id}`, {
      method:"PATCH",
      headers: {
        "content-type":"application/json"
      },
      body: JSON.stringify( {
        "correctIndex": correctIndex
      })
    })
    //force rerender by changing state
    tempList[id-1].correctIndex = correctIndex;
    setQuestionList(tempList);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{
        questionList.map((question) => {
          const tempQuestion = { id:0, prompt:'', answers:[], correctIndex:0 };

          tempQuestion.id = question.id;
          tempQuestion.prompt = question.prompt;
          tempQuestion.answers = question.answers;
          tempQuestion.correctIndex = question.correctIndex;
          
          // return <QuestionItem key={question.id} question={JSON.parse(JSON.stringify(tempQuestion))}/>

          return <QuestionItem key={question.id} question={tempQuestion}  handleOnDelete={handleDelete} handleOnAnsChange={handleAnswerChange}/>
        })}</ul>
    </section>
  );
}

export default QuestionList;
