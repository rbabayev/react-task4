import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const addTask = () => {
    if (taskName.trim() !== "") {
      setTasks([...tasks, { name: taskName, id: Date.now() }]);
      setTaskName("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>ToDo List</h1>
      <div>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="
Write the name of the task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
