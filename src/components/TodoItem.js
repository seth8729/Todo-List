import React from 'react';
import './TodoItem.css';
import { Box, Checkbox, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// TodoItem 元件
function TodoItem(props) {
  return (
    <Box className="todo-item" borderRadius={1}>
        <Box alignItems={'center'}>
          <Checkbox checked={props.todo.completed} onClick={() => props.onToggle(props.todo.id)} sx={{ color: '#899abe' }} />
          <span className={`todo-text ${props.todo.completed ? 'completed' : ''}`}>
              {props.todo.text}
          </span>
        </Box>
        <IconButton onClick={() => props.onDelete(props.todo.id)}>
            <CloseIcon style={{color: '#899abe'}} />
        </IconButton>
    </Box>
  );
};

export default TodoItem;
