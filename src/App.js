
import React, { useState } from 'react';
import Button from '@material-ui/core/Button'
import Textfield from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import store from './redux/store';
import * as actions from './redux/actiontypes'
import {useSelector } from 'react-redux';


function App() {


  const [todo,SetTodo]=useState()
  const [update,setUpdate]=useState()
  const [open, setOpen] = React.useState(false);
  const [updateid, setUpdateId]=useState()

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Roboto',
        'sans-serif'
  
      ].join(','),
  
    }})


  const handleClickOpen = (e) => {
    setUpdateId(e.id)
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
    
  };


  const handleChange=(e)=>{
    const data=e.target.value
    SetTodo(data)
  
  }

  const handleChangeUpdate=(e)=>{
    const data=e.target.value
    setUpdate(data)
 
  }
  
  const AddTodo=()=>{
    if(todo == null || todo==''){
      
      return 
     
    }else{
    
      store.dispatch({
        type:actions.ADD_TODO,
        payload:{
          agenda:todo
        }
      })

    }

  }
  const DeleteTodo=(e)=>{
    store.dispatch({
      type:actions.REMOVE_TODO,
      payload:{
        id:e.id
      }
    })
  }
  const UpdateTodo=(e)=>{
    if(update== null || update ==''){
  
      return
    }else{
      store.dispatch({
        type:actions.UPDATE_TODO,
        payload:{
          id:updateid,
          agenda:update
        }
      })
      handleClose()
    }
  }

 const data=useSelector((state)=> state)

  return (
  
    <ThemeProvider theme={theme}>
    <div style={{textAlign:"center", marginTop:'5%'}}>

      <Textfield 
      label='TODO'
      placeholder="enter a agenda"
      variant='outlined'
      onChange={handleChange}
      />&nbsp; &nbsp;
      <Button variant="contained" color='primary'style={{padding:'15px',borderRadius:'15px'}} onClick={AddTodo} >ADD</Button>

      <Grid container style={{marginTop:'5%'}} >
      {data.map((e)=>{
     
        return ( <React.Fragment key={e.id}>
         <Grid item xs={6} style={{border:'0.1px solid 	#C0C0C0'}} >
           <Typography variant='h6' style={{textAlign:'right',paddingTop:'8px'}}>{e.agenda}</Typography>
         </Grid>
         <Grid item xs={6} style={{border:'0.1px solid 	#C0C0C0',textAlign:'left'}} >
         &nbsp; &nbsp; <Button variant="contained" color='primary' size='small' style={{marginTop:'10px'}} onClick={()=>handleClickOpen(e)}>UPDATE</Button>
         <Button variant="contained" color='secondary' style={{position:'absolute',marginLeft:'10px',marginTop:'10px'}} size='small' onClick={()=>DeleteTodo(e)}>DELETE</Button>

         <Dialog open={open} onClose={handleClose} >
           <DialogTitle>UPDATE TODO</DialogTitle>
           <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label=" TODO"
         
            fullWidth
            onChange={handleChangeUpdate}
            required 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=>UpdateTodo(e)}>
            Update
          </Button>
        </DialogActions>

         </Dialog>
           
         </Grid>
         </React.Fragment>)
    
      })}
       </Grid>
    </div>
    </ThemeProvider>

  );
}

export default App;
