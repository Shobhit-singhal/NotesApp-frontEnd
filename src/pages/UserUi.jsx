import React from 'react'
import Note from '../componenets/Note'

const UserUi = () => {
  return (
    <div className="min-h-screen w-full p-3"
     style={{
        "background": "linear-gradient(315deg, #04524B, #011F79)"}}>
        <div className='w-full max-w-[700px] backdrop-blur-[100px] hover:shadow-md shadow-gray-400 m-auto flex flex-col font-serif items-center p-2 px-2 md:px-6 rounded-xl'>
            <p className='text-white text-2xl mt-5 font-bold'>Welcome User!</p>
            <div className='w-full bg-slate-900/60 m-2 rounded-xl flex flex-col mt-4 items-center'>
                <div className='text-xl text-white mt-3 bg-slate-900/70 w-full text-center py-2'>Your Notes</div>
                <div className='flex flex-wrap w-full gap-3 justify-center py-6'>
                   <Note title="title" date="date" content="content"/>
                   <Note title="title" date="date" content="content"/>
                   <Note title="title" date="date" content="content"/>
                   <Note title="title" date="date" content="content"/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserUi
