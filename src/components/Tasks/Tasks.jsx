import Task from "./Task";
import './tasks.scss'

function Tasks({handleContentEditable, tasks, filter, handleDeleteTask, handleChangeStatus}) {
    return (
        <ul className='tasks'>
            {tasks
                .filter((task) => filter === 'all' ? true : task.status === filter)
                .map((task, id) =>
                    <Task
                        key={task.id}
                        handleDeleteTask={handleDeleteTask}
                        handleChangeStatus={handleChangeStatus}
                        handleContentEditable={handleContentEditable}
                        task={task}
                    />)}
        </ul>
    );
}

export default Tasks;