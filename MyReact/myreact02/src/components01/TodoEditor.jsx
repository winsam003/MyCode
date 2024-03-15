
import { useState, useRef } from "react";
import "./TodoEditor.css";

const TodoEditor = ({onCreate}) => {

  const [content, setContent] = useState("");

  const onChangeContent = (e) => {
    setContent(e.target.value);
  }; //onChangeContent

  const inputRef = useRef();
  const onSubmit = (e) => {

    if (!content)  { // content 가 비어있으면 
      e.preventDefault();
      inputRef.current.focus();
      return;
    } else {
      onCreate(content); // 부모(App)로부터 전달받은 함수
    }
    setContent("");
  }; //onSubmit

  const onKeyDown = (e) => {
    if (e.keyCode === 13) { onSubmit(); }
  }; //onKeyDown

  return (
    <div className="TodoEditor">
      <h4>새로운 Todo 작성하기 🖋🖍</h4>
      <div className="editor_wrapper">
        <input  ref={inputRef}
                value={content} 
                onChange={onChangeContent}
                onKeyDown={onKeyDown}
                placeholder="새로운 일정 입력하세요..."  />
        <button onClick={onSubmit} >추가</button>
      </div>
    </div>
  );  
}; //TodoEditor
export default TodoEditor