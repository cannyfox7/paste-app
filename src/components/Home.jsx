import React from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Home = () => {
    const [title, setTitle] = useState('')
    const [value, setValue] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const pasteId = searchParams.get('Pid')
    const dispatch = useDispatch()
    const allPastes = useSelector((state) => state.paste.pastes)

   useEffect(() => {
    if (!pasteId) {
        setTitle('');
        setValue('');
        return;
    }

    const paste = allPastes.find((p) => p._id === pasteId);

    if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
    }
}, [pasteId]);

    function createPaste() {
        const selectedPaste = allPastes.find((p) => p._id === pasteId)

        const pasteData = {
            title: title,
            content: value,
            _id: selectedPaste?._id || pasteId || Date.now().toString(36),
            createdAt: selectedPaste?.createdAt || new Date().toISOString(),

        }

        if (pasteId && selectedPaste) {
            // Update existing paste
            dispatch(updateToPastes(pasteData))
        } else {
            // Create new paste
            if (!title || !value) {
                toast("Please set title and content");
                return;
            }
            dispatch(addToPastes(pasteData))
        }
            // after creating reset all inpput ui
            setTitle('')
            setValue('')
            setSearchParams({})

    }
  return (
    <div>
    <div>
        <input type="text" placeholder='Enter your title here' className='w-1/2 h-1/2 border-2 border-purple-400 rounded-md p-2 m-5' 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}/>
        <button className='bg-purple-500 text-white font-bold p-2 rounded-md'
        onClick={createPaste}>
            { pasteId ? 'Update My Paste' : 'Create My Paste' }
            
        </button>

    </div>
    <div> 
        <textarea placeholder='Enter your content here' className='w-2/3 h-1/2 border-2 border-purple-400 rounded-md p-2 m-5 '
        rows={15}
        value={value} 
        onChange={(e) => setValue(e.target.value)}/>
    </div>
    </div>
  )
}

export default Home