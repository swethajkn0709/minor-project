import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [started, setStarted] = useState(false)

  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const [habits, setHabits] = useState([
    { name: '💧 Drink Water', completed: false },
    { name: '🏃 Exercise', completed: false },
    { name: '📚 Study', completed: false },
    { name: '😴 Sleep on Time', completed: false }
  ])

  const addTask = () => {
    if (task.trim() === '') return

    setTasks([
      ...tasks,
      {
        text: task,
        completed: false
      }
    ])

    setTask('')
  }

  const toggleTask = (index) => {
    setTasks(
      tasks.map((item, i) =>
        i === index
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }

  const toggleHabit = (index) => {
    setHabits(
      habits.map((habit, i) =>
        i === index
          ? { ...habit, completed: !habit.completed }
          : habit
      )
    )
  }

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length

  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length

  // WELCOME SCREEN
  if (!started) {
    return (
      <div className="welcome-screen">

        <div className="welcome-card">

          <div className="welcome-avatar">
            👩🏻‍💻
          </div>

          <h1>
            Welcome to <span>SmartLife</span> 🌱
          </h1>

          <p>
            Let's make your day smarter,
            simpler and better.
          </p>

          <input
            type="text"
            placeholder="What's your name?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            className="start-btn"
            onClick={() => {
              if (name.trim() !== '') {
                setStarted(true)
              }
            }}
          >
            Let's Start →
          </button>

          <small>
            Your personal daily companion ✨
          </small>

        </div>

      </div>
    )
  }

  // MAIN APP
  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div className="brand">
          <span className="logo">🌱</span>

          <div>
            <h1>SmartLife</h1>
            <p>Make your day smarter.</p>
          </div>
        </div>

        <div className="user-avatar">
          👩🏻‍💻
        </div>

      </header>


      {/* GREETING */}
      <section className="greeting">

        <div>
          <h2>
            👋 Good day, {name}!
          </h2>

          <p>
            You have{' '}
            <strong>
              {tasks.filter((task) => !task.completed).length}
            </strong>{' '}
            tasks remaining
          </p>
        </div>

      </section>


      {/* SMART SUGGESTION */}
      <section className="suggestion">

        <div className="suggestion-icon">
          ✨
        </div>

        <div>
          <h3>SMART SUGGESTION</h3>

          <p>
            {tasks.length === 0
              ? 'Start by adding your first task for today!'
              : `You have ${tasks.filter(
                  (task) => !task.completed
                ).length} pending task${
                  tasks.filter((task) => !task.completed).length !== 1
                    ? 's'
                    : ''
                }. Keep going! 💪`
            }
          </p>
        </div>

      </section>


      {/* TASK SECTION */}
      <section className="task-section">

        <div className="section-title">
          <div>
            <h2>Today's Tasks</h2>
            <p>Stay organized and productive.</p>
          </div>

          <span className="task-count">
            {completedTasks}/{tasks.length}
          </span>
        </div>


        <div className="task-box">

          <input
            type="text"
            placeholder="What do you want to do today?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTask()
              }
            }}
          />

          <button
            className="add-btn"
            onClick={addTask}
          >
            + Add Task
          </button>

        </div>


        <div className="tasks">

          {tasks.length === 0 ? (

            <div className="empty">
              📝 No tasks yet. Add something to get started!
            </div>

          ) : (

            tasks.map((item, index) => (

              <div
                className={`task ${
                  item.completed ? 'completed' : ''
                }`}
                key={index}
              >

                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(index)}
                />

                <span>
                  {item.text}
                </span>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                  title="Delete task"
                >
                  🗑
                </button>

              </div>

            ))

          )}

        </div>

      </section>


      {/* DAILY HABITS */}
      <section className="habits">

        <div className="section-title">

          <div>
            <h2>Daily Habits</h2>
            <p>Small habits, better days.</p>
          </div>

          <span className="habit-count">
            {completedHabits}/{habits.length}
          </span>

        </div>


        <div className="habit-grid">

          {habits.map((habit, index) => (

            <div
              className={`habit ${
                habit.completed ? 'habit-done' : ''
              }`}
              key={index}
              onClick={() => toggleHabit(index)}
            >

              <div className="habit-circle">
                {habit.completed ? '✓' : ''}
              </div>

              <span>
                {habit.name}
              </span>

            </div>

          ))}

        </div>

      </section>


      {/* FOOTER */}
      <footer>
        Made with 💚 for a smarter everyday
      </footer>

    </div>
  )
}

export default App