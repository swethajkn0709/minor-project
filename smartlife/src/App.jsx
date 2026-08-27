import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

const defaultTasks = [
  { id: "task-1", text: "study python", priority: "Low", completed: false },
  { id: "task-2", text: "clean room", priority: "Medium", completed: false },
  { id: "task-3", text: "complete minor project", priority: "High", completed: false },
  { id: "task-4", text: "read for 30 minutes", priority: "Low", completed: false },
];

const defaultHabits = [
  { id: "habit-1", name: "Drink Water", icon: "💧", completed: false },
  { id: "habit-2", name: "Exercise", icon: "🏃", completed: false },
  { id: "habit-3", name: "Study", icon: "📚", completed: false },
  { id: "habit-4", name: "Sleep on Time", icon: "😴", completed: false },
];

const avatars = [
  { id: "boy", emoji: "👦", label: "Boy" },
  { id: "girl", emoji: "👧", label: "Girl" },
  { id: "uncle", emoji: "👨", label: "Uncle" },
  { id: "aunty", emoji: "👩", label: "Aunty" },
  { id: "grandpa", emoji: "👴", label: "Grandpa" },
  { id: "grandma", emoji: "👵", label: "Grandma" },
];

function App() {
  /* LOGIN */

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("smartlife_logged_in") === "true"
  );

  const [loginName, setLoginName] = useState("");

  const [name, setName] = useState(
    localStorage.getItem("smartlife_name") || ""
  );

  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem("smartlife_avatar") || ""
  );

  /* TASKS */

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("smartlife_tasks");

    if (!saved) return defaultTasks;

    try {
      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) return defaultTasks;

      return parsed.map((task, index) => ({
        ...task,
        id: `task-${index}-${Date.now()}`,
        completed: Boolean(task.completed),
      }));
    } catch {
      return defaultTasks;
    }
  });

  /* HABITS */

  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("smartlife_habits");

    if (!saved) return defaultHabits;

    try {
      const parsed = JSON.parse(saved);

      if (!Array.isArray(parsed)) return defaultHabits;

      return parsed.map((habit, index) => ({
        ...habit,
        id: `habit-${index}`,
        completed: Boolean(habit.completed),
      }));
    } catch {
      return defaultHabits;
    }
  });

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Low");

  /* CALCULATIONS */

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

  const totalItems = tasks.length + habits.length;
  const completedItems = completedTasks + completedHabits;

  const overallPercentage =
    totalItems === 0
      ? 0
      : Math.round((completedItems / totalItems) * 100);

  const pendingTasks = tasks.length - completedTasks;

  /* SUGGESTION */

  const suggestion = useMemo(() => {
    if (overallPercentage === 100) {
      return "Amazing! You completed everything today! 🎉";
    }

    if (overallPercentage >= 75) {
      return "You're almost there! Keep going! 🚀";
    }

    if (overallPercentage >= 50) {
      return "Great progress! You're doing really well! 💪";
    }

    if (pendingTasks > 0) {
      return `You have ${pendingTasks} pending ${
        pendingTasks === 1 ? "task" : "tasks"
      }. Keep going! 💪`;
    }

    return "Start small and make today count! ✨";
  }, [overallPercentage, pendingTasks]);

  /* LOCAL STORAGE */

  useEffect(() => {
    localStorage.setItem(
      "smartlife_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(
      "smartlife_habits",
      JSON.stringify(habits)
    );
  }, [habits]);

  useEffect(() => {
    if (name) {
      localStorage.setItem("smartlife_name", name);
    }
  }, [name]);

  /* LOGIN */

  const handleLogin = (e) => {
    e.preventDefault();

    const cleanName = loginName.trim();

    if (!cleanName || !selectedAvatar) {
      return;
    }

    setName(cleanName);
    setIsLoggedIn(true);

    localStorage.setItem(
      "smartlife_name",
      cleanName
    );

    localStorage.setItem(
      "smartlife_avatar",
      selectedAvatar
    );

    localStorage.setItem(
      "smartlife_logged_in",
      "true"
    );
  };

  /* LOGOUT */

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("smartlife_logged_in");
  };

  /* ADD TASK */

  const addTask = () => {
    const text = newTask.trim();

    if (!text) return;

    const task = {
      id: `task-${Date.now()}-${Math.random()}`,
      text,
      priority,
      completed: false,
    };

    setTasks((prev) => [...prev, task]);

    setNewTask("");
    setPriority("Low");
  };

  /* TOGGLE TASK */

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  /* DELETE TASK */

  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  /* TOGGLE HABIT */

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
            }
          : habit
      )
    );
  };

  /* PRIORITY */

  const getPriorityClass = (value) => {
    if (value === "High") return "priority-high";
    if (value === "Medium") return "priority-medium";
    return "priority-low";
  };

  /* ================= LOGIN PAGE ================= */

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">

          <div className="login-logo">
            🌱
          </div>

          <h1>SmartLife</h1>

          <p className="login-subtitle">
            Make your day smarter.
          </p>

          <form onSubmit={handleLogin}>

            <label>
              What's your name?
            </label>

            <input
              type="text"
              value={loginName}
              onChange={(e) =>
                setLoginName(e.target.value)
              }
              placeholder="Enter your name"
              autoFocus
            />

            <label className="avatar-title">
              Choose your avatar
            </label>

            <div className="avatar-grid">

              {avatars.map((avatar) => (
                <button
                  type="button"
                  key={avatar.id}
                  className={`avatar-option ${
                    selectedAvatar === avatar.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedAvatar(avatar.id)
                  }
                >

                  <span className="avatar-emoji">
                    {avatar.emoji}
                  </span>

                  

                </button>
              ))}

            </div>

            <button
              type="submit"
              disabled={!loginName.trim() || !selectedAvatar}
            >
              Get Started ✨
            </button>

          </form>

          <p className="login-footer">
            Your personal daily companion 🌿
          </p>

        </div>
      </div>
    );
  }

  /* FIND SELECTED AVATAR */

  const currentAvatar =
    avatars.find(
      (avatar) => avatar.id === selectedAvatar
    ) || avatars[1];

  /* ================= DASHBOARD ================= */

  return (
    <div className="app">

      {/* HEADER */}

      <header className="topbar">

        <div className="brand">

          <div className="plant-logo">
            🌱
          </div>

          <div>
            <h1>SmartLife</h1>
            <p>Make your day smarter.</p>
          </div>

        </div>

        {/* ONLY AVATAR - NO NOTIFICATION */}

        <div className="header-actions">

          <button
            className="avatar dashboard-avatar"
            onClick={handleLogout}
            title="Click to logout"
          >
            {currentAvatar.emoji}
          </button>

        </div>

      </header>

      <main>

        {/* HERO */}

        <section className="hero">

          <div className="hero-content">

            <div className="hero-line"></div>

            <div>

              <h2>
                Make your day
                <br />
                <span>smarter</span>,{" "}
                <span className="purple">
                  simpler
                </span>{" "}
                & better.
              </h2>

              <p>
                Plan your tasks, build good habits and
                <br />
                achieve your goals – one step at a time. ✨
              </p>

            </div>

          </div>

          <div className="hero-plant">
            🌿
          </div>

        </section>

        {/* STATS */}

        <section className="stats-grid">

          <div className="greeting-card">

            <div className="greeting-icon">
              👋
            </div>

            <div>

              <h2>
                Good day, {name}!
              </h2>

              <p>
                You have {pendingTasks}{" "}
                {pendingTasks === 1
                  ? "task"
                  : "tasks"}{" "}
                remaining
              </p>

            </div>

          </div>

          <div className="stat-card blue">

            <div className="stat-icon">
              📋
            </div>

            <div>

              <strong>
                {completedTasks}/{tasks.length}
              </strong>

              <span>
                Tasks Completed
              </span>

            </div>

          </div>

          <div className="stat-card green">

            <div className="stat-icon">
              🎯
            </div>

            <div>

              <strong>
                {completedHabits}/{habits.length}
              </strong>

              <span>
                Habits Completed
              </span>

            </div>

          </div>

          <div className="stat-card pink">

            <div className="stat-icon">
              🔥
            </div>

            <div>

              <strong>
                {overallPercentage}%
              </strong>

              <span>
                Overall Progress
              </span>

            </div>

          </div>

        </section>

        {/* PROGRESS */}

        <section className="progress-card">

          <div className="progress-heading">

            <div>

              <small>
                OVERALL PROGRESS
              </small>

              <h3>
                You're doing great, {name}! ✨
              </h3>

            </div>

            <strong>
              {overallPercentage}%
            </strong>

          </div>

          <div className="progress-track">

            <div
              className="progress-fill"
              style={{
                width: `${overallPercentage}%`,
              }}
            ></div>

          </div>

          <p>
            {completedItems} of {totalItems} activities
            completed today
          </p>

        </section>

        {/* SMART SUGGESTION */}

        <section className="suggestion">

          <div className="suggestion-icon">
            ✨
          </div>

          <div>

            <small>
              SMART SUGGESTION
            </small>

            <p>
              {suggestion}
            </p>

          </div>

        </section>

        {/* CONTENT */}

        <section className="content-grid">

          {/* TASKS */}

          <div className="panel">

            <div className="panel-header">

              <div>

                <h2>
                  Today's Tasks
                </h2>

                <p>
                  Stay organized and productive.
                </p>

              </div>

              <span className="counter">
                {completedTasks}/{tasks.length}
              </span>

            </div>

            <div className="task-input-row">

              <input
                value={newTask}
                onChange={(e) =>
                  setNewTask(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTask();
                  }
                }}
                placeholder="What do you want to do today?"
              />

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
              >

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

              </select>

              <button
                onClick={addTask}
                className="add-btn"
              >
                + Add Task
              </button>

            </div>

            <div className="task-list">

              {tasks.map((task) => (

                <div
                  className={`task-item ${
                    task.completed
                      ? "completed-task"
                      : ""
                  }`}
                  key={task.id}
                >

                  <button
                    className={`checkbox ${
                      task.completed
                        ? "checked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleTask(task.id)
                    }
                  >
                    {task.completed ? "✓" : ""}
                  </button>

                  <span className="task-name">
                    {task.text}
                  </span>

                  <span
                    className={`priority ${getPriorityClass(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteTask(task.id)
                    }
                  >
                    🗑️
                  </button>

                </div>

              ))}

              {tasks.length === 0 && (
                <div className="empty">
                  No tasks yet. Add your first task! ✨
                </div>
              )}

            </div>

          </div>

          {/* HABITS */}

          <div className="panel">

            <div className="panel-header">

              <div>

                <h2>
                  Daily Habits
                </h2>

                <p>
                  Small habits, better days.
                </p>

              </div>

              <span className="counter">
                {completedHabits}/{habits.length}
              </span>

            </div>

            <div className="habit-list">

              {habits.map((habit) => (

                <button
                  className={`habit-item ${
                    habit.completed
                      ? "habit-completed"
                      : ""
                  }`}
                  key={habit.id}
                  onClick={() =>
                    toggleHabit(habit.id)
                  }
                >

                  <span className="habit-icon">
                    {habit.icon}
                  </span>

                  <span className="habit-name">
                    {habit.name}
                  </span>

                  <span
                    className={`habit-check ${
                      habit.completed
                        ? "active"
                        : ""
                    }`}
                  >
                    {habit.completed ? "✓" : ""}
                  </span>

                </button>

              ))}

            </div>

          </div>

        </section>

      </main>

      <footer>
        SmartLife • Your personal daily companion ✨
      </footer>

    </div>
  );
}

export default App;