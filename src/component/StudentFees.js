import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
import styles from "../css/App.module.css";
import { Button } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
import { Form, FormGroup, FormControl, Col } from "react-bootstrap";
import SideBar from './SideBar';
import banner from '../Images/singin-bg.png';
import * as $ from 'jquery';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import upload_icon from '../Images/upload_icon1.png';
import Avatar from 'react-avatar-edit'
import * as myConstClass from './constants';
const api_Url = myConstClass.api
const imageUrl = myConstClass.imageUrl
const pageSize = myConstClass.pageSize
const file1 = myConstClass.fileSize

class StudentFees extends React.Component {
  constructor() {
    super();
    this.state = {
      sessionList: [],
      sessionId: "",
      count: false,
      fsize: 0,
      studentFeesList: [],
      classList:[],
      status:"",
      searchStr:"",
      id: '',
      btnValue: "Submit",
      show: false,
      showDeleteModal: false,
      isEdit: false,
      isAdd: false,
      isDelete: false,
      displaytext: 'hide_block',
      title: '',
      btntitle: '',
      total: '',
      per_page: pageSize[1].size,
      current_page: 1,
      isLoading:false,
      classId:"",
      installmentName:"",
      courseDescription:"",
      courseOtherDetails:"",
      courseImage:[],
      courseFile:[],
      classId_ErMsg:"",
      installmentName_ErMsg:"",
      courseDescription_ErMsg:"",
      courseOtherDetails_ErMsg:"",
      courseImage_ErMsg:"",
      active:true,
      insertType:"single",


    };


  }

  handleInputs = (e) => {
      if(e.target.value!=='0'){
        this.setState({
            [e.target.name]: e.target.value, [e.target.name+`_ErMsg`]:"", count: (e.target.name == 'per_page')? true : false
          },
            () => {
              if(this.state.count){
                this.getClass(this.state.current_page);
                this.getStudentFees(this.state.current_page)
              }
            });
      }

  }

// ON CHANGE ACTIVE
  onChageCheckboxActive = (e) => {
    debugger
    this.setState({ active: !this.state.active })
  }


