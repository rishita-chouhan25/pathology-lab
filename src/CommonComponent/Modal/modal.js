import React, {useState,useEffect} from 'react'
import './modal.css';
import axios from 'axios';
// import { response } from 'express';
const Modal = ({setOpenCreate}) => {
  const [input,setInput] = useState({"name": " ","age":"","address":"","mobileNo":"","examinedBy":"","examinedDate":"","test":"","reportDate":""});
  const [listOfTest, setListOfTest] = useState([])
  useEffect(()=>{
    handleSelectOption();
  },[])

  const handleSelectOption = async() => {
    await axios.get('http://localhost:8006/test/get').then(response=>{
      const data = response.data.data;
      setListOfTest(data);
      setInput({...input,test:data[0]._id})
     }).catch(err=>{
      
      console.log(err);
     })
  }
  
  const handleInput=(event)=>{
    setInput({...input,[event.target.name]:event.target.value})
  }
  const handleCreateNew =async ()=>{
    await axios.post("http://localhost:8006/patient/post",input).then(resp =>{
      console.log(resp)
      window.location.reload();
    }).catch(err=>{
      alert("please fill every Details")
      console.log(err)
    })
  }
  return (
    <div className="modal">
        <div className="modal-card">
          <div className="modal-titlebox">
          <div className="modal-title">Creat New</div>
          <div className="X-btn" onClick={()=>{setOpenCreate(prev=>!prev)}}>X</div>
          </div>
          <div className="modal-body">
            <div className="inputRowmodal">
              <div className="inputBox">
                <div className="input-label">Name</div>
                <input type="text" name='name' value={input.name} onChange={(event)=>{handleInput(event)}} className='input-modal' placeholder='Enter a name.' />
                          
              </div>
              {/* ****************** */}
               <div className="inputBox">
                <div className="input-label">Age</div>
                <input type="text" name='age' value={input.age} onChange={(event)=>{handleInput(event)}} className='input-modal' placeholder='Enter  Age.' />
                          
              </div>
              </div>
              {/* ********** */}
              <div className="inputRowmodal">
              <div className="inputBox">
                <div className="input-label">Address</div>
                <input type="text" name='address' value={input.address} onChange={(event)=>{handleInput(event)}} className='input-modal' placeholder='Enter your Address.' />
                          
              </div>
              {/* ****************** */}
               <div className="inputBox">
                <div className="input-label">mobileNo number</div>
                <input type="text" name='mobileNo' value={input.mobile} onChange={(event)=>{handleInput(event)}} className='input-modal' placeholder='Enter  mobileNo Number.' />
                          
              </div>
              </div>
              {/* ******************** */}
              <div className="inputRowmodal">
              <div className="inputBox">
                <div className="input-label">Examined By</div>
                <input type="text" name='examinedBy' value={input.examinedBy} onChange={(event)=>{handleInput(event)}} className='input-modal' placeholder='Examined By.' />
                          
              </div>
              
               <div className="inputBox">
                <div className="input-label">Examined Date</div>
                <input type="Date" name='examinedDate' value={input.examinedDate} onChange={(event)=>{handleInput(event)}} className='input-modal' placeholder='Examined Date.' />
                          
              </div>
              </div>
              {/* ************************ */}
              <div className="inputRowmodal">
              <div className="inputBox">
                <div className="input-label">Selected test</div>
                <select className='input-modal' name='test' value={input.test} onChange={(Event)=>handleInput(Event)} >
                  {
                    listOfTest?.map((item,index)=>{
                      return(
                        <option value={`${item._id}`}>{item.name}</option>
                      );
                    })
                  }
                  {/* <option>Test1</option>
                  <option>Test2</option>
                  <option>Test3</option> */}

                </select>
                          
              </div>
              {/* ****************** */}
               <div className="inputBox">
                <div className="input-label"   >Report Date</div>
                <input type="Date" name='reportDate'  className='input-modal' onChange={(event)=>{handleInput(event)}} value={input.reportDate} placeholder='Report Date.' />
                          
              </div>
              </div>
              <div className="btnDivModal">
                <div className="Submit-Modal" onClick={handleCreateNew}>Submit</div>
                <div className="Submit-Modal">Create</div>
              </div>
          </div>
        </div>
      </div> 
      
  )
}

export default Modal