import './App.css';
import { Box, OutlinedInput, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


function TextInput({inputText, onChangeInput, onClickAdd}) {
    return (
        <Box display={'flex'} flexDirection={'row'}>
            <OutlinedInput value={inputText} onChange={(e) => onChangeInput(e.target.value) } style={{flexGrow: 1, backgroundColor: 'white', marginRight: 10}} />
            <Button onClick={() => onClickAdd(inputText)} style={{ backgroundColor: '#788fd2', maxHeight: '100vh'}}>
                <AddIcon style={{color: 'white'}} />
            </Button>
        </Box>
    );
};

export default TextInput