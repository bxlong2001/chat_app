import Box from '@mui/material/Box/Box'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import React from 'react'

const Spinner = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Box>
  )
}

export default Spinner