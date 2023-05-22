import './App.css';

import cx from 'classnames';
import logo from './logo.svg';
import { useState } from 'react';

function App() {
	const [todos, setTodos] = useState([
		{
			content: 'Pickup dry cleaning',
			isCompleted: true,
			warning: false,
		},
		{
			content: 'Get haircut',
			isCompleted: false,
			warning: false,
		},
		{
			content: 'Build a todo app in React',
			isCompleted: false,
			warning: true,
		},
	]);
	function handleKeyDown(e, i) {
		if (e.key === 'Enter' && todos[i].content !== '') {
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
		if (e.target.value !== '') {
			const newTodos = [...todos];
			newTodos[i].content = e.target.value;
			newTodos[i].warning = false;
			setTodos(newTodos);
		} else {
			displayAlert(i);
		}
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

	function removeEmptyTodos(e, i) {
		if (e.target.value === '') {
			removeTodoAtIndex(i);
		}
	}

	function displayAlert(i) {
		const newTodos = [...todos];
		newTodos[i].warning = true;
		setTodos(newTodos);
	}

	function NUncompleted() {
		return todos.filter((todo) => !todo.isCompleted).length;
	}
	return (
		<div className='app'>
			<header className='header'>
				<img src={logo} className='logo' alt='logo' />
				<h1>Todo App</h1>
				<p>
					{NUncompleted()} remaining out of {todos.length} tasks
				</p>
			</header>
			<form action='' className='todo-list'>
				{todos.map((todo, i) => (
					<div
						key={i}
						className={cx({
							'todo-is-completed': todo.isCompleted,
							todo: true,
						})}
					>
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
							onBlur={(e) => removeEmptyTodos(e, i)}
						/>
						<p
							className={cx({
								'display-warning': todo.warning,
								'hide-warning': !todo.warning,
							})}
						>
							Please enter a todo, with a minimum of 3 characters
						</p>
					</div>
				))}
			</form>
		</div>
	);
}

export default App;
