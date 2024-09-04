import React,{useState,useEffect} from 'react'
import './status.css'
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import { Modal } from '@mui/material';
import noDataImg from '../../../assets/no-data-img.avif';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Status = () => {
 
 





  const[activeBar,setActiveBar] = useState("pending")
  const[data,setData]=useState([]);
  const [clickedUpdate,setClickedUpdate]=useState(false)
  const[clickedPatient,setClickedpat]=useState(null);
  useEffect(()=>{
    fetchPatient();
  },[activeBar]);

  const fetchPatient = async()=>{
   await axios.get(`http://localhost:8006/patient/getStatus/${activeBar}`).then(res=>{
    setData(res.data.data);
    console.log(res.data.data);
   }).catch(err=>{
    console.log(err);
   })
  }

  const updateIconClick = (item)=>{
    setClickedUpdate(true)
    setClickedpat(item);
  }
  const deletePatient = async(id)=>{
   await axios.delete(`http://localhost:8000/patient/${id}`).then(resp=>{
    window.location.reload();
   }).catch(err=>{
    console.log(err);
   }) 
  }
  return (
    <div className="statusepage">
      <div className="statusPageWorkDiv">
        <div className="statusBar">
          <div className={`statustitle ${activeBar==='pending'?"activeBarstatus":null}`} onClick={()=>{setActiveBar("pending")}}>Pending</div>
          <div className={`statustitle ${activeBar==='Completed'?"activeBarstatus":null}`} onClick={()=>{setActiveBar("Completed")}}>Completed</div>
        </div>
        <div className="statusList">
          {
            data && data.map((item,index)=>{
            return(
              <div className="statusRowList">
              <div className="statusName">
                {item?.name}
              </div>
              <div className="statusDRDetails">
                <div className="statusDrName"> {item?.examinedBy}</div>
                <div className="statusDrName"> {item?.reportDate}</div>
              </div>
              <div className="statusBtns">
                
                 {
                  activeBar==="pending"?<div className="icons" onClick={()=>updateIconClick(item)}> <UpdateIcon/></div>:null
                 }
                
               
                  {
                    activeBar==="pending"?<div className="icons" style={{backgroundColor:"red"}} onClick={()=>deletePatient(item._id)}> <DeleteIcon/></div>:null
                  }
               
                <Link to={`/report/${item._id}`} className="icons" style={{backgroundColor:"blue"}}><DescriptionIcon/></Link>
               
              </div>
            </div>
            );
          })

        }
          

          {
            data.length===0 && <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
              <img width={200} src={noDataImg}/>
            </div>
          }
        
        </div>
      </div>
      {
         clickedUpdate && <Modal item={clickedPatient}  setOpenCreate={setClickedUpdate}/>
         }
    </div>
  )
}

export default Status