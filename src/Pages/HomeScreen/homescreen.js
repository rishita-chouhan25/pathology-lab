import React,{useEffect,useState} from 'react'
import './homescreen.css';
import LabPic from '../../assets/Digital-pathology.jpg';
import data from './data.json';
import Footer from '../../CommonComponent/Footer/footer';
import Modal from '../../CommonComponent/Modal/modal';
import axios from 'axios';


const Homescreen = () => {
 const [listOfTest,setListOfTest] =useState([]);
 const [activeIndexNav,setActiveIndexNav] = useState(0);
 const [selectDetailedTest,setSelectedDetailedtest] = useState(null);
 const [clickAddTest,setClickAddTest] = useState(false);
//  console.log(listOfTest);
 useEffect(()=>{
  fetchDataOnLoading();
  
  // console.log(selectDetailedTest)
  
  // console.logo(selectDetailedTest)
  setListOfTest(data.data)
 },[])
 
 const fetchDataOnLoading = async()=>{
  await axios.get('http://localhost:8006/test/get').then(response=>{
    const data = response.data.data;
    setListOfTest(data);
    setSelectedDetailedtest(data[0]);
   }).catch(err=>{
    console.log(err);
   })
 }

 console.log(selectDetailedTest)

 const handleClickNavLink =(index)=>{
  setActiveIndexNav(index);
  setSelectedDetailedtest(listOfTest[index])
 }
 const handleClosePopup=(val)=>{
  setClickAddTest(val)
 }
//  console.log(activeIndexNav);
  return (
    <div className="homescreen">
      <div className="introHomeScreen">
         <div className="imgHomeScreenLog">
          <div className="imgDiv">
          <img className='lablogo' src={LabPic} alt="labpic" />
          </div>
          <div className="introPart">
            <div className="titlemini">
              Enter Limited
            </div>
            <div className="titleMajor">Pathology Management System</div>
            <div className="description1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, autem enim molestiae mollitia neque
               quia atque similique illum, tenetur soluta officiis laboriosam doloribus beatae praesentium. Architecto
                neque asperiores officiis voluptatibus?
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Mollitia quos, laborum dolorum voluptatum aut accusantium similique harum 
                 
            </div>
            <div className="description2">
               Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cum, cumque. Ea incidunt ad eius repudiandae dolore, vero aliquam sapiente quisquam quos
                 libero ipsum cum fuga voluptatem deleniti tempora consequuntur accusantium!
                 
            </div>
            <div className="topBtnsDiv">
              <div className="btns-div" onClick={()=>setClickAddTest(true)}>
                   Create
              </div>
              <div className="btns-div">
                   <a style={{textDecoration:"none"}} href='#contact'>contact</a>
              </div>
            </div>
          </div>
         </div>
      </div>
      {/* *********************************** */}

      <div className="testHomeScreen">
        <div className="leftPartTest">
         <div className="totalTest">{listOfTest?.length} Test Available</div>
         <div className="testNameDiv">
          {
            listOfTest?.map((item,index)=>{
              return(
                  <div onClick={()=>(handleClickNavLink(index))} className={`testNameTitle ${activeIndexNav===index?"activeNavLink":null}`}>{item.name}</div>
              );
            })
          }
             {/* <div className="testNameTitle">Hemoglobin Test</div>
             <div className="testNameTitle">urine Test</div>
             <div className="testNameTitle">Stool Test</div>
             <div className="testNameTitle">Hemoglobin Test</div>
             <div className="testNameTitle">urine Test</div>
             <div className="testNameTitle">Stool Test</div>
             <div className="testNameTitle">Hemoglobin Test</div>
             <div className="testNameTitle">urine Test</div>
             <div className="testNameTitle">Stool Test</div> */}
             
         </div>
        </div>
        <div className="rightPartTest">
           <div className="topRightPart">
           {selectDetailedTest?.name}
           </div>
           <div className="bottomRightPart">
            <div className="topBottomRightPart">
            {selectDetailedTest?.description}
            </div>
            <div className="BottomBottomRightPart">
              <div className="bBRightPartLeftSide">
              <div className="detailsBlock">
                  {"fasting"} : <span className='spancolorChange'>{selectDetailedTest?.fasting}</span>
                  </div>
                  <div className="detailsBlock">
                  {"Abnormal Range"} : <span className='spancolorChange'>{selectDetailedTest?.abnormalRange}</span>
                  </div>
                  <div className="detailsBlock">
                  {"Normal Range"} : <span className='spancolorChange'>{selectDetailedTest?.normalRange}</span>
                  </div>
                  <div className="detailsBlock">
                  {"Price"} : <span className='spancolorChange'>{selectDetailedTest?.price}</span>
                  </div>
                  
              {/* <div className="detailsBlock">
               Fasting : <span className='spancolorChange'>required</span>
               </div>
               <div className="detailsBlock">
               Normal Range : <span className='spancolorChange'>20-80</span>
               </div>
               <div className="detailsBlock">
               Fasting : <span className='spancolorChange'>required</span>
               </div> */}
              </div>
              <div className="bBRightPartRightSide">
             <img className='bBrightImage' src={selectDetailedTest?.imgLink} alt="labpic" />
              </div>
              
            </div>
           </div>
        </div>
      </div>
      <div className="contactHomeScreen">
        <div className="contactFormTitle" id='contact'>Contact Form</div>
        <div className="contactForm">
          <div className="inputFields">
            <input type="email" className='inputFieldsBox' placeholder='Enter your Email Id' />
            <input type="text" className='inputFieldsBox' placeholder='Enter your Name' />

            <input type="number" className='inputFieldsBox' placeholder='Enter your Mobile Number' />
            <textarea type="textbox" className='inputTextareaMessage' placeholder='Type your message here....' rows={10}></textarea>
          </div>
          <div className="sendEmailButton">
            send
          </div>
        </div>
      </div>
      <Footer/>
      {
        clickAddTest && <Modal setClickAddTest={handleClosePopup}/>
      }
    </div>
  )
}

export default Homescreen;