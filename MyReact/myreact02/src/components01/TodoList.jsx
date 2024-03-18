

// ======================================================================
import "./TodoList.css";
import TodoItem  from "./TodoItem";
import { useState, useMemo } from "react";

const TodoList = ({todo, onUpdate, onDelete}) => {

  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => { setSearch(e.target.value) }


  const getSearchResult = () => {
    return search === "" ? todo 
            : todo.filter( (it) => it.content.toLowerCase().includes( search.toLowerCase()));
  }
  // ------------------------------------------------

 
  const analyzeTodo = () => {
    console.log("** analyzeTodo 호출!! **");
    const totalCount=todo.length;

    const doneCount= todo.filter( (it) => it.isDone ).length;
    const notDoneCount= totalCount - doneCount;
    return { totalCount, doneCount, notDoneCount } ;
  }; //analyzeTodo

  const {totalCount, doneCount, notDoneCount} = useMemo(analyzeTodo, [todo]);
  // analyzeTodo를 호출하는 구문은 없음 하지만 todo 의존성배열이 바뀐다는 것은 부모 컴포넌트에서 useState가 발생하는 것이고 useState가 발생하면 리렌더링이 되므로 
  // analyzTodo도 재 실행 됨

  return (
    <div className="TodoList">
      <h3>Todo List 🌻</h3>
      <div>
        <div>* 총일정 갯수: {totalCount}</div>
        <div>* 완료된 일정: {doneCount}</div>
        <div>* 미완료 일정: {notDoneCount}</div>
      </div>
      <input  className="searchbar" 
              value={search}
              onChange={onChangeSearch}
              placeholder="검색어를 입력하세요 ~" />
      <div className="list_wrapper" >

        { getSearchResult().map( (it) => ( <TodoItem key={it.id}  {...it} 
                                                    onUpdate={onUpdate} 
                                                    onDelete={onDelete} /> ) )}
      </div>
    </div>
  );
};//TodoList
export default TodoList;