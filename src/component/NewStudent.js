import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom'
import styles from "../css/App.module.css";
import { Button } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
import DatePicker from 'react-datepicker';

import { Form, FormGroup, FormControl, Col } from "react-bootstrap";
import SideBar from './SideBar';
import banner from '../Images/singin-bg.png';
import * as $ from 'jquery';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import upload_icon from '../Images/upload_icon1.png';
import Avatar from 'react-avatar-edit'
import * as myConstClass from './constants';
const api_Url = myConstClass.api
const pageSize = myConstClass.pageSize
const download = myConstClass.url

class NewStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      studentList: [],
      //studentList:[],
      studentId:"",
      studentId_ErMsg:"",
      resultDt: "",
      resultDate: "",
      resultDate_ErMsg: "",
      appt: 0,
      appt_ErMsg:"",
      //studentList: [],
      change: false,
      count: false,
      courseList: [],
      classList:[],
      chapterList:[],
      //studentList:[],
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
      courseId:"",
      chapterId:"",
      holidayName:"",
      startDate:"",
      endDate:"",
      classId_ErMsg:"",
      courseId_ErMsg:"",
      chapterId_ErMsg:"",
      holidayName_ErMsg:'',
      startDate_ErMsg:"",
      endDate_ErMsg:"",
      examDoc_ErMsg:"",
      examDoc:[],
      active:true,
      searchStr:"",
      status:"",
      totalMarks: "",
      totalMarks_ErMsg:"",
      passingMarks: "",
      passingMarks_ErMsg: ""

    };


  }

  editHoliday = (data) => {
    console.log(data)
    debugger
    this.setState({
       show: true,
       holidayName: data.HolidayName,
       startDate: moment(data.FromDate).format("YYYY-MM-DD"),
       endDate: moment(data.ToDate).format("YYYY-MM-DD"),
       id: data.HolidayId,
      insertType:"single",
      // courseImage:[],
       title: 'Update Holiday',
       active:data.StatusId==1?true:false,
       btntitle: 'Update',
       isAdd: false,
       isEdit: true,
       isDelete: false,
       displaytext: 'hide_block',
        });

  };

  // ON CHANGE INSERT TYPE
  onChangeInsertType =(e)=>{
    debugger
    this.setState({insertType:e.target.name,})
    }


// handle input changes
  handleInputs = (e) => {
    debugger
    if(e.target.value!=='0'){
    this.setState({
      [e.target.name]: e.target.value, [e.target.name+`_ErMsg`]:"",
      count: (e.target.name == 'per_page')? true : false
    },
      () => {
        debugger
        console.log("this.state.appt",this.state.appt)
        if(this.state.count){
         this.getStudent(this.state.current_page)
        }
      });
      }
  }


     // ON CHANGE DATE
     handleChange = (date, type) => {
       debugger
         if(type=='start'){
            this.setState({
                assignDt:date,
                startDate:moment(date).format("YYYY-MM-DD")
         })
         }
         else if(type=='end'){
            this.setState({
                completionDt:date,
                endDate:moment(date).format("YYYY-MM-DD")
         })
       } else {
         this.setState({
             resultDt:date,
             resultDate:moment(date).format("YYYY-MM-DD")
      })
      }

    };


  componentDidMount() {
    $('.nav-btn').on('click', function () {
        $('.page-container').toggleClass('sbar_collapsed');
      });
    let token = window.sessionStorage.getItem('auth_token');
    if (token === null) {
      return this.props.history.push('/login');
    } else {
      this.getStudent(1)
    }
  }


  handleShow = () => {

    this.setState({
      //classId_ErMsg:"",
      show: true,
      resultDate: "",
      title: 'Add Holiday',
      classId:"",
      courseId:"",
      holidayName:"",
      holidayName_ErMsg:"",
      startDate:"",
      startDate_ErMsg:"",
      endDate:"",
      endDate_ErMsg:"",
      totalMarks:"",
      totalMarks_ErMsg:"",
      passingMarks:"",
      passingMarks_ErMsg:"",
      id:"",
      fileName:"",
      topicName:"",
      otherDetails:"",
      topicImage:[],
      classId_ErMsg:"",
      courseId_ErMsg:"",
      topicName_ErMsg:"",
      insertType:"single",
      otherDetails_Er_Msg:"",
      topicImage_ErMsg:"",

      btntitle: 'Save',
      isAdd: true,
      isEdit: false,
      isDelete: false,
      displaytext: 'hide_block',
      imgSrc:"",
      partName:"",
      videoTitle:"",
      videoId:"",
      videoUrl:"",
      description:"",
      thumbnail:"",
      partName_ErMsg:"",
      videoTitle_Er_Msg:"",
      videoId_Er_Msg:"",
      videoUrl_Er_Msg:"",
      desciption_Er_Msg:"",
      tumbnail_Er_Msg:"",
        });

  };


    // on chaage active
    onChageCheckboxActive = (e) => {
      debugger
      this.setState({ active: !this.state.active })
    }

