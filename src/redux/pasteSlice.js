import { createSlice } from '@reduxjs/toolkit'
 import { toast } from 'react-toastify';

const initialState = {
  pastes: localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action ) => {
      state.pastes.push(action.payload)
      localStorage.setItem('pastes', JSON.stringify(state.pastes))
      toast("Paste created successfully")
  
    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === updatedPaste._id || item.id === updatedPaste._id);

      if (index >= 0) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast("Paste updated successfully");
      }
    },
    resetAllPastes: (state, action) => {

      state.pastes = []
      localStorage.removeItem('pastes')
      
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload; 

      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast("Paste deleted successfully");
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer