import './InputWrapper.scss';

function InputTask({value, handleInput, handleAddTask}) {
    return (
        <input
            className="inputTask"
            type="text"
            onChange={handleInput}
            onKeyUp={handleAddTask}
            placeholder="What needs to be done?"
            value={value}
        />
    );
}

export default InputTask;