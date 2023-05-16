import './App.css';

import logo from './logo.svg';
import { useState } from 'react';

function App() {
	const [todos, setTodos] = useState([
		{
			content: 'Pickup dry cleaning',
			isCompleted: true,
		},
		{
			content: 'Get haircut',
			isCompleted: false,
		},
		{
			content: 'Build a todo app in React',
			isCompleted: false,
		},
	]);
	function handleKeyDown(e, i) {
		if (e.key === 'Enter') {
			createTodoAtIndex(e, i);
		}
		if (e.key === 'Backspace' && todos[i].content === '') {
			e.preventDefault();
			return removeTodoAtIndex(i);
		}
	}
	function createTodoAtIndex(e, i) {
		const newTodos = [...todos];
		newTodos.splice(i + 1, 0, {
			content: '',
			isCompleted: false,
		});
		setTodos(newTodos);
		setTimeout(() => {
			document.forms[0].elements[i + 1].focus();
		}, 0);
	}
	function updateTodoAtIndex(e, i) {
		const newTodos = [...todos];
		newTodos[i].content = e.target.value;
		setTodos(newTodos);
	}
	function toggleCompleteAtIndex(index) {
		const temporaryTodos = [...todos];
		temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
		setTodos(temporaryTodos);
	}

	function removeTodoAtIndex(i) {
		if (i === 0 && todos.length === 1) return;
		setTodos((todos) =>
			todos.slice(0, i).concat(todos.slice(i + 1, todos.length))
		);
		setTimeout(() => {
			document.forms[0].elements[i - 1].focus();
		}, 0);
	}
	return (
		<div className='app'>
			<header className='header'>
				<img src={logo} className='logo' alt='logo' />
			</header>
			<form action='' className='todo-list'>
				{todos.map((todo, i) => (
					<div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
						<div
							className={`checkbox`}
							onClick={() => toggleCompleteAtIndex(i)}
						>
							{todo.isCompleted && <span>&#x2714;</span>}
						</div>
						<input
							type='text'
							value={todo.content}
							onKeyDown={(e) => handleKeyDown(e, i)}
							onChange={(e) => updateTodoAtIndex(e, i)}
						/>
					</div>
				))}
			</form>
		</div>
	);
}

export default App;
