import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import styles from "../css/App.module.css";
import { Button } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
import { Form, FormGroup, FormControl, Col } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import SideBar from './SideBar';
import moment from 'moment'
import Switch from "react-switch";
import DatePicker from 'react-datepicker';
import * as $ from 'jquery';
import * as myConstClass from './constants';
import { ToastContainer, toast } from 'react-toastify';
import { timers } from "jquery";
// import Feedback from "react-bootstrap/Feedback";
const api_Url = myConstClass.api
const pageSize = myConstClass.pageSize

class Feedback extends React.Component {
  constructor() {
    super();
    this.   state = {
      count: false,
     userList: [],
      product: '',
      total: '',
      per_page: pageSize[1].size,
      current_page: 1,
      selected:'sidebar',
      searchStr:'',
      isLoading:true,
      show: false,
      showDeleteModal: false,
      isEdit: false,
      isAdd: false,
      isDelete: false,
      name:"",
      mobile:"",
      email:"",
      dob:'',
      address:"",
      username:'',
      password:"",
      city:"",
      classId:"",
      classId_ErMsg:"",
      name_ErMsg:"",
      mobile_ErMsg:'',
      email_ErMsg:"",
      dob_ErMsg:"",
      address_ErMsg:"",
      username_ErMsg:"",
      password_ErMsg:"",
      city_ErMsg:"",
      date:"",
      active:true,
      studentFile:[],
      fileName:"",
      insertType:"",
      classList:[],
      gender:"",
      imgSrc:"",
      profileImage:[],
      role:"",

    };



  }




  componentDidMount() {
    debugger
    $('.nav-btn').on('click', function() {
        $('.page-container').toggleClass('sbar_collapsed');
      });
      let token = window.sessionStorage.getItem('auth_token');
    if(token ==null){
      return this.props.history.push('/login');
    }else{
      let role =sessionStorage.getItem('role')
     this.setState({role:role,},()=>{
      this.getAllUserList(1, this.state.per_page, this.state.searchStr)
     if(this.state.role=='2'){
      this.getClass()
     }
    })



    }


  }

     // ON CHANGE DATE
     handleChange = (date, i) => {
      this.setState({
           date:date,
           dob:moment(date).format("YYYY-MM-DD")
    })
  };

  handleShow = () => {
    this.setState({
      show: true,
      title: 'Add student',
      classId:"",
      name:"",
      mobile:"",
      email:"",
      dob:'',
      address:"",
      username:'',
      password:"",
      classId:"",
      name_ErMsg:"",
      mobile_ErMsg:'',
      email_ErMsg:"",
      dob_ErMsg:"",
      address_ErMsg:"",
      username_ErMsg:"",
      password_ErMsg:"",
      gender:"",

      btntitle: 'Save',
      isAdd: true,
      isEdit: false,
      isDelete: false,
      displaytext: 'hide_block',
      imgSrc:"",
      insertType:"single",
      studentFile:[],
      profileImage:[],
      fileName:"",

        });

  };
// EDIT USER
editStudent =(data)=>{
  debugger
 this.setState({name:data.StudentName,
  gender:data.StudentGender,
  dob:moment(data.StudentDOB).format("YYYY-MM-DD"),
  mobile:data.StudentMobile,
  show:true,
  isEdit:true,
  isAdd:false,
  isDelete:false,
  name_ErMsg:"",
  mobile_ErMsg:"",
  dob_ErMsg:'',
  gender_ErMsg:'',
  title: 'update student',
  btntitle:"Update",
  insertType:"single",
  id:data.StudentId,
})
}


