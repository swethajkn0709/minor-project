import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post(API_URL, { text });
    setText('');
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`${API_URL}/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditingText(task.text);
  };

  const saveEdit = async (id) => {
    if (!editingText.trim()) return;
    await axios.put(`${API_URL}/${id}`, { text: editingText });
    setEditingId(null);
    setEditingText('');
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>My Todo List</h1>

      <form onSubmit={addTask} className="add-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />

            {editingId === task._id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => saveEdit(task._id)}
                onKeyDown={(e) => e.key === 'Enter' && saveEdit(task._id)}
                autoFocus
              />
            ) : (
              <span onDoubleClick={() => startEdit(task)}>{task.text}</span>
            )}

            <div className="actions">
              <button onClick={() => startEdit(task)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p className="empty">No tasks yet. Add one above!</p>}
    </div>
  );
}

export default App;
