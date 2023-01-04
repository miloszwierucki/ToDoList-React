import { FC, useState } from "react";
import "./App.css";

interface ITask {
  id: number;
  task: string;
  isEditMode?: boolean;
  isCompleted?: boolean;
}

interface INewTask extends ITask {
  allTasks: ITask[];
  setAllTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const NewTask: FC<INewTask> = ({
  id,
  task,
  isEditMode,
  isCompleted,
  allTasks,
  setAllTasks,
}) => {
  const [inputText, setInputText] = useState(task);
  const [editButton, setEditButton] = useState("Edit");

  const deleteTask = (id: number) => {
    const newTasks = allTasks.filter((task) => task.id !== id);
    setAllTasks(newTasks);
  };

  const editTask = (id: number) => {
    const currentTask = allTasks.find((task) => task.id === id);
    currentTask!.isEditMode = !currentTask!.isEditMode;
    setEditButton(currentTask!.isEditMode ? "Save" : "Edit");
    setAllTasks([...allTasks]);
  };

  const completeTask = (id: number) => {
    const currentTask = allTasks.find((task) => task.id === id);
    currentTask!.isCompleted = !currentTask!.isCompleted;
    setAllTasks([...allTasks]);
  };

  return (
    <li>
      <input
        type="checkbox"
        defaultChecked={isCompleted}
        onClick={(e) => completeTask(id)}
      />
      {isEditMode ? (
        <input
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
      ) : (
        <label>{inputText}</label>
      )}
      {!isCompleted && (
        <button className="edit" onClick={() => editTask(id)}>
          {editButton}
        </button>
      )}
      <button className="delete" onClick={() => deleteTask(id)}>
        Delete
      </button>
    </li>
  );
};

function App() {
  const [addInput, setAddInput] = useState("");
  const [allTasks, setAllTasks] = useState([] as ITask[]);

  const addNewTasks = () => {
    if (addInput === "") return;
    setAllTasks([
      ...allTasks,
      {
        id: Math.random() * 1000,
        task: addInput,
        isEditMode: false,
        isCompleted: false,
      },
    ]);
  };

  const completeAll = () => {
    const newTasks = allTasks.map((task) => {
      task.isCompleted = true;
      return task;
    });
    setAllTasks(newTasks);
  };

  return (
    <div className="App">
      <main className="container">
        <section className="new-task-section">
          <label htmlFor="new-task">Add Item</label>
          <div className="add-new-task">
            <input
              id="new-task"
              type="text"
              onChange={(e) => {
                setAddInput(e.target.value);
              }}
            />
            <button id="add-button" onClick={addNewTasks}>
              Add
            </button>
          </div>
        </section>

        <section className="tasks-section">
          <h3 className="title-section">Todo</h3>
          <button id="check-all-button" onClick={completeAll}>
            Check All
          </button>
          <ul id="incomplete-tasks">
            {allTasks
              .filter((task) => task.isCompleted === false)
              .map(({ id, task, isEditMode, isCompleted }) => (
                <NewTask
                  key={id}
                  id={id}
                  task={task}
                  isEditMode={isEditMode}
                  isCompleted={isCompleted}
                  allTasks={allTasks}
                  setAllTasks={setAllTasks}
                />
              ))}
          </ul>
        </section>

        <section className="tasks-section">
          <h3 className="title-section">Completed</h3>
          <ul id="completed-tasks">
            {allTasks
              .filter((task) => task.isCompleted === true)
              .map(({ id, task, isEditMode, isCompleted }) => (
                <NewTask
                  key={id}
                  id={id}
                  task={task}
                  isEditMode={isEditMode}
                  isCompleted={isCompleted}
                  allTasks={allTasks}
                  setAllTasks={setAllTasks}
                />
              ))}
          </ul>
        </section>
      </main>
      <footer>
        <p>
          Created by <a href="https://wierucki.com">Miłosz Wierucki</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