  handleInputs = (e) => {
    debugger
    if(e.target.value!=='0'){
      this.setState({
          [e.target.name]: e.target.value, [e.target.name+`_ErMsg`]:"", count: (e.target.name == 'per_page' ? true : false)},
          () => {
            if(this.state.count){
              this.getAllUserList(this.state.current_page)
             if(this.state.role=='2'){
              this.getClass()
             }
            }});
    }

}
  handleDeleteClose = () => {
    this.setState({ showDeleteModal: false });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  // upload audio file
uploaStudentsFile=(e, type, i)=>{
  debugger
  if (e.target.files && e.target.files.length > 0 ) {
      var fileName = e.target.files[0].name;
     var validExtensions = ['csv', 'xlsx'];

     var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
     var isValid = true;
     for(let img of e.target.files){
         debugger
      if($.inArray(img.name.substr(img.name.lastIndexOf('.') + 1), validExtensions) == -1){
          e.target.value = "";
          isValid = false;
          toast.error("Invalid file format, only csv, .xlsx file format allowed")
          this.setState({},);
      }
       break;
       }

  if(isValid){
  debugger
    var fileName = e.target.files[0].name;
    var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
      let reader = new FileReader();
     this.setState({
          studentFile:(e.target.files[0]),
          fileName:e.target.files[0].name

        })

          reader.onloadend = () => {
            debugger
            this.setState({
            //  audio_src: reader.result, audioErrorMsg: "",
            })
          }
        reader.readAsDataURL(e.target.files[0]);
     }


    }

}
// upload image file
uplodImage=(e, type, i)=>{
  debugger
  if (e.target.files && e.target.files.length > 0 ) {
      var fileName = e.target.files[0].name;
      var validExtensions = ['jpg','png','PNG','JPG','jpeg'];

     var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
     var isValid = true;
     for(let img of e.target.files){
         debugger
      if($.inArray(img.name.substr(img.name.lastIndexOf('.') + 1), validExtensions) == -1){
          e.target.value = "";
          isValid = false;
          toast.error("Invalid image type")
          this.setState({},);
      }
       break;
       }

  if(isValid){
  debugger
    var fileName = e.target.files[0].name;
    var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
      let reader = new FileReader();
     this.setState({
          profileImage:(e.target.files[0]),
          fileName:e.target.files[0].name

        })

          reader.onloadend = () => {
            debugger
            this.setState({
            imgSrc: reader.result, courseImage_ErMsg: "",
            })
          }
        reader.readAsDataURL(e.target.files[0]);
     }


    }

}
// ON CHANGE INSERT TYPE
onChangeInsertType =(e)=>{
  this.setState({insertType:e.target.name, title:e.target.name=='single'?'Add Student':"Add Students"})
  }
 /// GET CLASS LIST
getClass = async pageNumber => {
  this.setState({isLoading:true})
try{
const response = await fetch( api_Url+`getAllClassesApp`,{
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
    }
  }
);
const data = await response.json();
 if(data.success){
   debugger
   console.log(data,'datA',)
     this.setState({
         classList: data.message,
     });
 } else {
     this.setState({
      classList: []
     });
 }
this.setState({isLoading:false})
}
catch(err)
{

}
};
// ON SEARCH STUDENT
onSearchStudnet =()=>{
  this.getAllUserList(1);
}

