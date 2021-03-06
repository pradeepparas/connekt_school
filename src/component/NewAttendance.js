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

class NewAttendance extends React.Component {
  constructor() {
    super();
    this.state = {
      attendanceStatus: "",
      attendanceDate: "",
      attendanceTime_ErMsg: "",
      attendanceTime: "",
      toDate: moment(new Date()).format("YYYY-MM-DD"),
      fromDate:moment(new Date()).format("YYYY-MM-DD"),
      attendanceList:[],
      studentId:"",
      studentId_ErMsg:"",
      resultDt: "",
      resultDate: "",
      resultDate_ErMsg: "",
      appt: 0,
      appt_ErMsg:"",
      //attendanceList: [],
      change: false,
      count: false,
      courseList: [],
      classList:[],
      chapterList:[],
      //attendanceList:[],
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

//   [{
//     "StudentAttendanceId":2,
//     "AttendanceDate": "2020-10-31",
//     "AttendanceTime": "08:00:00.000000",
//     "ClassId":1,
//     "CourseId":6,
//     "StudentId": 751,
//     "AttendanceStatus":"1",
//     "StatusId": "1"
// }]

  editAttendance = (data) => {
    console.log(data)
    debugger
    this.setState({
       show: true,
       classId: data.ClassId,
       courseId: data.CourseId,
       attendanceTime: data.AttendanceTime,
       attendanceStatus: data.AttendanceStatus=='0'?'3':data.AttendanceStatus,
       studentId: data.StudentId,
       studentName: data.ClassId,
       attendanceDate: moment(data.AttendanceDate).format("YYYY-MM-DD"),
       //endDate: moment(data.ToDate).format("YYYY-MM-DD"),
       id: data.StudentAttendanceId,
      //insertType:"single",
      // courseImage:[],
       title: 'Update Student Attendance',
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
    if(e.target.value!=='0'&&e.target.name!='classId'){
    this.setState({
      [e.target.name]: e.target.value, [e.target.name+`_ErMsg`]:"",
      count: (e.target.name == 'per_page')? true : false
    },
      () => {
        debugger
        console.log("this.state.appt",this.state.appt)
        if(this.state.count){
         this.getAttendance(this.state.current_page)
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
         else if(type=='from'){
            this.setState({
                fromDate:moment(date).format("YYYY-MM-DD")
         })
       }
       else if(type=='to'){
          this.setState({
              toDate:moment(date).format("YYYY-MM-DD")
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
    let session = window.sessionStorage.getItem('SessionId');
    if (token === null&&session==null) {
      localStorage.clear();
      sessionStorage.clear();
      return this.props.history.push('/login');
    } else {
      this.setState({
        sessionId: session
      },()=> {
        this.getAttendance(1)
      })
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
getAttendance = async pageNumber => {
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

const response = await fetch( api_Url+`getAttendanceBySchoolClassCourseAndStudentId?page=${pageNumber}&size=${this.state.per_page}&status=${value}&FromDate=${this.state.fromDate}&ToDate=${this.state.toDate}&classId=${this.state.classId}&courseId=${this.state.courseId}&studentId=&SessionId=${this.state.sessionId}`,{
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
        attendanceList: data.AttendanceDetail,
        total: data.TotalCount[0].Total,
        current_page:pageNumber,
     });


 } else {
     this.setState({
      attendanceList: []
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
   var timeValid = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/
   var isValid=true;

  if(this.state.attendanceTime.toString().trim()==''||!this.state.attendanceTime.match(timeValid)){
        isValid= false
        return this.setState({attendanceTime_ErMsg:"Time is required or invalid format", chapterId_ErMsg:"", courseId_ErMsg:"", holidayName_ErMsg:"", startDate_ErMsg:"", endDate_ErMsg:"", examDoc_ErMsg:"", appt_ErMsg:"",passingMarks_ErMsg:""})
    }

    else  if(this.state.attendanceStatus.trim()==''){
        isValid= false
        return this.setState({attendanceTime_ErMsg:"", attendanceStatus_ErMsg:"attendance status is required", courseId_ErMsg:"", holidayName_ErMsg:"", startDate_ErMsg:"", endDate_ErMsg:"", examDoc_ErMsg:"", appt_ErMsg:"",passingMarks_ErMsg:""})
    }
    else{
        this.setState({attendanceTime_ErMsg:"", attendanceStatus_ErMsg:"", courseId_ErMsg:"", holidayName_ErMsg:"", startDate_ErMsg:"", endDate_ErMsg:"", examDoc_ErMsg:"", appt_ErMsg:"",passingMarks_ErMsg:""})
        return isValid
    }
}

// deletes notes by Id
  deleteHolidayById = async(e) => {
    debugger
    e.preventDefault();
    //http://35.200.220.64:1500/aarambhTesting/deleteHoliday?HolidayId=1
    this.setState({isLoading:true})

    fetch(api_Url+`deleteHoliday?HolidayId=${this.state.id}`,{
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
     if(result.message=="Holiday Deleted."){
       toast.success(result.message,{

       })
       this.setState({id:""},()=>{
        this.getAttendance(this.state.current_page, this.state.per_page)

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
  manageAttendance= (e) => {
    debugger
    e.preventDefault();
      if(!this.validateForm()){
        return
      }
    if(this.state.isEdit){

     var data = [{
       "StudentAttendanceId":this.state.id,
       "AttendanceDate": this.state.attendanceDate,
       "AttendanceTime": this.state.attendanceTime,
       "ClassId": this.state.classId,
       "CourseId": this.state.courseId,
       "StudentId": this.state.studentId,
       "AttendanceStatus": this.state.attendanceStatus=='3'?'0':this.state.attendanceStatus,
       "StatusId": "1"
      }]
    debugger

   this.setState({isLoading:true})
   // http://35.200.220.64:1500/aarambhTesting/updateHoliday
    fetch(api_Url+`updateStudentAttendance`,{
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
          this.getAttendance(this.state.current_page, this.state.per_page, this.state.searchStr);

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

  deleteHoliday = (data) => {
    console.log(data)
    debugger
     this.setState({
       id: data.HolidayId,
    //   fileName: data.NotesDocx,
       title: 'Delete Holiday',
       btntitle: 'Delete',
       btnValue: "Delete",
       show: false,
       showDeleteModal: true,
       isEdit: false,
       isAdd: false,
       isDelete: true,
       holidayName: data.HolidayName,
       displaytext: 'hide_block',
     })

  }

  showStudent = () => {
    console.log('attendanceList')
    console.log(this.state.attendanceList.length)
    if (this.state.attendanceList !== undefined) {
      return this.state.attendanceList.map((attendance, i) => {
           return (
          <tr>
            <td>{((this.state.current_page - 1) * this.state.per_page) + (i + 1)}</td>
            <td>{attendance.StudentClass}</td>
            <td>{attendance.AttendanceTime}</td>
            <td> {moment(attendance.AttendanceDate).format('DD-MMM-YYYY')}</td>
            <td>{attendance.AttendanceStatus=='0'&&'Absent'||attendance.AttendanceStatus=='1'&&'Present'||attendance.AttendanceStatus=='2'&&'Leave'}</td>
            {/**/}{/**/}

            <td>
            <i  onClick={() => this.editAttendance(attendance)} class="ti-pencil"></i>
            {" "}  {" "}
          {/*<Link to={`student-assignment/${test.AssignmentId}`}> <i  class="ti-eye"></i></Link>*/}
            </td>



          </tr>
        );
      });
    }
  };
// on search exam
onSearchHoliday =()=>{
  this.getAttendance(1)
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
            onClick={() => this.getAttendance(number, this.state.per_page, this.state.classId, this.state.courseId, this.state.status)}
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
      <SideBar tabIndex='newattendance'  shown='master' />
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
                    <h4 className="page-title pull-left">Attendance</h4>

                    <ul className="breadcrumbs pull-left">
                      <li><a >Home</a></li>
                      <li><span>Attendance</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-content-inner">
              <div class="row">

                <div class="col-lg-12 mt-5">



              <ul className="filter-ul">
                    {<li style={{width: 186}}>
                      <span>From Date</span>
                      <DatePicker style={{ width: "322px" }} className="input-s br-w-1" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" selected={new Date()} value={this.state.fromDate}  onChange={(e) => this.handleChange(e,'from')} placeholderText="MM-DD-YYYY" />
                    </li>}
                    {<li style={{width: 186}}>
                      <span>To Date</span>
                      <DatePicker style={{ width: "322px" }} className="input-s br-w-1" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" selected={new Date()} value={this.state.toDate}  onChange={(e) => this.handleChange(e,'to')} placeholderText="MM-DD-YYYY" />
                    </li>}
                    {/*<li> fetch
                      <span>Test Name</span><br></br>
                      <input className="input-s br-w-1" type="text" placeholder="Test Name" name="searchStr" value={this.state.searchStr} onChange={this.handleInputs} />
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
                      <button className="search-button" onClick={this.onSearchHoliday}>Search</button>
                    </li>
                  </ul>



                  <div class="card">
                    <div class="card-body">
                      <div className="">
                        <h4 class="header-title">Student List</h4>
                        <p className={styles.addCountry}>
                        <Link to="/newattendance/insert" >
                          <button
                            onClick={this.insertAttendance}
                            className="btn btn-warning btn-xs"
                            data-title="Add"
                            data-toggle="modal"
                            data-target="#add"
                          >
                            {" "}
                      Mark Attendance {" "}
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
                                <th scope="col">Student Class</th>
                                <th scope="col">Attendance Time</th>
                                <th scope="col">Attendance Date</th>
                                <th scope="col">Attendance Status</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>


                            <tbody>{this.showStudent()}</tbody>


                          </table>
                          {this.state.attendanceList.length == 0 && <p style={{ textAlign: "center" }}> No Record Found</p>}


                        </div>
                        {this.state.attendanceList.length>0&&
                      <div className={styles.pagination}>
                      <span className={this.state.current_page=='1'?"disabled":""}
                        onClick={()=> {
                          if(this.state.current_page=='1'){
                            debugger
                            return;}
                          this.getAttendance(this.state.current_page-1, this.state.per_page, this.state.searchStr)
                        }}>Previous</span>
                      {this.state.attendanceList.length > 0 && this.renderPageNumbers()}
                    <span  className={Math.ceil(this.state.total / this.state.per_page)==this.state.current_page?"disabled":""}
                      onClick={()=> {
                        if(Math.ceil(this.state.total / this.state.per_page)==this.state.current_page){
                          debugger
                          return;
                        }
                        this.getAttendance(+this.state.current_page+1, this.state.per_page, this.state.searchStr)
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
            <Col sm={6}> Attendance Time (HH:MM:SS)<small style={{color: 'red', fontSize: 18}}>*</small></Col>
           <Col sm={9}>
            <FormControl type="text" placeholder="HH:MM:SS" value={this.state.attendanceTime} onChange={this.handleInputs} name="attendanceTime" />
            <small className={this.state.displaytext + " text-danger"}>{this.state.attendanceTime_ErMsg}</small>
            </Col>
            <Col sm={4}> Attendance Status <small style={{color: 'red', fontSize: 18}}>*</small></Col>
                  <Col sm={9}>
                    <FormControl as="select" value={this.state.attendanceStatus} name="attendanceStatus" onChange={this.handleInputs} class="form-control">
                      <option>-Attendance Status-</option>
                        <option value={'3'}>Absent</option>
                        <option value={'1'}>Present</option>
                        <option value={'2'}>Leave</option>
                      </FormControl>
                    <small className={this.state.displaytext + " text-danger"}>{this.state.attendanceStatus_ErMsg}</small>
                  </Col>
        </div>
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.handleClose}>Close</Button>
				<Button type="submit" disabled={this.state.isValiddata} onClick={this.manageAttendance} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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
						<Col sm={9}> Are you sure you want to delete <strong>{this.state.holidayName}</strong> ?
							<p className={this.state.displaytext + " text-danger"}>{this.state.descriptionErrorMessage}</p>
						</Col>
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.handleDeleteClose}>Close</Button>
				<Button type="submit" onClick={this.deleteHolidayById} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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





export default NewAttendance
