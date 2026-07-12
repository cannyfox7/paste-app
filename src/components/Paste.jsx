import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes)
  const [searchTerm, setSearchTerm] = useState('')

  const dispatch = useDispatch()

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()))

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }

  return (
    <div className='flex flex-col items-center '>
      <input
        className='p-2 border border-purple-500  w-2/3 rounded-md mb-4'
        type='search'
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className=' w-full justify-items-center gap-4 flex flex-col items-center'>
        {filteredData.length > 0 && filteredData.map((paste) => {
          return (
            <div className='border border-gray-500 p-4 rounded-md w-3/4 ' >
              <div className='flex flex-row justify-between items-center'>
                <div className='font-bold text-lg border border-gray-500  rounded-md mb-4 px-2 py-1'
                key={paste?._id}>
                  {paste.title}
                </div>
                <div className='flex flex-row gap-2'>
                  <button className='bg-purple-400 text-white px-2 py-1 rounded-md hover:bg-purple-600 transition-colors duration-200'>
                      <Link to ={`/?Pid=${paste?._id}`}>
                        edit
                      </Link>
                  </button>
                   <button className='bg-purple-400 text-white px-2 py-1 rounded-md hover:bg-purple-600 transition-colors duration-200'>
                       <Link to ={`/pastes/${paste?._id}`}>
                        view
                      </Link>
                  </button>
                  <button className='bg-purple-400 text-white px-2 py-1 rounded-md hover:bg-purple-600 transition-colors duration-200'
                  
                  onClick={() => handleDelete(paste?._id)}>
                    delete
                  </button>
                  <button className='bg-purple-400 text-white px-2 py-1 rounded-md hover:bg-purple-600 transition-colors duration-200'
                  
                  onClick={() => {navigator.clipboard.writeText(paste.content)
                    toast.success("Copied to clipboard")
                  }
                  }>
                    copy
                  </button>
                 
                </div>
              </div>
              <div className='mt-2'>
                {paste.content}
              </div>

            </div>
          )
        })}
      </div>
    </div>

  )
}

export default Paste