  getAllUserList = async pageNumber => {
    debugger
    var url="";
    console.log(this.state.role)
    debugger
    if(this.state.role=='2'){
    url=`viewFeedback?page=${pageNumber}&size=${this.state.per_page}&classId=${this.state.classId}`
    }
    else{
      url=`getStudentListBySchoolId?pageNo=${pageNumber}&size=${this.state.per_page}&classId=${this.props.match.params.id}&studentname=${this.state.searchStr}`
    }
      this.setState({isLoading:true})
    try{
    const response = await fetch(
      api_Url+url,
      {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
        }
      }
    );

    const data = await response.json();

   if(data.success){
        console.log(data.Feedback)
       debugger
    this.setState({
        userList: data.Feedback,
       total: data.TotalCount[0].Total,
       current_page:pageNumber,

    });
   }else{
    this.setState({
        userList: [],
      total: '',
      current_page: '',

    });
   }
   this.setState({isLoading:false})


  }
  catch(err)
  {

  }
  };
  onKeyPress(event) {
    const pattern = /[0-9-+]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // validate formm
validateForm =()=>{
  debugger
  var isValid=true;

  var mobileValid =this.state.mobile.toString().match(/^[0]?[789]\d{9}$/)
  var emailValid = this.state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  if(this.state.isAdd&&this.state.classId==''){
    isValid= false
    return this.setState({ classId_ErMsg:"Class name is required",  city_ErMsg:"", name_ErMsg:"", email_ErMsg:"", password_ErMsg:"", username_ErMsg:"", dob_ErMsg:"", address_ErMsg:"", profileImage_ErMsg:"", gender_ErMsg:"", mobile_ErMsg:"", })
}
  else if(this.state.name.trim()==''){
       isValid= false
       return this.setState({name_ErMsg:"Name is required", city_ErMsg:"", classId_ErMsg:"" , profileImage_ErMsg:"", gender_ErMsg:"", email_ErMsg:"", password_ErMsg:"", username_ErMsg:"", dob_ErMsg:"", address_ErMsg:"", mobile_ErMsg:"", })
   }
   else if(this.state.gender==''){
    isValid= false
    return this.setState({name_ErMsg:"",  profileImage_ErMsg:"", city_ErMsg:"", gender_ErMsg:"Gender is required", classId_ErMsg:"", email_ErMsg:"", password_ErMsg:"", username_ErMsg:"", dob_ErMsg:"", address_ErMsg:"", mobile_ErMsg:"", })
}
  else if(this.state.mobile.length>0&&!mobileValid){
      isValid= false
      return this.setState({name_ErMsg:"", email_ErMsg:"", password_ErMsg:"", city_ErMsg:"",  profileImage_ErMsg:"", gender_ErMsg:"", classId_ErMsg:"", username_ErMsg:"", dob_ErMsg:"", address_ErMsg:"", mobile_ErMsg:"Invalid mobile number", })
   }
  //  else if(this.state.email.trim()==''){
  //      isValid= false
  //      return this.setState({name_ErMsg:"", email_ErMsg:"Email is required", password_ErMsg:"",  city_ErMsg:"", profileImage_ErMsg:"", gender_ErMsg:"", classId_ErMsg:"", username_ErMsg:"", dob_ErMsg:"", address_ErMsg:"", mobile_ErMsg:"", })
  //  }
//    else if(!emailValid){
//      isValid= false
//      return this.setState({name_ErMsg:"",   profileImage_ErMsg:"", gender_ErMsg:"", city_ErMsg:"", classId_ErMsg:"",email_ErMsg:"Invalid email", password_ErMsg:"", username_ErMsg:"", dob_ErMsg:"", address_ErMsg:"", mobile_ErMsg:"", })
//  }
   else  if(this.state.dob.trim()==''){
       isValid= false
       return this.setState({name_ErMsg:"",  profileImage_ErMsg:"", gender_ErMsg:"", city_ErMsg:"", classId_ErMsg:"", email_ErMsg:"", password_ErMsg:"", username_ErMsg:"", dob_ErMsg:"D.O.B is required", address_ErMsg:"", mobile_ErMsg:"", })
   }
//    else  if(this.state.city.trim()==''){
//     isValid= false
//     return this.setState({name_ErMsg:"", email_ErMsg:"",   profileImage_ErMsg:"", city_ErMsg:"City is required", gender_ErMsg:"", classId_ErMsg:"",password_ErMsg:"", username_ErMsg:"", dob_ErMsg:"", address_ErMsg:"", mobile_ErMsg:"", })
// }
//    else  if(this.state.address.trim()==''){
//        isValid= false
//        return this.setState({name_ErMsg:"", email_ErMsg:"",   profileImage_ErMsg:"", city_ErMsg:"", gender_ErMsg:"", classId_ErMsg:"",password_ErMsg:"", username_ErMsg:"", dob_ErMsg:"", address_ErMsg:"Address is required", mobile_ErMsg:"", })
//    }
   else  if(this.state.isAdd&&this.state.username.trim()==''){
       isValid= false
       return this.setState({name_ErMsg:"", email_ErMsg:"", password_ErMsg:"",  profileImage_ErMsg:"", gender_ErMsg:"", classId_ErMsg:"", username_ErMsg:"Username is required", dob_ErMsg:"", address_ErMsg:"", mobile_ErMsg:"", })
   }
   else  if(this.state.isAdd&&this.state.password.trim()=='' &&this.state.isAdd){
       isValid= false
       return this.setState({name_ErMsg:"", email_ErMsg:"", password_ErMsg:"password is required",  profileImage_ErMsg:"", gender_ErMsg:"", classId_ErMsg:"", username_ErMsg:"", dob_ErMsg:"", address_ErMsg:"", mobile_ErMsg:"", })
   }

   else{
   this.setState({name_ErMsg:"", email_ErMsg:"", password_ErMsg:"", username_ErMsg:"", dob_ErMsg:"", address_ErMsg:"", mobile_ErMsg:"", })
       return isValid
   }
}


// MANAGE STUDENT
manageStudent =(e)=>{
  e.preventDefault();
  if(this.state.insertType=='single' &&!this.validateForm()){
   return
  }
  else if(this.state.insertType=='bulk'&&this.state.classId==''){
    return toast.error('Please select class name',{

    })
  }
  else if(this.state.insertType=='bulk'&&this.state.studentFile.length==0){
    return toast.error('File is required',{

    })
  }

  // MAKING API REQUEST.
  if(this.state.isAdd){
    debugger
    this.setState({isLoading:true})
    let url= this.state.insertType=='single'?'insertStudentWeb':`importStudentMainExcelData2MySQL?classId=${this.state.classId}`;
    var formData = new FormData();
    if(this.state.insertType=='bulk'){
     formData.append('uploadfile', this.state.studentFile)
    }
    else{
     var data ={
      StudentName:this.state.name,
      StudentGender:this.state.gender,
      StudentUsername:this.state.username,
      // StudentAddress:this.state.address,
      // StudentCity:this.state.city,
      StudentDOB:this.state.dob,
      StudentPassword:this.state.password,
      ClassId:this.state.classId,
      StatusId:1,
      }
      if(this.state.mobile.length>0){
        data.StudentMobile=this.state.mobile;

      }

    }
    if(this.state.insertType=='single'){

      var header={
          "Accept":"Application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
        }

    }
    else{
      var header={
        "Accept":"Application/json",
        // "Content-Type": "application/json",
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
      }
    }

    fetch(api_Url+url, {
      method:"POST",
       headers:header,
      // headers :{
      //   "Accept":"Application/json",
      // //  "Content-Type": "application/json",
      //   'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
      // },
     body: this.state.insertType=='single'? JSON.stringify(data):formData,

    })
    .then(res=>res.json())
    .then(result=>{
      debugger
      if(result.success){
     toast.success(result.message,{
     })
     this.setState({classId:"",},()=>{
       this.getAllUserList(1)
     })
     this.handleClose()
      }
      else{
        toast.error(result.error,{
        })
      }
      this.setState({isLoading:false})
    })

   }
  else if(this.state.isEdit){
    debugger
    var data ={
      StudentName:this.state.name,
      StudentGender:this.state.gender,
    //  StudentMobile:this.state.mobile,
     StudentDOB:this.state.dob,
     StudentId:this.state.id

      }
      if(this.state.mobile.length>0){
        data.StudentMobile=this.state.mobile;

      }
    fetch(api_Url+'updateStudentMainWeb', {
      method:"POST",
      headers :{
        "Accept":"Application/json",
       "Content-Type": "application/json",
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
      },
     body:  JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(result=>{
      debugger
      if(result.success){
     toast.success(result.message,{
     })
     this.setState({classId:"",},()=>{
       this.getAllUserList(1)
     })
     this.handleClose()
      }
      else{
        toast.error(result.error,{
        })
      }
      this.setState({isLoading:false})
    })
  }

}

// UPDATE STUDENT STATUS
updateStudentStatus =(e, i, status, id)=>{
  // e.preventDefault();
  let data = this.state.userList
  data[i].StatusId=status=='1'?0:1;
  status=status=='1'?0:1;
  this.setState({userList:data, isLoading:true})

  fetch(api_Url+'updateStudentMainStatus', {
    method:"POST",
    headers :{
      "Accept":"Application/json",
     "Content-Type": "application/json",
      'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
    },
   body:  JSON.stringify({"StudentId":id, "StatusId":status})
  })
  .then(res=>res.json())
  .then(result=>{
    debugger
    if(result.success){
     toast.success('Status updated successfully')
    }
    else{
      toast.error(result.message)
    }
    this.setState({ isLoading:false})

  })
}


  showUsers = () => {
    var role =sessionStorage.getItem('role')
    if (this.state.userList!== undefined) {

      return this.state.userList.map((feedback, i) => {

        return (
          <tr>
           <td>{((this.state.current_page-1)*10)+(i+1)}</td>
            <td>{feedback.StudentName}</td>
            <td>{feedback.StudentMobile}</td>
           <td>{feedback.Message}</td>

           {/* {student.ParentMobile?student.ParentMobile:"-"} */}
           <td> {moment(feedback.CreationDate).format('DD-MMM-YYYY')}</td>
           {/* {role=='2'&&   <td>
            <i  onClick={() => this.editStudent(student)} class="ti-pencil"></i>
            {" "}  {" "}

            </td>} */}
            {/* {role=='2'&&  <td>

            <Switch onChange={(e)=>this.updateStudentStatus(e, i, student.StatusId,  student.StudentId )}  className="react-switch-bg"
            checked={student.StatusId=='1'} />
            </td>} */}
      </tr>
        );
      });
    }
  };



  renderPageNumbers = () => {
    let pageNumbers = [];
    if (this.state.total !== null) {
      for (
        let i = 1;
        i <= Math.ceil(this.state.total / this.state.per_page);
        i++
      ) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers.map(number => {

      let classes = this.state.current_page === number ? styles.active : "";
      if (
        number === 1 ||
        number === this.state.total ||
        (number >= this.state.current_page - 2 &&
          number <= this.state.current_page + 2)
      ) {
        return (
          <span
            key={number}
            className={classes}
            onClick={() => this.getAllUserList(number,10, this.state.searchStr)}
          >
            {number}
          </span>
        );
      }
    });
  };

  tickcheckbox()
  {
   this.setState({active:!this.state.active})

  }
  render() {
    var role = sessionStorage.getItem('role')

    return (
      <div>
          {this.state.isLoading && <div class="loader1"></div>}
         <div className="page-container">
      <SideBar   tabIndex='feedback' shown='user_management' />
           <div className="main-content">
                  <div className="header-area">
                        <div className="row align-items-center">
                            <div className="col-md-6 col-sm-8 clearfix">
                                <div className="nav-btn pull-left">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-4 clearfix">
                                <ul className="notification-area pull-right">
                                </ul>
                            </div>
                        </div>
                    </div>
          <div className="page-title-area">
            <div className="row align-items-center">
              <div className="col-sm-6">
                <div className="breadcrumbs-area clearfix">
                  <h4 className="page-title pull-left">Feeback</h4>

                  <ul className="breadcrumbs pull-left">
                    <li><a >Home</a></li>
                    <li><span>Feeback</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="main-content-inner">
            <div class="row">

              <div class="col-lg-12 mt-5">
            {role=='2'&&<ul className ="filter-ul">
              <li>
                      <span>Class Name</span>
                      <select className="input-s br-w-1" name="classId" value={this.state.classId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Class-</option>
                        {this.state.classList.length > 0 ? this.state.classList.map(cls =>
                          <option key={cls.ClassId} value={cls.ClassId}>{cls.StudentClass}</option>
                        ) : null}

                      </select>{" "}
                    </li>
                    {/* <li>
                      <span></span><br></br>
                      <input className="input-s br-w-1" type="text" placeholder="Search by name" name="searchStr" value={this.state.searchStr} onChange={this.handleInputs} />
                    </li> */}
                    <li>
                      <span>Page Size</span>
                      <select className="input-s br-w-1" name="per_page" value={this.state.per_page} onChange={this.handleInputs}>
                      {pageSize.length > 0 ? pageSize.map(size =>
                          <option key={size.id} value={size.id}>{size.size}</option>
                        ) : null}


                      </select>{" "}

                    </li>
                                     <li>
                    <button className ="search-button" onClick ={this.onSearchStudnet}>Search</button>
                    </li>
                  </ul>}

                <div class="card">
                  <div class="card-body">
                    <div className= "">
                    <h4 class="header-title">Feedback List</h4>
                  {role=='2'&& <p className={styles.addCountry}>
                          {/* <button
                            onClick={this.handleShow}
                            className="btn btn-warning btn-xs"
                            data-title="Add"
                            data-toggle="modal"
                            data-target="#add"
                          >
                            {" "}
                      Add student {" "}
                            <span className="glyphicon glyphicon-plus"> </span>
                          </button> */}
                        </p>}
                    </div>

                    <div class="single-table">
                      <div class="table-responsive">
                        <table class="table text-center">
                          <thead class="text-uppercase  bg-light-green">
                            <tr class="text-white">
                              {/* <th scope="col">ID</th> */}
                              <th scope="col">S.No</th>
                              <th scope="col">Student</th>
                              <th scope="col">Mobile</th>
                              <th scope="col">Feedback</th>
                            {/* <th scope="col">Guardian Mob.</th> */}
                            <th scope="col">Created</th>
                            {/* {role=='2'&&<th scope="col">Action</th>}
                            {role=='2'&&<th scope="col">Status</th>} */}



                            </tr>
                          </thead>

                          {this.state.userList.length>0 &&
                          <tbody>{this.showUsers()}</tbody>
                          }

                        </table>
                        {this.state.userList.length==0&&
                       <p style={{textAlign:"center"}}> No Record Found
                        </p>}
                         {this.state.userList.length>0&&
                        <div className={styles.pagination}>
                        <span className={this.state.current_page=='1'?"disabled":""} onClick={()=> this.getAllUserList(this.state.current_page-1, this.state.per_page, this.state.searchStr)}>Previous</span>
                        {this.state.userList.length > 0 && this.renderPageNumbers()}
                      <span  className={Math.ceil(this.state.total / this.state.per_page)==this.state.current_page?"disabled":""} onClick={()=> this.getAllUserList(+this.state.current_page+1, this.state.per_page, this.state.searchStr)}>Next</span>
                     </div>}
                  </div>
                </div>
              </div>

              </div>

            </div>
          </div>
          </div>
        </div>

        </div>
        <div className="static-modal">

<Modal show={this.state.show} backdrop="static" onHide={this.handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>{this.state.title}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
             {this.state.isLoading &&
    <div class="loader1"></div>}
    <Form horizontal>
      <FormGroup controlId="formHorizontalEmail">
  <Col sm={9}>
 	<tr>
		<td>
			<input type="radio" name="single" value={this.state.insertType} checked={this.state.insertType==="single" } onChange={(e)=>this.onChangeInsertType(e, "single")} /> {" "} {" "}Single Insert</td>
		<td>
			<input type="radio" name="bulk" value={this.state.insertType} checked={this.state.insertType==="bulk" } onChange={(e)=>this.onChangeInsertType(e, "bulk")} /> {" "} {" "}Upload file</td>
	</tr>
  </Col>
        {this.state.insertType=='single'&&<div>
        {this.state.isAdd&& <Col sm={4}> Class Name </Col>}
        {this.state.isAdd&&  <Col sm={9}>
                    <FormControl as="select" value={this.state.classId} name="classId" onChange={this.handleInputs} class="form-control">
                      <option value='0'>-Select Class Name-</option> {this.state.classList.length > 0 ? this.state.classList.map(classId =>
                        <option key={classId.ClassId} value={classId.ClassId}>{classId.StudentClass}</option>) : null} </FormControl>
                    <small className={this.state.displaytext + " text-danger"}>{this.state.classId_ErMsg}</small>
                  </Col>}
        <Col sm={4}> Name </Col>
        <Col sm={9}>
          <FormControl type="text" placeholder="Name" value={this.state.name} onChange={this.handleInputs} name="name" />
          <small className={this.state.displaytext + " text-danger"}>{this.state.name_ErMsg}</small>
        </Col>
        <Col sm={4}> Gender </Col>
        <Col sm={9}>
         <div style={{marginLeft:"16px"}}>
         <label   style={{paddingRight:"32px"}} type="radio"class="radio-inline">
      <input className="gen-input" type="radio"  value="Male" onChange={this.handleInputs} name="gender" checked={this.state.gender=='Male'}/>Male
    </label>
    <label style={{paddingRight:"32px"}} class="radio-inline">
      <input type="radio" value="Female" onChange={this.handleInputs} className="gen-input" name="gender"checked={this.state.gender=='Female'} />Female
    </label>
         </div>
          <small className={this.state.displaytext + " text-danger"}>{this.state.gender_ErMsg}</small>
        </Col>
        <Col sm={4}>Mobile</Col>
        <Col sm={9}>
          <FormControl type="text" placeholder="Mobile" onKeyPress={this.onKeyPress} maxLength="10" value={this.state.mobile} onChange={this.handleInputs} name="mobile" />
          <small className={this.state.displaytext + " text-danger"}>{this.state.mobile_ErMsg}</small>
        </Col>
       {/* <Col sm={4}>Email</Col>
        <Col sm={9}>
          <FormControl type="text" placeholder="email" value={this.state.email} onChange={this.handleInputs} name="email" />
          <small className={this.state.displaytext + " text-danger"}>{this.state.email_ErMsg}</small>
        </Col> */}
           <Col sm={4}>D.O.B</Col>
        <Col sm={9}>
           <DatePicker  style={{width:"322px"}} className="form-control w-322"   peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" selected={this.state.date}  value={this.state.dob}  maxDate={new Date()}  onChange={(e)=>this.handleChange(e, )} placeholderText="MM-DD-YYYY" />
        <small className={this.state.displaytext + " text-danger"}>{this.state.dob_ErMsg}</small>
        </Col>
        {/* <Col sm={4}>City</Col>
        <Col sm={9}>
          <FormControl type="text" placeholder="City" value={this.state.city} onChange={this.handleInputs} name="city" />
          <small className={this.state.displaytext + " text-danger"}>{this.state.city_ErMsg}</small>
        </Col>
         <Col sm={4}>Address</Col>
        <Col sm={9}>
          <FormControl type="text" placeholder="Address" value={this.state.address} onChange={this.handleInputs} name="address" />
          <small className={this.state.displaytext + " text-danger"}>{this.state.address_ErMsg}</small>
        </Col> */}
     {this.state.isAdd&&<Col sm={4}>Username</Col>}
     {this.state.isAdd&& <Col sm={9}>
          <FormControl type="text" placeholder="Username" value={this.state.username} onChange={this.handleInputs} name="username" />
          <small className={this.state.displaytext + " text-danger"}>{this.state.username_ErMsg}</small>
        </Col>}
        {!this.state.isEdit&&<Col sm={4}>Password</Col>}
        {!this.state.isEdit&&	<Col sm={9}>
          <FormControl type="password" placeholder="Password" value={this.state.password} onChange={this.handleInputs} name="password" />
          <small className={this.state.displaytext + " text-danger"}>{this.state.password_ErMsg}</small>
        </Col>}
        {/* <Col sm={4}>Profile Image</Col>
						<Col sm={9}>
                        <label style={{ color: "black" }} className="ado"><span>CHOOSE IMAGE</span>
	                   <input className="hide-input" type="file" name="image" onChange={(e)=> this.uplodImage(e)} /> </label>
                       {this.state.imgSrc !== '' && <span><img className="ado-img " src={this.state.imgSrc} /> <span className="select-ans"></span> </span>}

    					<small className={this.state.displaytext + " text-danger"}>{this.state.courseImage_ErMsg}</small>
						</Col> */}
            <br></br>
            {/* {this.state.isAdd&&  <Col sm={9}>
          <input type="checkbox"  checked={this.state.active} onChange={this.onChageCheckboxActive} name="active" /> Is Active
        </Col>} */}
        </div>}
        {this.state.insertType=='bulk'&&<div>
        <Col sm={4}> Class Name </Col>
                  <Col sm={9}>
                    <FormControl as="select" value={this.state.classId} name="classId" onChange={this.handleInputs} class="form-control">
                      <option value='0'>-Select Class Name-</option> {this.state.classList.length > 0 ? this.state.classList.map(classId =>
                        <option key={classId.ClassId} value={classId.ClassId}>{classId.StudentClass}</option>) : null} </FormControl>
                    <small className={this.state.displaytext + " text-danger"}>{this.state.classId_ErMsg}</small>
                  </Col><br></br>
        <Col style={{textAlign:"center"}} sm={9}>
         <label className="btn btn-primary form-control"> <input className="hide-input" type="file"  onChange={this.uploaStudentsFile}  />Browse file</label> <a style={{marginTop:"10px"}} className="for_class">{this.state.fileName}</a>
        </Col>
        </div>}
      </FormGroup>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={this.handleClose}>Close</Button>
    <Button type="submit" disabled={this.state.isValiddata} onClick={this.manageStudent} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
  </Modal.Footer>
</Modal>
</div>
      </div>
    );
  }
}




export default Feedback
