import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react'
import styles from './TaskForm.module.css'; 

import { ITask } from '../interfaces/Task';
interface Props {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>//alterando o state de uma lista
  task?: ITask | null;
  handleUpdate?(id: number, title: string, difficulty:number):void;
}

const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate}: Props) => { 

   const [id, setId] = useState<number>(0);
   const [title, setTitle] = useState<string>("");
   const [difficulty, setDifficulty] = useState<number>(0); 


   useEffect(() => {
      if(task){
         setId(task.id)
         setTitle(task.title)
         setDifficulty(task.difficulty)
      }

   }, [task])//quando tiver um update task ele vai ser atualizado e vai ter o useEffect novamente


   const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if(handleUpdate){
            handleUpdate(id, title, difficulty)            
      }else{
            
         const id = Math.floor(Math.random() * 1000);
         const newTask:ITask = {id, title, difficulty};

         //! estou afirmando que vai vir a lista
         setTaskList!([...taskList, newTask])//add tudo que tem na task list e newTask

         setTitle("");
         setDifficulty(0) 
      }
      
   } 

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
         if(e.target.name === "title"){
             setTitle(e.target.value);
         }else {
            setDifficulty(parseInt(e.target.value));
         } 

   }


  return (
      <form className={styles.form} onSubmit={addTaskHandler} >
         <div className={styles.input_container}>
            <label htmlFor="title">Título:</label>
            <input 
               type="text"
               name="title" 
               placeholder="Titúlo da tarefa"
               onChange={handleChange} 
               value={title}
               />
         </div>
         <div className={styles.input_container}> 
            <label htmlFor="difficulty">Dificuldade:</label>
            <input 
               type="text" 
               name="difficulty" 
               placeholder="Dificuldade da tarefa" 
               onChange={handleChange} 
               value={difficulty}
               />
         </div> 

          <input type="submit" value={btnText}/>
      </form>
  )
}

export default TaskForm;