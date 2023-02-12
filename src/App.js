import {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import InputWrapper from "./components/InputWrapper/InputWrapper";
import Tasks from "./components/Tasks/Tasks";
import {TaskCounter} from "./components/TaskCounter/TaskCounter";
import {Filters} from "./components/Filters/Filters";
import {ClearCompleted} from "./components/ClearCompleted/ClearCompleted";
import {addTaskAPI, getAllTasksAPI} from "./helpers/api";


function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all")
    const [allDone, setAllDone] = useState(false)

    useEffect( () => {
        const controller = new AbortController()
        getAllTasksAPI(controller.signal).then(setTasks);

        return () => {
            controller.abort();
        }
    }, [])

    async function handleAddTask(value) {
        const task = await addTaskAPI({name: value, status: false})
            setTasks([...tasks, task]);
    }

    async function deleteTaskAPI(taskId) {
        const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {method: 'DELETE'});
        return await response.json();
    }

    function handleChangeStatus(task) {
        task.status = !task.status;
        setTasks([...tasks])
    }

    async function handleDeleteTask(taskToRemove) {
        await deleteTaskAPI(taskToRemove.id)
        setTasks(tasks.filter((task) => task !== taskToRemove))
    }

    async function handleDeleteAllTasks() {
        const filteredTasks = [];

        for (const task of tasks) {
            if (task.status) {
                await deleteTaskAPI(task.id)
            } else {
                filteredTasks.push(task);
            }
        }

        setTasks(filteredTasks)
    }

    function handleAllDone() {
        let done = tasks.every((task) => task.status === true)
        setTasks(tasks.map((task) => ({...task, status: !done})))
        setAllDone(!done)
    }

    function handleContentEditable(event, taskToChange) {
        setTasks(tasks.map((task) => {
            if (task === taskToChange) {
                task.name = event.target.innerText;
            }
            return task;
        }))
    }

    return (
        <>
            <Header/>
            <InputWrapper
                tasks={tasks}
                doneAll={allDone}
                handleAllDone={handleAllDone}
                handleAddTask={handleAddTask}
            />

            {!!tasks.length && (
                <div>
                    <Tasks
                        tasks={tasks}
                        filter={filter}
                        handleChangeStatus={handleChangeStatus}
                        handleDeleteTask={handleDeleteTask}
                        handleContentEditable={handleContentEditable}
                    />
                    <div>


                        <TaskCounter tasks={tasks} predicate={(task) => !task.status}/>
                        <Filters setFilter = {setFilter}/>
                        {!!tasks.filter((task) => task.status).length &&
                            <ClearCompleted onClick={handleDeleteAllTasks}/>}

                    </div>
                </div>
            )}

        </>
    );
}

export default App;
