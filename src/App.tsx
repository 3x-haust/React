import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./app/hook";
import { RootState } from "./app/store";
import { addTodo, deleteTodo, toggleTodo, updateTodo } from "./features/todo/todoSlice";

function App() {
  const todoList = useSelector((state: RootState) => state.todos);
  const dispatch = useAppDispatch();

  console.log(todoList);

  const[txt, setTxt] = useState('');
  
  return (
    <>
      <h1>할일 관리</h1>

      <div>
        <input type="text" onChange={(e) => setTxt(e.target.value)} />
        <button onClick={() => {
          if (txt !== null && txt !== '') {
            dispatch(addTodo(txt));
            setTxt('');
            (document.querySelector('input') as HTMLInputElement).value = '';
          }else alert('내용을 입력해주세요.');
        
        }}>추가</button>

        <div>
          <h3>할일 내용</h3>
          <ul>
            {todoList.map(todo => (
              <div style={{display: "flex"}}>
                <li key={todo.id}>{todo.text}</li>
                <input type="checkbox" checked={todo.completed} onChange={() => {dispatch(toggleTodo(todo.id))}} />
                <button onClick={() => {
                  const text = prompt('수정할 내용을 입력해주세요.');
                  if (text !== null && text !== '') {
                    dispatch(updateTodo({id: todo.id, text: text}));
                  }else alert('내용을 입력해주세요.');
                }}>수정</button>
                <button onClick={() => {dispatch(deleteTodo(todo.id))}}>삭제</button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
