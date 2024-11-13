import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Switch, Typography } from '@mui/material';
import TodoItem from './TodoItem';
import Divider from './Divider'
import LinearProgressWithLabel from './LinearProgressWithLabel'
import TextInput from './TextInput';
import './App.css';

function App() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'task 1', completed: false },
        { id: 2, text: 'task 2', completed: false },
        { id: 3, text: 'task 3', completed: false },
    ]);
    const [inputText, onChangeInput] = useState("") // new Task input
    const [finishedMode, setFinishedMode] = useState(false)
    const todoListEndRef = useRef(null);
    const shouldScrollToBottom = useRef(false) //

    // delete todo item
    const handleDelete = useCallback((id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    });

    // complete todo item
    const handleToggle = useCallback((id) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
    });

    // add new todo item
    const addNewTask = (text) => {
        setTodos([...todos, {id: Date.now(), text: text, completed: false}]);
        onChangeInput("");
        shouldScrollToBottom.current = true 
    };

    const completionRate = useMemo(
        () => {
            return todos.length == 0 ? 0 : todos.filter((todo) => todo.completed).length / todos.length * 100;
        }
        , [todos]
    );

    // display list
    const todoList = useMemo(
        () => {
            if (finishedMode) {
                return [...todos].sort((a, b) => (a.completed - b.completed));
            } else {
                return todos
            }
        }
        , [todos, finishedMode]
    );

    // scroll to bottom when add new item
    useEffect(() => {
        if (todoListEndRef.current && shouldScrollToBottom.current) {
            todoListEndRef.current.scrollIntoView({ behavior: 'smooth' });
            shouldScrollToBottom.current = false
        }
    }, [todos.length]);

    return (
        <Box className="Background">
            <Box className={'App'}>
                <Box>
                    <Typography variant='h4' color='#899abe'>
                        Todo List
                    </Typography>
                    <Typography variant='body2' color='#c6cdda'>
                        Add things to do
                    </Typography>
                </Box>
                <Divider />
                <LinearProgressWithLabel value={completionRate} sx={{backgroundColor: 'white', height: 15, borderRadius: 10, '& .MuiLinearProgress-bar': {backgroundColor: '#98afe4'}}} />
                <Box sx={{ maxHeight: '300px' , overflowY: 'auto' }}>
                    {todoList.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={handleDelete}
                            onToggle={handleToggle}
                        />
                    ))}
                    <Box ref={todoListEndRef} />
                </Box>
                <Divider />
                <Box display={'flex'} justifyContent={'end'} alignItems={'center'}>
                    <Typography variant='body1' color='#899abe'>
                        Move done thing to end?
                    </Typography>
                    <Switch checked={finishedMode} onClick={() => setFinishedMode(!finishedMode)} />
                </Box>
                <Box>
                    <Typography variant='subtitle1' color='#899abe'>
                        Add to list
                    </Typography>
                    <TextInput
                        inputText={inputText}
                        onChangeInput={onChangeInput}
                        onClickAdd={() => addNewTask(inputText)}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default App;
