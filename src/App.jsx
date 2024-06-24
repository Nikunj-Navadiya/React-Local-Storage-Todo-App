import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './style.css';
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

function App() {
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [record, setRecord] = useState([]);
  const [editId, seteditId] = useState("")

  useEffect(() => {
    const save = JSON.parse(localStorage.getItem('user')) || []
    setRecord(save)
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name && !task) {
      alert("Please enter both name and task.");
      return false;
    }

    let obj = {
      id: Math.floor(Math.random() * 1000),
      name,
      task,
    };

    if (editId) {
      let up = record.map((val) => {
        if (val.id === editId) {
          val.name = name;
          val.task = task;
        }
        return val;
      });
      localStorage.setItem('user', JSON.stringify(up));
      setRecord(up);
      alert("Record updated...");
    } else {
      let all = [...record, obj];
      localStorage.setItem('user', JSON.stringify(all));
      setRecord(all);
      alert("Record added...");
    }
    setName("");
    setTask("");
    seteditId("");
  };

  const handleDelete = (id) => {
    let remove = record.filter((val) => val.id !== id);
    localStorage.setItem('user', JSON.stringify(remove));
    setRecord(remove);
    alert("Record deleted...");
  };

  const handleEdit = (val) => {
    setName(val.name);
    setTask(val.task);
    seteditId(val.id);
  };

  return (
    <div>

      <header>
        <div className="logo">
          <img src="/1.png" />
        </div>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-lg-5 mx-auto mb-3">
            <div className="app rounded">
              <form className='text-center' onSubmit={handleSubmit}>
                <input type="text" placeholder='Add New Task' className=' border-0 px-3' onChange={(e) => setName(e.target.value)} value={name} /><br></br>
                <textarea placeholder='Task Description' className=' border-0 px-3' onChange={(e) => setTask(e.target.value)} value={task} /><br></br>
                <div className="icon d-flex justify-content-end align-items-center">
                  <button style={{ border: 'none', background: "none" }} type="submit"><FaPlus /></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {
            record.map((val) => {
              return (
                <div className="box col-3 p-2 " key={val.id}>
                  <div className="box-1 p-3">
                    <h6>{val.name}</h6>
                    <p>{val.task}</p>
                    <span className='d-flex justify-content-end align-items-center'>
                      <i onClick={() => handleEdit(val)} className="me-2"><FaEdit /></i>
                      <i onClick={() => handleDelete(val.id)}><RiDeleteBin6Fill /></i>
                    </span>
                  </div>
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