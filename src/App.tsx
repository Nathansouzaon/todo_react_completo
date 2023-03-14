import React, {useState} from 'react';
import './App.css';  
import Footer from './components/Footer';
import Header from './components/Header'; 


import styles from './App.module.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList'; 

//interface
import { ITask } from './interfaces/Task';
import Modal from './components/Modal';

//app controla tudo sobre as tarefas
function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);//gerencia a tarefa que eu quero atualizar

  const deleteTask = (id: number) => {
      setTaskList(
        taskList.filter((task) => { 
          //retorno todos os el que tenham o id diferente do id que eu quero remover
          return task.id !== id;
        })
      )
  }

  const hideOrShowModal = (display: boolean) => {
      const modal = document.querySelector("#modal");
      if(display){
        modal!.classList.remove("hide");
      }else{
          modal!.classList.add("hide")
      }
  } 

  const editTask = (task: ITask):void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);//e alterado baseado quando eu clico no editar task ele sabe qual tarefa eu quero att
  } 

  const updateTask = (id: number, title: string, difficulty:number) => {

      const updatedTask: ITask = {id, title, difficulty}

      //atualiza os items atraves do map
      const updatedItems = taskList.map((task) => {
        //se o id da task atual e updatedtask se for quero att essa task se nao for permanece a task igual
        //verifica cada task na lista quando acha a tarefa certa pelo id trocar os dados dela pela task att 
        return task.id === updatedTask.id ? updatedTask : task
      })

      //atualiza a lista
      setTaskList(updatedItems) 

      hideOrShowModal(false);

  }

  return (
    <div> 
      <Modal children={<TaskForm btnText="Editar Tarefa" task={taskToUpdate} handleUpdate={updateTask}  taskList={taskList}/>} />
       <Header/>
          <main className={styles.main}> 
              <div>
                <h2>O que você vai fazer?
              </h2>
                 <TaskForm 
                  btnText="Criar Tarefa" 
                  taskList={taskList} 
                  setTaskList={setTaskList}/>
              </div>
              <div> 
                  <h2>Suas Tarefas: </h2> 
                  <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
              </div>
          </main> 
        <Footer/>
    </div>
  );
}

export default App;
