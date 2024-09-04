import React,{useState,useEffect,useRef} from 'react';
import './navbar.css';
import imgLogo from '../../assets/pathologyLogo.jpg';
import Modal from '../Modal/modal';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

  const[openCreate, setOpenCreate] = useState(false);
  const [clickAddTest,setClickAddTest] = useState(false);
  const [input, setInput]=useState({"name":"","description":"","price":"","imgLink":"","fasting":"","abnormalRange":"","normalRange":""});

  const ref = useRef();
  useEffect(()=>{
    const checkIfClickOutside = (Event)=>{
      if(clickAddTest && ref.current && !ref.current.contains (Event.target)){
        setClickAddTest(false);
      }
    }
    document.addEventListener("mousedown",checkIfClickOutside);
    return()=>{
      document.removeEventListener("mousedown",checkIfClickOutside);
    }
  },[clickAddTest])
  const handleInput =(event)=>{
    setInput({...input,[event.target.name]:event.target.value})
  }
  const onClickCreate =async()=>{
    await axios.post("http://localhost:8006/test/post",input).then(res=>{
      
      window.location.reload();
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="navbar">
      <Link to={'/'} className="leftsideNavbar">
        <img src={imgLogo} className='imgLogoNavbar' alt="logo" />
      </Link>
      <div className="rightsideNavbar">
          <div className="linksRightNavbar" onClick={()=>{setOpenCreate(prev=>!prev)}}>
            Creat New
          </div>
          <Link to={'/status'} className="linksRightNavbar">
            Report
          </Link>
          <div className="linksRightNavbar">
            <div className="navLinkAddtest" onClick={()=>{setClickAddTest(true)}}>
              Add Test
            </div>
           {
            clickAddTest &&  <div className="addtest-modal" ref={ref}>
            <div className="input-addtest-module">
              <div className="inputAddtestLabel">Name</div>
              <input type="text" value={input.name} onChange={(event)=>{handleInput(event)}} className='modal-input-fld'  name='name'  />
            </div>
            <div className="input-addtest-module">
              <div className="inputAddtestLabel">Description</div>
              <input type="text" value={input.description} onChange={(event)=>{handleInput(event)}} className='modal-input-fld' name='description' />
            </div>
            <div className="input-addtest-module">
              <div className="inputAddtestLabel">Price</div>
              <input type="text" value={input.price} onChange={(event)=>{handleInput(event)}} className='modal-input-fld' name='price'  />
            </div>
            <div className="input-addtest-module">
              <div className="inputAddtestLabel">Image Link</div>
              <input type="text" value={input.imgLink} onChange={(event)=>{handleInput(event)}} className='modal-input-fld' name='imgLink'  />
            </div>
            <div className="input-addtest-module">
              <div className="inputAddtestLabel">Fasting</div>
              <input type="text" value={input.fasting} onChange={(event)=>{handleInput(event)}} className='modal-input-fld' name='fasting' />
            </div>
            <div className="input-addtest-module">
              <div className="inputAddtestLabel">Normal Range</div>
              <input type="text" value={input.normalRange} onChange={(event)=>{handleInput(event)}} className='modal-input-fld' name='normalRange' />
            </div>
            <div className="input-addtest-module">
              <div className="inputAddtestLabel">Abnormal Range</div>
              <input type="text" value={input.abnormalRange} onChange={(event)=>{handleInput(event)}} className='modal-input-fld' name='abnormalRange' />
            </div>
            <div className="create-addtest" onClick={onClickCreate}>Create</div>
          </div>
           }
            
          </div>
      </div>
      {/* <div className="modal">
        <div className="modal-card">
          <div className="modal-titlebox">
          <div className="modal-title">Creat New</div>
          <div className="X-btn" onClick={()=>{setOpenCreate(prev=>!prev)}}>X</div>
          </div>
        </div>
      </div> */}
      {
        openCreate && <Modal setOpenCreate={setOpenCreate}/>
      
      }

    </div>
  )
}

export default Navbar