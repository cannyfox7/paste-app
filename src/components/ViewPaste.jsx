import React from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
const ViewPaste = () => {

    const {id} = useParams()
    const allPastes = useSelector((state) => state.paste.pastes)
    const paste = allPastes.find((p) => p._id === id)
  return (
     <div>
    <div>
        <input type="text" placeholder='Enter your paste here' className='w-1/2 h-1/2 border-2 border-purple-400 rounded-md p-2 m-5' 
        value={paste.title} 
        disabled
        onChange={(e) => setTitle(e.target.value)}/>
        <button className='bg-purple-500 text-white font-bold p-2 rounded-md'
        disabled
        >
            viewing My Paste
            
        </button>

    </div>
    <div> 
        <textarea placeholder='Enter your content here' className='w-2/3 h-1/2 border-2 border-purple-400 rounded-md p-2 m-5 '
        rows={15}
        value={paste.content} 
        disabled
        onChange={(e) => setValue(e.target.value)}/>
    </div>
    </div>
  )
}

export default ViewPaste