  componentDidMount() {
    $('.nav-btn').on('click', function () {
        $('.page-container').toggleClass('sbar_collapsed');
      });
    let session = window.sessionStorage.getItem('SessionId');
    let token = window.sessionStorage.getItem('auth_token');
    if (token === null&& session === null) {
      return this.props.history.push('/login');
    } else {

   this.getClass(1);
   this.setState({sessionId: session},()=>{
     this.getStudentFees(1)
     this.getSession();
   })


    }
  }

// Get Session LIST
getSession = async pageNumber => {
  debugger
  this.setState({isLoading:true})
try{
const response = await fetch( api_Url+`getSessionBySchoolId?page=1&size=50&status=1`,{
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
   console.log('data', data)
   debugger
   this.setState({
         sessionList: data.SessionData,
     });

 } else {
     this.setState({
      sessionList: []
     });
 }
this.setState({isLoading:false})
}
catch(err)
{
this.setState({isLoading: false})
toast.error('uploading failed')
}
 };

// ON CHANGE INSERT TYPE
onChangeInsertType =(e)=>{
  this.setState({insertType:e.target.name, title:e.target.name=='single'?'Add Course':"Add Courses"})
  }
  handleShow = () => {

    this.setState({
      show: true,
      chapterFile:[], fileName:"",
      title: 'Add Installment',
       installmentName:"",
      courseDescription:"",
      courseOtherDetails:"",
      courseImage:[],
      classId_ErMsg:"",
      installmentName_ErMsg:"",
      courseDescription_ErMsg:"",
      courseOtherDetails_ErMsg:"",
      courseImage_ErMsg:"",
      btntitle: 'Save',
      isAdd: true,
      isEdit: false,
      isDelete: false,
      displaytext: 'hide_block',
      imgSrc:"",
      insertType:"single"
        });

  };
// EDIT COURSE

editStudentFees = (data) => {
  console.log(data)
  debugger
  this.setState({
    show: true,
    totalAmount: data.TotalAmount,
    classId: data.ClassId,
    insertType:"single",
    title: 'Update Installment',
    installmentName:data.InstallmentName,
    active:data.StatusId==1?true:false,
    remark: data.Remark? data.Remark:'',
    id:data.StudentFeesId,
    installmentName_ErMsg:"",
    btntitle: 'Update',
    isAdd: false,
    isEdit: true,
    isDelete: false,
    displaytext: 'hide_block',
      });

};

/// GET CLASS LIST ${this.state.per_page}
getClass = async pageNumber => {
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getAllClassesApp?pageNo=${pageNumber}&size=${this.state.per_page}`,{
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


/// ON SEARCH COURSE
onSearchCourese=()=>{
this.getStudentFees(1, this.state.current_page, this.state.classId, this.state.status)
}


// delete session
deleteStudentFees = (data) => {
  console.log(data)
  debugger
   this.setState({
     id: data.StudentFeesId,
     title: 'Delete StudentFees',
     btntitle: 'Delete',
     btnValue: "Delete",
     show: false,
     showDeleteModal: true,
     isEdit: false,
     isAdd: false,
     isDelete: true,
     installmentName: data.InstallmentName,
     displaytext: 'hide_block',
   })

}

// delete session by Id
deleteStudentFeesById = async(e) => {
  debugger
  e.preventDefault();
  //http://35.200.220.64:4000/connektschool/deleteStudentFeesMaster?status=1&StudentFeesMasterId=1
  this.setState({isLoading:true})

  fetch(api_Url+`deleteStudentFeesMaster?status=0&StudentFeesMasterId=${this.state.id}`,{
   method:"GET",
   headers :{
     "Accept":"Application/json",
     "Content-Type":"Application/json",
     "Authorization":"Bearer "+sessionStorage.getItem("auth_token"),
   }
 })
 .then(res=>res.json())
 .then(result=>{
   debugger
   if(result.error){
     toast.success(result.message,{

     })
     this.setState({id:""},()=>{
      this.getStudentFees(this.state.current_page, this.state.per_page)

     })
     this.handleDeleteClose()
     this.setState({isLoading:false})
   } else {
     toast.error(result.message,{

     })
     this.setState({isLoading:false})
   }
 }).catch(e => {
   toast.error('Something went Wrong')
   this.setState({isLoading: false})
 })
}

/// GET CLASS LIST by sir
getStudentFees = async pageNumber => {
  debugger
  this.setState({isLoading:true})
try{
  let value = '1';
  if(this.state.status == 'active'){
    value = '1';
  } else if(this.state.status == 'inactive'){
    value = '0';
    debugger
  } else {
  }
const response = await fetch( api_Url+`getStudentFeesMasterBySchoolAndSessionId?page=${pageNumber}&size=${this.state.per_page}&status=${value}&SessionId=${this.state.sessionId}`,{
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
   console.log('data', data)
   debugger
   this.setState({
         studentFeesList: data.StudentFeesMaster,
         total: data.TotalCount[0].Total,
         current_page:pageNumber,
     });

 } else {
     this.setState({
      studentFeesList: []
     });
 }
this.setState({isLoading:false})
}
catch(err)
{
this.setState({isLoading: false})
toast.error('uploading failed')
}
 };



  handleClose = () => {
    this.setState({ show: false,
    fsize: 0 });
  };
  handleDeleteClose = () => {
    this.setState({ showDeleteModal: false });
  };

// validate form
validateForm =()=>{
  debugger
   var isValid=true;
   if(this.state.installmentName.trim()==''){
       isValid= false
        return this.setState({totalAmount_ErMsg:"",classId_ErMsg:"", installmentName_ErMsg:"Installment name is required",})
    }
    else if(this.state.isAdd&&this.state.classId==''){
        isValid= false
        return this.setState({totalAmount_ErMsg:"",classId_ErMsg:"Class name is required", installmentName_ErMsg:"",})
    }

    else if(this.state.totalAmount==''){
        isValid= false
        return this.setState({totalAmount_ErMsg:"Total Amount is required", classId_ErMsg:"", installmentName_ErMsg:"", })
    }
    // else  if(this.state.courseOtherDetails.trim()==''){
    //     isValid= false
    //     return this.setState({classId_ErMsg:"", installmentName_ErMsg:"", courseOtherDetails_ErMsg:"Course other description is required", courseDescription_ErMsg:"", courseImage_ErMsg:""})
    // }
    // else  if(this.state.isAdd&&this.state.courseImage.length==0){
    //     isValid= false
    //     return this.setState({classId_ErMsg:"", installmentName_ErMsg:"", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"", courseImage_ErMsg:"Course image is required"})
    // }
    else{
        this.setState({totalAmount_ErMsg:"", classId_ErMsg:"", installmentName_ErMsg:"", })
        return isValid
    }
}



  // manage Course
  manageStudentFees = (e) => {
    debugger
    e.preventDefault();
    if(!this.validateForm()){
      debugger
      return
    }
   if(this.state.isAdd){
    var data = {
        "InstallmentName": this.state.installmentName,
        "ClassId": this.state.classId,
        "TotalAmount": this.state.totalAmount,
        "Remark": this.state.remark
      }

    let url= `insertStudentFees`;
      let header={
        "Accept":"Application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
      }
    this.setState({isLoading:true})
         fetch(api_Url+url,{
            method:"POST",
           headers:header,
            body: JSON.stringify(data)
          })
          .then(res=>res.json())
          .then(result=>{
              debugger
            if(result.success){
              toast.success(result.message,{

              })
              this.setState({classId:""},()=>{
                this.getStudentFees(this.state.current_page, this.state.per_page, this.state.classId, this.state.status)

              })
             this.handleClose()
            }
            else{
           toast.error(result.message,{

           })
           toast.error(result.error,{

           })
            }
            this.setState({isLoading:false})

          }).catch(e => {
            toast.error(e)
          })
   }

   else if(this.state.isEdit){
          var data = {
              "StudentFeesId":this.state.id,
              "InstallmentName": this.state.installmentName,
              "TotalAmount": this.state.totalAmount,
              "Remark": this.state.remark,
              "StatusId":this.state.active?"1":"0"
              }
          this.setState({isLoading:true})

          fetch(api_Url+`updateStudentFees`,{
            method:"POST",
            headers :{
              "Accept":"Application/json",
              "Content-Type":"Application/json",
              "Authorization":"Bearer "+sessionStorage.getItem("auth_token"),
            },
            body:JSON.stringify(data)
          })
          .then(res=>res.json())
          .then(result=>{
              debugger
            if(result.success){
              toast.success(result.message,{

              })
              this.setState({classId:""})
              this.getStudentFees(this.state.current_page, this.state.per_page)
             this.handleClose()
            }
            else{
           toast.error(result.message,{

           })
            }
            this.setState({isLoading:false})

          })
   }
  }
  // Upload team image

  onCrop = (preview) => {

    this.setState({
      preview,
      // staticImg: false,
      //dynamicImg: true,
      // showImageCorp:false
    })
  }
  onClose = (e) => {
    this.setState({ preview: '', isValid: false })
  }

  imageChange = (e) => {
    this.setState({ showImageCorp: true, type: '', profile_pic: '', imgErrorMessage: '', preview: '', isValid: false })
  }

  CloseImageCrop = (e) => {

    if (this.state.isAdd) {
      this.setState({ showImageCorp: false })
      if (this.state.preview === "") {
        if (this.state.file) {
          this.setState({ file: this.state.file, profile_pic: this.state.file, type: this.state.imageType })
        } else {
          this.setState({ profile_pic: '', type: '' })
        }


      } else {
        if (this.state.file === undefined) {
          this.setState({ profile_pic: '', type: '' })
        } else {
          this.setState({ profile_pic: this.state.file, type: this.state.imageType })
        }

      }
    } else if (this.state.isEdit) {
      this.setState({ showImageCorp: false })
      if (this.state.preview === "") {
        if (this.state.file) {
          this.setState({ profile_pic: this.state.file, file: this.state.file })
        }


      } else {
        this.setState({ profile_pic: this.state.profileImg, isProfileUpdated: false })
      }
    }

  }
  saveImage = (e) => {
    if (this.state.isEdit) {
      if (this.state.preview === "" && this.state.type === "") {
        this.setState({
          // staticImg: true,
          dynamicImg: true,
          showImageCorp: false,
          imgErrorMessage: '',
          profile_pic: this.state.profileImg,
          isProfileUpdated: false
        })
        alert("No Changes Found")
        //   if(this.state.dynamicImg ===true){

        //      this.setState({file: this.state.previousPreview, dynamicImg:true , staticImg: false, isProfileUpdated:false, type:this.state.imageType, profile_pic:this.state.file,})
        //  }
      } else {

        this.setState({
          file: this.state.preview, profile_pic: this.state.preview, type: this.state.imageType, previousPreview: this.state.preview,
          displaytext: 'hide_block',
          imgErrorMessage: '',
          staticImg: false,
          dynamicImg: true,
          showImageCorp: false,
          isProfileUpdated: true,
          imgErrorMessage: '',
        })
      }
    }
    else if (this.state.isAdd) {
      if (this.state.preview === "" && this.state.type === "") {
        this.setState({
          staticImg: true,
          dynamicImg: false,
          showImageCorp: false,
          imgErrorMessage: '',
          profile_pic: this.state.profileImg,
          isProfileUpdated: false
        })
        alert("No Changes Found")
        if (this.state.dynamicImg === true) {

          this.setState({ file: this.state.previousPreview, dynamicImg: true, staticImg: false, isProfileUpdated: true, type: this.state.imageType, profile_pic: this.state.file, })
        }
      } else {

        this.setState({
          file: this.state.preview, profile_pic: this.state.preview, type: this.state.imageType, previousPreview: this.state.preview,
          displaytext: 'hide_block',
          imgErrorMessage: '',
          staticImg: false,
          dynamicImg: true,
          showImageCorp: false,
          isProfileUpdated: true,
          imgErrorMessage: '',
        })
      }
    }



  }


  onBeforeFileLoad = (elem) => {

    if (elem.target.files.length > 0 && elem.target.files[0]) {

      var validExtensions = ['jpg', 'png', 'PNG', 'JPG', 'jpeg'];
      var fileName = elem.target.files[0].name;
      var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
      if ($.inArray(fileNameExt, validExtensions) == -1) {
        elem.target.value = "";

        this.setState({
          // staticImg: true,
          //  dynamicImg:false,
          isValidextension: false,
          isValid: false,
          displaytext: 'show_block',
          imgErrorMessage: 'Please select Image in ' + 'PNG,' + '  ' + 'JPG'
        },


        );
      }
      else {

        var fileName = elem.target.files[0].name;
        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
        var base64 = new FileReader();
        // base64.readAsDataURL(e.target.files[0]);
        this.setState({
          //profile_pic: base64.result,
          imageType: fileNameExt,
          isValid: true,

        })

      }


    };
  }


  // imageChansge = (e) => {
  //     if(e.target.files.length>0 && e.target.files[0]){
  //         var validExtensions = ['jpg','png','PNG','JPG','jpeg'];
  //         var fileName = e.target.files[0].name;
  //       var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
  //        if ($.inArray(fileNameExt, validExtensions) == -1) {
  //            this.setState({
  //               staticImg: true,
  //               dynamicImg:false,
  //              isValidextension: false,
  //              displaytext:'show_block',
  //             imgErrorMessage:'Please select Image in ' + 'PNG,'+ '  '+ 'JPG'
  //          },

  //          );
  //       }
  //       else{

  //        this.ChangeImage(e)
  //       }
  //     }


  // }
  ChangeImage(e) {

    if (e.target.files.length > 0 && e.target.files[0]) {
      var fileName = e.target.files[0].name;
      var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
      var base64 = new FileReader();
      base64.readAsDataURL(e.target.files[0]);
      base64.onload = () => {
        this.setState({
          profile_pic: base64.result,
          type: fileNameExt,
          isValidextension: true,
          displaytext: 'hide_block',
          imgErrorMessage: '',
          isProfileUpdated: true
        })
      }

      this.setState({
        file: URL.createObjectURL(e.target.files[0]),
        staticImg: false,
        dynamicImg: true
      })

    }
  }

  showStudentFees = () => {
    if (this.state.studentFeesList !== undefined) {
      return this.state.studentFeesList.map((session, i) => {
        return (
          <tr>
            <td>{((this.state.current_page - 1) * this.state.per_page) + (i + 1)}</td>
            <td>{session.StudentClass}</td>
            <td>{session.FirstName} {session.LastName}</td>
            <td>{session.FeeType}</td>
            <td>{session.GrandTotal?session.GrandTotal:'-'}</td>
            <td>{session.StatusId==1?"Active":"In-Active"}</td>


            {/* <td><img className="team-profile-pic" src={api_Url + '/UserProfile/' + course.profile_pic} title={member.firstname + ' ' + "profile pic"} alt={member.firstname + ' ' + "profile pic"} /></td> */}

            <td>
            {<Link to={`student-fees/${session.StudentFeesMasterId}/${session.StatusId}`}> <i  class="ti-pencil"></i></Link>}
            {" "}  {" "}<Link to={`student-fees/${session.StudentFeesMasterId}`}> <i  class="ti-eye"></i></Link>{" "}{" "}
            {<i  onClick={() => this.deleteStudentFees(session)} class="ti-trash"></i>}
            </td>



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
            onClick={() => this.getStudentFees(number, this.state.per_page, this.state.classId, this.state.status, this.state.searchStr,)}
          >
            {number}
          </span>
        );
      }
    });
  };
// upload image file
uploadFile=(e, type, i)=>{
    debugger
    if (e.target.files && e.target.files.length > 0 ) {
        var a = e.target.files[0].size;
        const fsize = Math.round((a / 1024));
        this.setState({
          fsize: fsize
        })

        console.log(fsize);
        console.log('fsize')
        var fileName = e.target.files[0].name;
        var validExtensions=[];
        if(type=='1'){
        validExtensions=['jpg','png','PNG','JPG','jpeg']
        }
        else{
          validExtensions =  ['xlsx', 'xls'];
        }

        var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
       var isValid = true;
       for(let img of e.target.files){
           debugger
        if($.inArray(img.name.substr(img.name.lastIndexOf('.') + 1), validExtensions) == -1){
            e.target.value = "";
            isValid = false;
            toast.error("Invalid file type")
           }
         break;
         }
         if(e.target.files[0]){
           if(e.target.files[0].size > (1048576*file1)){
             e.target.value = "";
             isValid = false;
             toast.error(`file size should less than ${file1}mb`)
           }
         }
    if(isValid){
    debugger
      var fileName = e.target.files[0].name;
      var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
        let reader = new FileReader();
       this.setState({
            courseImage: type=='1'?(e.target.files[0]):[],
            courseFile:type=='2'?(e.target.files[0]):[],
            fileName:e.target.files[0].name

          })
       if(type=='1'){
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
   }
  render() {
    return (
      <div>
        {this.state.isLoading && <div class="loader1"></div>}
        <div className="page-container">
      <SideBar tabIndex='student-fees'  shown='fees_management' />
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
                    <h4 className="page-title pull-left">Student Fees</h4>

                    <ul className="breadcrumbs pull-left">
                      <li><a >Home</a></li>
                      <li><span>Student Fees</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-content-inner">
              <div class="row">

                <div class="col-lg-12 mt-5">
                  <ul className="filter-ul">
                  {/*<li>
                  <span>Session</span>
                  <select className="input-s br-w-1" name="sessionId" value={this.state.sessionId} onChange={this.handleInputs}>
                    <option value={'0'}>-Select Session-</option>
                    {this.state.sessionList.length > 0 ? this.state.sessionList.map(cls =>
                      <option key={cls.SessionId} value={cls.SessionId}>{cls.SessionName}</option>
                    ) : null}
                  </select>{" "}
                  </li>*/}
                  <li>
                    <span>Status</span>
                    <select className="input-s br-w-1" name="status" value={this.state.status} onChange={this.handleInputs}>
                      <option value={'0'}>-Select Status-</option>
                      <option value={'active'}>Active</option>
                      <option value={'inactive'}>In-Active</option>
                    </select>{" "}
                  </li>
                    <li>
                      <span>Page Size</span>
                      <select className="input-s br-w-1" name="per_page" value={this.state.per_page} onChange={this.handleInputs}>
                      {pageSize.length > 0 ? pageSize.map(size =>
                          <option key={size.id} value={size.id}>{size.size}</option>
                        ) : null}


                      </select>{" "}

                    </li>
                    <li>
                      <button className="search-button" onClick={this.onSearchCourese}>Search</button>
                    </li>
                  </ul>
                  <div class="card">
                    <div class="card-body">
                      <div className="">
                        <h4 class="header-title">Student List</h4>
                        <p className={styles.addCountry}>
                        <Link to="student-fees/insert/insert" >
                          <button
                            //onClick={this.handleShow}
                            className="btn btn-warning btn-xs"
                            data-title="Add"
                            data-toggle="modal"
                            data-target="#add"
                          >
                            {" "}
                      Add Student Fees {" "}
                            <span className="glyphicon glyphicon-plus"> </span>
                          </button>
                          </Link>
                        </p>
                      </div>

                      <div class="single-table">
                        <div class="table-responsive">
                          <table class="table text-center">
                            <thead class="text-uppercase  bg-light-green">
                              <tr class="text-white">
                                {/* <th scope="col">ID</th> */}
                                <th scope="col">S.No</th>
                                <th scope="col">Class Name</th>
                                <th scope="col">Student Name</th>
                                <th scope="col">Fees Type</th>
                                <th scope="col">Grand Total</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>


                              </tr>
                            </thead>


                            <tbody>{this.showStudentFees()}</tbody>


                          </table>
                          {this.state.studentFeesList.length == 0 && <p style={{ textAlign: "center" }}> No Record Found</p>}


                        </div>
                        {this.state.studentFeesList.length>0&&
                      <div className={styles.pagination}>
                      <span className={this.state.current_page=='1'?"disabled":""}
                        onClick={()=> {
                          if(this.state.current_page=='1'){return;}
                          this.getStudentFees(this.state.current_page-1, this.state.per_page, this.state.searchStr)}}>Previous</span>
                        {this.state.studentFeesList.length > 0 && this.renderPageNumbers()}
                    <span  className={Math.ceil(this.state.total / this.state.per_page)==this.state.current_page?"disabled":""}
                        onClick={()=> {
                          if(Math.ceil(this.state.total / this.state.per_page)==this.state.current_page){return;}
                          this.getStudentFees(+this.state.current_page+1, this.state.per_page, this.state.searchStr)}}>Next</span>
                   </div>}
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
            <div>
						<Col sm={4}> Installment Name <small style={{color: 'red', fontSize: 18}}>*</small></Col>
						<Col sm={9}>
							<FormControl type="text" placeholder="Installment Name" value={this.state.installmentName} onChange={this.handleInputs} name="installmentName" />
							<small className={this.state.displaytext + " text-danger"}>{this.state.installmentName_ErMsg}</small>
						</Col>
            {this.state.isAdd&&<><Col sm={4}> Class Name <small style={{color: 'red', fontSize: 18}}>*</small></Col>
            <Col sm={9}>
              <FormControl as="select" value={this.state.classId} name="classId" onChange={this.handleInputs} class="form-control">
                <option>-Select Class Name-</option> {this.state.classList.length > 0 ? this.state.classList.map(classId =>
                  <option key={classId.ClassId} value={classId.ClassId}>{classId.StudentClass}</option>) : null} </FormControl>
              <small className={this.state.displaytext + " text-danger"}>{this.state.classId_ErMsg}</small>
            </Col></>}
            <Col sm={4}> Total Amount <small style={{color: 'red', fontSize: 18}}>*</small></Col>
						<Col sm={9}>
							<FormControl type="text" placeholder="Total Amount" value={this.state.totalAmount} onChange={this.handleInputs} name="totalAmount" />
							<small className={this.state.displaytext + " text-danger"}>{this.state.totalAmount_ErMsg}</small>
						</Col>
            <Col sm={4}> Remark</Col>
						<Col sm={9}>
							<FormControl type="text" placeholder="Remark" value={this.state.remark} onChange={this.handleInputs} name="remark" />
							<small className={this.state.displaytext + " text-danger"}>{this.state.remark_ErMsg}</small>
						</Col>
            <Col sm={9}>
              <input type="checkbox"  checked={this.state.active} onChange={this.onChageCheckboxActive} name="active" /> Is Active
						</Col>
            </div>
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.handleClose}>Close</Button>
				<Button type="submit" disabled={this.state.isValiddata} onClick={this.manageStudentFees} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
			</Modal.Footer>
		</Modal>
	</div>
   {/* Delete modal */}
   <div className="static-modal">
	<div>
		<Modal show={this.state.showDeleteModal} onHide={this.handleDeleteClose}>
			<Modal.Header closeButton>
				<Modal.Title>{this.state.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form horizontal>
					<FormGroup controlId="formHorizontalEmail">
                         {/*
						<Col sm={3}> Country Name </Col> */}
						<Col sm={9}> Are you sure you want to delete <strong>{this.state.installmentName}</strong> ?
							<p className={this.state.displaytext + " text-danger"}>{this.state.descriptionErrorMessage}</p>
						</Col>
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.handleDeleteClose}>Close</Button>
				<Button type="submit" onClick={this.deleteStudentFeesById} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
			</Modal.Footer>
		</Modal>
	</div>
</div>
    {/* Crop image modal */}
    <div className="static-modal">
	<div>
		<Modal show={this.state.showImageCorp} onHide={this.CloseImageCrop}>
			<Modal.Header closeButton>
				<Modal.Title>Crop Imagse</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ padding: '50px' }}>
				<Avatar width={400} height={300} imageWidth={400} imageHeight={300} onCrop={this.onCrop} onClose={this.onClose} onBeforeFileLoad={this.onBeforeFileLoad} label="Upload new image" labelStyle={{ color: '#aacc88', fontSize: '20px' }} borderStyle={{ border: '2px dashed #aacc88', textAlign: 'center', margin: 'auto', marginTop: '25px', marginBottom: '25px' }} closeIconColor="red" src={this.state.src} />
				<p className={this.state.displaytext + " text-danger"}>{this.state.imgErrorMessage}</p>
			</Modal.Body>
			<Modal.Footer>
				<button className="reset-pass100-form-btn" onClick={this.CloseImageCrop}>Close</button> {this.state.isValid &&
				<button type="submit" onClick={this.saveImage} className="reset-pass100-form-btn"> {" "} {" "} SAVE </button>} </Modal.Footer>
		</Modal>
	</div>
</div>
      </div>
    );
  }
}





export default StudentFees