/// GET Student LIST
getStudent = async pageNumber => {
  this.setState({isLoading:true})
try{
//url=`getStudentListBySchoolId?pageNo=${pageNumber}&size=${this.state.per_page}&classId=${this.props.match.params.id}&studentname=${this.state.searchStr}`
const response = await fetch( api_Url+`getStudentListBySchoolId?pageNo=${pageNumber}&size=${this.state.per_page}&classId=${this.state.classId}&studentname=`,{
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
   console.log(data)
   debugger
   this.setState({
       studentList: data.SearchData,
       total: data.TotalCount[0].Total,
       current_page:pageNumber,
     });


 } else {
     this.setState({
      studentList: []
     });
 }
this.setState({isLoading:false})
}
catch(err)
{
  toast.error('Error found',err)
  console.log('error console')
  console.log(err)
}
};
  handleClose = () => {
    this.setState({ show: false, classId:"", courseId:"", chapterId:"", examDoc: []});
  };
  handleDeleteClose = () => {
    this.setState({ showDeleteModal: false });
  };

// validate form
validateForm =()=>{
  debugger
   var isValid=true;

  if(this.state.holidayName.trim()==''){
        isValid= false
        return this.setState({classId_ErMsg:"", chapterId_ErMsg:"", courseId_ErMsg:"", holidayName_ErMsg:"Exam name is required", startDate_ErMsg:"", endDate_ErMsg:"", examDoc_ErMsg:"", appt_ErMsg:"",passingMarks_ErMsg:""})
    }

    else  if(this.state.startDate.trim()==''){
        isValid= false
        return this.setState({classId_ErMsg:"", chapterId_ErMsg:"", courseId_ErMsg:"", holidayName_ErMsg:"", startDate_ErMsg:"Exam start date is required", endDate_ErMsg:"", examDoc_ErMsg:"", appt_ErMsg:"",passingMarks_ErMsg:""})
    }
    else  if(this.state.endDate.trim()==''){
        isValid= false
        return this.setState({classId_ErMsg:"", chapterId_ErMsg:"", courseId_ErMsg:"", holidayName_ErMsg:"", startDate_ErMsg:"", endDate_ErMsg:"End date is required", examDoc_ErMsg:"", appt_ErMsg:"",passingMarks_ErMsg:""})
    }
    else{
        this.setState({classId_ErMsg:"", chapterId_ErMsg:"", courseId_ErMsg:"", holidayName_ErMsg:"", startDate_ErMsg:"", endDate_ErMsg:"", examDoc_ErMsg:"", appt_ErMsg:"",passingMarks_ErMsg:""})
        return isValid
    }
}

// deletes notes by Id
  deleteEnquiryById = async(e) => {
    debugger
    e.preventDefault();
    //http://35.200.220.64:4000/connektschool/deleteEnquiry?EnquiryId=1&status=0
    this.setState({isLoading:true})

    fetch(api_Url+`deleteEnquiry?EnquiryId=${this.state.id}&status=0`,{
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
     if(result.message=="Enquiry Deleted."){
       toast.success(result.message,{

       })
       this.setState({id:""},()=>{
        this.getStudent(this.state.current_page, this.state.per_page)

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

  // manage exam
  manageHoliday= (e) => {
    debugger
    e.preventDefault();
      if(!this.validateForm()){
        return
      }

   if(this.state.isAdd){
     var data = {
    "HolidayName": this.state.holidayName,
    "FromDate": this.state.startDate,
    "ToDate": this.state.endDate,
      }

    this.setState({isLoading:true})
  //   http://35.200.220.64:1500/aarambhTesting/insertHoliday
  //  return;
    fetch(api_Url+`insertHoliday`,{
      method:"POST",
      headers :{
        "Accept":"Application/json",
         "Content-Type":"Application/json",
        "Authorization":"Bearer "+sessionStorage.getItem("auth_token"),
      },
      body:JSON.stringify(data),
    })
    .then(res=>res.json())
    .then(result=>{
        debugger
      if(result.success){
        this.setState({courseId:"",chapterId:"", classId:""},()=>{
          this.getStudent(this.state.current_page, this.state.per_page, this.state.searchStr);
        })
        toast.success(result.message,{
        })
       this.handleClose()
      }
      else{
     toast.error(result.message,{

     })
      }
      this.setState({isLoading:false})

    }).catch((e) => toast.error(e))
   }
   else if(this.state.isEdit){
    //  {
    // "HolidayId":2,
    // "HolidayName": "Diwali",
    // "FromDate": "2020.11.13",
    // "ToDate": "2020.11.16",
    // "StatusId":"0"
    // }
     var data = {
    "HolidayId":this.state.id,
    "HolidayName": this.state.holidayName,
    "FromDate": this.state.startDate,
    "ToDate": this.state.endDate,
    "StatusId":this.state.active?1:0
      }
    debugger

   this.setState({isLoading:true})
   // http://35.200.220.64:1500/aarambhTesting/updateHoliday
    fetch(api_Url+`updateHoliday`,{
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
        this.setState({courseId:"",chapterId:"", classId:""},()=>{
          this.getStudent(this.state.current_page, this.state.per_page, this.state.searchStr);

        })
        this.handleClose()
      }
      else{
     toast.error(result.message,{

     })
      }
      this.setState({isLoading:false})

    })
   }

   else{

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

  deleteEnquiry = (data) => {
    console.log(data)
    debugger
     this.setState({
       id: data.EnquiryId,
    //   fileName: data.NotesDocx,
       title: 'Delete Enquiry',
       btntitle: 'Delete',
       btnValue: "Delete",
       show: false,
       showDeleteModal: true,
       isEdit: false,
       isAdd: false,
       isDelete: true,
       holidayName: data.EnquiryName,
       displaytext: 'hide_block',
     })

  }

  showEnquiry = () => {
    console.log('studentList')
    console.log(this.state.studentList.length)
    if (this.state.studentList !== undefined) {
      return this.state.studentList.map((enquiry, i) => {
           return (
          <tr>
            <td>{((this.state.current_page - 1) * this.state.per_page) + (i + 1)}</td>
            <td>{enquiry.EnrollmentNumber?enquiry.EnrollmentNumber:'-'}</td>
            <td>{enquiry.FirstName} {enquiry.LastName}</td>
            <td>{enquiry.studentclass}</td>
            <td>{enquiry.Section}</td>
            <td>{enquiry.StudentGender}</td>
            <td> {moment(enquiry.StudentDOB).format('DD-MMM-YYYY')}</td>
            <td>{enquiry.Medium?enquiry.Medium:'-'}</td>
            <td>{enquiry.StatusId=='1'?"Active":"In-Active"}</td>
            <td>
            <Link to={`students/${enquiry.StudentId}`}> <i  class="ti-pencil"></i></Link>
            {" "}  {" "}
            {/*<i  onClick={() => this.deleteEnquiry(enquiry)} class="ti-trash"></i>*/}
            </td>
            {/**/}{/**/}

            {/*<td>
            <i  onClick={() => this.editAssignment(test)} class="ti-pencil"></i>
            {" "}  {" "}
          <Link to={`student-assignment/${test.AssignmentId}`}> <i  class="ti-eye"></i></Link>
            </td>*/}



          </tr>
        );
      });
    }
  };
// on search exam
onSearchHoliday =()=>{
  this.getStudent(1)
}

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
            onClick={() => this.getStudent(number, this.state.per_page, this.state.classId, this.state.courseId, this.state.status)}
          >
            {number}
          </span>
        );
      }
    });
  };

// upload image file
uploadFile=(e, type)=>{
    debugger
    if (e.target.files && e.target.files.length > 0 ) {
        var fileName = e.target.files[0].name;
       var validExtensions = ['csv', 'xlsx','pdf',  'docx','doc','xlx'];

       var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
       var isValid = true;
       for(let img of e.target.files){
           debugger
        if($.inArray(img.name.substr(img.name.lastIndexOf('.') + 1), validExtensions) == -1){
            e.target.value = "";
            isValid = false;
            toast.error("Invalid file format, only csv, .xlsx, docs. doc, xlx, pdf, file format allowed")
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
            examDoc:(e.target.files[0]),
            fileName:e.target.files[0].name

          })

          //   reader.onloadend = () => {
          //     debugger
          //     this.setState({
          //     //  audio_src: reader.result, audioErrorMsg: "",
          //     })
          //   }
          // reader.readAsDataURL(e.target.files[0]);
       }


      }

  }
  render() {
    return (
      <div>
        {this.state.isLoading && <div class="loader1"></div>}
        <div className="page-container">
      <SideBar tabIndex='students'  shown='master' />
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
                    <h4 className="page-title pull-left">Admission</h4>

                    <ul className="breadcrumbs pull-left">
                      <li><a >Home</a></li>
                      <li><span>Admission</span></li>
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
                      <span>Chapter Name</span>
                      <select className="input-s br-w-1" name="chapterId" value={this.state.chapterId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Chapter-</option>
                        {this.state.chapterList.length > 0 ? this.state.chapterList.map(chapter =>
                          <option key={chapter.ChapterId} value={chapter.ChapterId}>{chapter.ChapterName}</option>
                        ) : null}

                      </select>{" "}
                    </li>*/}

                    {/*<li>
                      <span>Test Name</span><br></br>
                      <input className="input-s br-w-1" type="text" placeholder="Test Name" name="searchStr" value={this.state.searchStr} onChange={this.handleInputs} />
                    </li>*/}
                    {/*<li>
                      <span>Status</span>
                      <select className="input-s br-w-1" name="status" value={this.state.status} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Status-</option>
                        <option value={'active'}>Active</option>
                        <option value={'inactive'}>In-Active</option>
                      </select>{" "}
                    </li>*/}
                    <li>
                      <span>Page Size</span>
                      <select className="input-s br-w-1" name="per_page" value={this.state.per_page} onChange={this.handleInputs}>
                      {pageSize.length > 0 ? pageSize.map(size =>
                          <option key={size.id} value={size.id}>{size.size}</option>
                        ) : null}


                      </select>{" "}

                    </li>
                    <li>
                      <button className="search-button" onClick={this.onSearchHoliday}>Search</button>
                    </li>
                  </ul>



                  <div class="card">
                    <div class="card-body">
                      <div className="">
                        <h4 class="header-title">Admissions List</h4>
                        <p className={styles.addCountry}>
                        <Link to="students/insert" >
                          <button
                            onClick={this.insertAttendance}
                            className="btn btn-warning btn-xs"
                            data-title="Add"
                            data-toggle="modal"
                            data-target="#add"
                          >
                            {" "}
                      Add Admission {" "}
                            <span className="glyphicon glyphicon-plus"> </span>
                          </button></Link>
                        </p>
                      </div>

                      <div class="single-table">
                        <div class="table-responsive">
                          <table class="table text-center">
                            <thead class="text-uppercase  bg-light-green">
                              <tr class="text-white">
                                {/* <th scope="col">ID</th> */}
                                <th scope="col">S.No</th>
                                <th scope="col">Enrollment Number</th>
                                <th scope="col">Student Name</th>
                                <th scope="col">Class</th>
                                <th scope="col">Section</th>
                                <th scope="col">Gender</th>
                                <th scope="col">D.O.B</th>
                                <th scope="col">Medium</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>


                            <tbody>{this.showEnquiry()}</tbody>


                          </table>
                          {this.state.studentList.length == 0 && <p style={{ textAlign: "center" }}> No Record Found</p>}


                        </div>
                        {this.state.studentList.length>0&&
                      <div className={styles.pagination}>
                      <span className={this.state.current_page=='1'?"disabled":""}
                        onClick={()=> {
                          if(this.state.current_page=='1'){
                            debugger
                            return;}
                          this.getStudent(this.state.current_page-1, this.state.per_page, this.state.searchStr)
                        }}>Previous</span>
                      {this.state.studentList.length > 0 && this.renderPageNumbers()}
                    <span  className={Math.ceil(this.state.total / this.state.per_page)==this.state.current_page?"disabled":""}
                      onClick={()=> {
                        if(Math.ceil(this.state.total / this.state.per_page)==this.state.current_page){
                          debugger
                          return;
                        }
                        this.getStudent(+this.state.current_page+1, this.state.per_page, this.state.searchStr)
                      }}>Next</span>
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
                  <Col sm={4}> Holiday Name <small style={{color: 'red', fontSize: 18}}>*</small></Col>
      						<Col sm={9}>
      							<FormControl type="text" placeholder="Holiday Name" value={this.state.enquiryName} onChange={this.handleInputs} name="holidayName" />
      							<small className={this.state.displaytext + " text-danger"}>{this.state.holidayName_ErMsg}</small>
      						</Col>
                         <Col sm={4}>Holiday Start Date <small style={{color: 'red', fontSize: 18}}>*</small></Col>
                                <Col sm={9}>
                                    <DatePicker style={{ width: "322px" }} className="form-control w-322" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" selected={this.state.assignDt} value={this.state.startDate} minDate={new Date()} maxDate={this.state.endDate ? new Date(this.state.endDate) : ''} onChange={(e) => this.handleChange(e,'start')} placeholderText="MM-DD-YYYY" />
                                 <small className={this.state.displaytext + " text-danger"}>{this.state.startDate_ErMsg}</small>
                        </Col>
                        <Col sm={4}>Holiday End Date <small style={{color: 'red', fontSize: 18}}>*</small></Col>
                                <Col sm={9}>
                                    <DatePicker style={{ width: "322px" }} className="form-control w-322" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" selected={this.state.completionDt} value={this.state.endDate} minDate={this.state.startDate? new Date(this.state.startDate) : new Date()} maxDate={this.state.resultDate ? new Date(this.state.resultDate) : ''} onChange={(e) => {this.handleChange(e,'end')}} placeholderText="MM-DD-YYYY" />
                                 <small className={this.state.displaytext + " text-danger"}>{this.state.endDate_ErMsg}</small>
                        </Col>
                        {/*<Col sm={4}>Exam Result Date <small style={{color: 'red', fontSize: 18}}>*</small></Col>
                                <Col sm={9}>
                                    <DatePicker style={{ width: "322px" }} className="form-control w-322" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" selected={this.state.resultDt} value={this.state.resultDate} minDate={this.state.endDate? new Date(this.state.endDate) : new Date()} onChange={(e) => {this.handleChange(e,'result')}} placeholderText="MM-DD-YYYY" />
                                 <small className={this.state.displaytext + " text-danger"}>{this.state.endDate_ErMsg}</small>
                        </Col>*/}
        <Col sm={9}>
          <input type="checkbox"  checked={this.state.active} onChange={this.onChageCheckboxActive} name="active" /> Is Active
        </Col>
        </div>
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.handleClose}>Close</Button>
				<Button type="submit" disabled={this.state.isValiddata} onClick={this.manageHoliday} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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
						<Col sm={9}> Are you sure you want to delete Enquiry Name : <strong>{this.state.holidayName}</strong> ?
							<p className={this.state.displaytext + " text-danger"}>{this.state.descriptionErrorMessage}</p>
						</Col>
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.handleDeleteClose}>Close</Button>
				<Button type="submit" onClick={this.deleteEnquiryById} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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





export default NewStudent
