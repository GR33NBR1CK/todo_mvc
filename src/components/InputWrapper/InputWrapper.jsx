import InputTask from "./InputTask";
import './InputWrapper.scss';
import ToggleStatuses from "../ToggleStatuses/ToggleStatuses";

function InputWrapper({tasks, doneAll, handleAddTask, handleAllDone}) {
    return (
        <div className="inputWrapper">
            {!!tasks.length &&
                <ToggleStatuses doneAll={doneAll} handleAllDone={handleAllDone}/>
            }
            <InputTask
                handleAddTask={handleAddTask}/>
        </div>
    );
}

export default InputWrapper;