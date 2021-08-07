import { useState } from 'react'
import React from 'react'
import Task from './Task'

type TaskData = {
  id: number;
  name: string;
  isDone: boolean;
}

const TodoList = () => {

  const [inputfillValue, setInputfillValue] = useState<string>('')
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [donetasks, setDonetasks] = useState<TaskData[]>([])

  const resetfill = () => {
    setInputfillValue("")
    const input = document.querySelector('input')
    if(input !== null) input.value = ""
  }

  const onChangeCallback = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputfillValue(ev.target.value)
  }

  const addTask = (taskName: string) => {
    if (taskName == '') {
      alert("Task cannot be empty!!")
    } else {
      //use date.getTime() to get unique numeric id (https://www.w3schools.com/jsref/jsref_gettime.asp)
      const newId = (new Date()).getTime()

      // create new task list (หากจะ set ค่าให้กับตัวแปรที่สร้างจาก useState จะต้องสร้างข้อมูลใหม่หมดเสมอ)
      // spread syntax [...array] (https://www.freecodecamp.org/news/array-destructuring-in-es6-30e398f21d10/)
      const newTasks = [...tasks, { id: newId, name: taskName, isDone: false }]

      setTasks(newTasks)
      resetfill()
    }

  }

  const doneTask = (id: number) => {
    // create new task list (หากจะ set ค่าให้กับตัวแปรที่สร้างจาก useState จะต้องสร้างข้อมูลใหม่หมดเสมอ)
    const newTasks = tasks
    const newdoneTasks = donetasks
    let doneTask
    for(let i = 0 ; i < tasks.length ; ++i){
      if(id === tasks[i].id){
        newTasks[i].isDone = true
        newdoneTasks.push(tasks[i])
      }
    }
    setDonetasks(newdoneTasks)
    deleteTask(id)
  }

  const deleteTask = (id: number) => {
    // create new task list (หากจะ set ค่าให้กับตัวแปรที่สร้างจาก useState จะต้องสร้างข้อมูลใหม่หมดเสมอ)
    const newTasks = tasks.filter(x => x.id !== id)
    setTasks(newTasks)
  }

  const onKeyDownCallback = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if(ev.key === "Enter"){
      ev.preventDefault()
      addTask(inputfillValue)
    }
  }

  return (
    // task input and add button 
    <div className='mx-auto max-w-4xl'>
      <div className='flex space-x-1'>
        <input className='border border-gray-400 w-full text-2xl'
          onKeyDown={onKeyDownCallback} onChange={onChangeCallback}></input>
        <button className='border border-gray-400 w-8 font-bold' onClick={() => addTask(inputfillValue)}>+</button>
      </div>
      {tasks.map(x => <Task id={x.id} name={x.name} doneFn={doneTask} deleteFn={deleteTask} isDone = {x.isDone} />).reverse()}
      {donetasks.map(x => <Task id={x.id} name={x.name} doneFn={doneTask} deleteFn={deleteTask} isDone = {x.isDone} />).reverse()}
    </div>
  )
}

export default TodoList