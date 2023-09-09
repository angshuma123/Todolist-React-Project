import React, { useState,useEffect } from 'react';
import "./style.css";
const GetLocalData=()=>{
  const lists=localStorage.getItem("myTodoList")
  if (lists){
    return JSON.parse(lists);
  }
  else{
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [inputItem, setInputItem] = useState(GetLocalData());
  const[isEditedItem,setIsEditedItem]=useState("");
  const[toggleButton,setToggleButton]=useState(false);

  const iconStyle = {
    position: 'relative',
    left: '129px'
  };

  const AddItem = () => {
    if (!inputData) {
      alert("Please add Items");
    }else if(inputData && toggleButton){
      setInputItem(
        inputItem.map((curEl)=>{
          if(curEl.id===isEditedItem){
            return {...curEl,name:inputData};
          }
          return curEl;
        })
      );
      setInputData([]);
      setIsEditedItem(null);
      setToggleButton(false);

    }
     else {
      const newInputData={
        id:new Date().getTime().toString(),
        name:inputData,
      }
      setInputItem([...inputItem,  newInputData]); 
      setInputData(""); 
    }
  };
  const editItem=(index)=>{
  const edited_item=inputItem.find((curElm)=>{
    return curElm.id===index;
  })
  setInputData(edited_item.name);
  setIsEditedItem(index);
  setToggleButton(true);
  }
  const DeleteItem=(index)=>{
    const updatedList=inputItem.filter((curelElement)=>{
      return curelElement.id !==index;
    })
    setInputItem(updatedList);
  }
  const DeleteAll=()=>{
    setInputItem([]);
  }
  useEffect(()=>{
  localStorage.setItem("myTodoList",JSON.stringify(inputItem))
  },[inputItem])

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo"/>
            <figcaption>Add Your Items Here 😉</figcaption>
          </figure>
          <div className="addItems">
            <input type='text' placeholder='✍️Add Items' className='form-control' value={inputData} onChange={(e) => setInputData(e.target.value)}/>
            {toggleButton ?  <i className="fa fa-edit add-btn" onClick={AddItem}></i> : <i className="fa fa-plus add-btn" onClick={AddItem}></i>}
           
            <div className="showItems">
              {inputItem.map((curelement) => (
                <div className="eachItem" key={curelement.id}>
                  <h3>{curelement.name}</h3>
                  <i className="fa fa-edit add-btn" style={iconStyle} onClick={()=>editItem(curelement.id)}></i>
                  <i className="fa fa-trash-alt add-btn" onClick={()=>DeleteItem(curelement.id)}></i>
                </div>
              ))}
            </div>
            <div className="showItems">
              <button className='btn effect04' data-sm-link-text="Remove All" onClick={DeleteAll}><span>CHECK LIST</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
