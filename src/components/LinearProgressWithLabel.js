import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ minWidth: 50 }}>
                <Typography variant="body1" sx={{ color: '#899abe' }}>
                {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
                <Box sx={{ width: '100%' }}>
                <LinearProgress color="white" variant="determinate" {...props} />
            </Box>
        </Box>
    );
  }

  export default LinearProgressWithLabel