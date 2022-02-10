import React,{useState,useRef} from 'react';
import './App.css';

type FormElement = React.FormEvent<HTMLFormElement>;
interface Itask {
    name:string;
    done:boolean;
}
function App():JSX.Element {
  const [state,setState] = useState<string>("")
  const [ListsTask,setTasks] = useState<Itask[]>([])
  const taskInput = useRef<HTMLInputElement>(null)
  const handleSubmit = (e:FormElement):void => {
      e.preventDefault()
      addTask(state)
      setState("")
      taskInput.current?.focus()
  }
  const addTask = (name:string):void => {
    if (!name) {
      return alert("Empty Field")
    }
    const newTask: Itask[]= [...ListsTask, {name, done:false}]
    setTasks(newTask)

  }
  const toggleDoneTask = (i:number):void => {
      const newTasks:Itask[] = [...ListsTask];
      newTasks[i].done = !newTasks[i].done;
      setTasks(newTasks)
  }
  const RemoveTask = (i:number):void => {
    const newTasks:Itask[] = [...ListsTask];
    newTasks.splice(i,1)
    setTasks(newTasks)
  }
  return (
      <div className="container p-4">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h1>To Do List</h1>
                <form onSubmit={e => {handleSubmit(e)}}>
                    <input type="text" 
                        value={state} 
                        onChange={ e => {setState(e.target.value)}} 
                        className="form-control"
                        autoFocus
                        ref={taskInput}
                    />
                    <button className='btn btn-success btn-block mt-2'>
                        ADD
                    </button>

                </form>
              </div>
            </div>
            {
              ListsTask.map((t:Itask,i:number) => {
                  return (
                      <div key={i} className='card card-body mt-2'>
                          <h2 style={{textDecoration: t.done ? "line-through" : ""}}>{t.name}</h2>
                          <div>
                              <button className='btn btn-secondary' onClick={()=>{toggleDoneTask(i)}}>
                                  {t.done ? "✅" : "❌"}
                              </button>
                          </div>
                          <button className='btn btn-danger mt-4' onClick={()=>{RemoveTask(i)}}>
                              🗑
                          </button>
                      </div>
                  )
              })
            }
          </div>
        </div>
      </div>
  );
}

export default App;
