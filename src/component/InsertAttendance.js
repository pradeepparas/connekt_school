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

class Attendance extends React.Component {
  constructor() {
    super();
    this.state = {
      attendanceDate:"",
      attendanceTime:"",
      studentId: "",
      studentList:[],
      resultDt: "",
      resultDate: "",
      resultDate_ErMsg: "",
      appt: 0,
      appt_ErMsg:"",
      holidayList: [],
      change: false,
      count: false,
      courseList: [],
      classList:[],
      chapterList:[],
      //holidayList:[],
      id: '',
      btnValue: "Submit",
      show: false,
      showDeleteModal: false,
      isEdit: false,
      isAdd: true,
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
         //this.getHoliday(this.state.current_page)
        }

      });
      if(e.target.name=='classId'){
        // reset course id on class change
        this.setState({courseId:"",  chapterList: []})
        this.getCoursebyId(e.target.value)
        this.getStudentList(e.target.value)
      }
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
                attendanceDate:moment(date).format("YYYY-MM-DD")
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
      this.getClass(1)
      if(this.props.match.params.id!=='insert'){
        this.getAttendanceDetails(1)
      }
      //this.getStudentList(1)
      //this.getHoliday(1)
    }
  }

  /// GET CLASS LIST
  getClass = async pageNumber => {
    debugger
      this.setState({isLoading:true})
    try{
    const response = await fetch( api_Url+`getTimeTableByClassIdDD`,{
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
      if(sessionStorage.getItem('role')=='3'){
        debugger
       var value=[]
     data.TimeTable.forEach(element => {
       debugger
       let ar = value.find(x=>x.ClassId==element.ClassId)
       if(ar){

         }
         else{
           value.push(element)
         }
     });

     data.TimeTable=value;
   }
         this.setState({
             classList: data.TimeTable,
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

  // get student details
  getAttendanceDetails = async(number) => {
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getAttendanceById?page=1&size=10&StudentAttendanceId=${this.props.match.params.id}`,{
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
     console.log(data)
     debugger
     console.log(data,'datABBBBBBBBBBB',)
    // console.log(list, 'list')
    //  console.log(data,'datA',)
     console.log('list')
       this.setState({
         studentName: data.AttendanceDetail[0].StudentName,
         classId: data.AttendanceDetail[0].ClassId,
         courseId: data.AttendanceDetail[0].CourseId,
         studentId: data.AttendanceDetail[0].StudentId,
         attendanceDate: moment(data.AttendanceDetail[0].AttendanceDate).format("YYYY-MM-DD"),
         attendanceTime: data.AttendanceDetail[0].AttendanceTime,
         isEdit:true,
         isAdd:false
           //courseList: data.course,
       },()=> {
         this.getCoursebyId(this.state.classId)
       });

   } else {
      debugger
       this.setState({
        //courseList: []
       });
   }
  this.setState({isLoading:false})
  }
  catch(err)
  {
    debugger
  }
  }

  getCoursebyId = async (id) =>{
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getCourseByClassAndSchoolId?classId=${id}`,{
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
     console.log(data)
     debugger
     let value = this.state.AAssign;
     console.log(data,'datABBBBBBBBBBB',)
    // console.log(list, 'list')
    //  console.log(data,'datA',)
     console.log('list')
       this.setState({
           courseList: data.course,
       });
   } else {
      debugger
       this.setState({
        courseList: []
       });
   }
  this.setState({isLoading:false})
  }
  catch(err)
  {
    debugger
  }
  }

// http://35.200.220.64:4000/connektschool/getTimeTableByClassId?page=1&size=20&classId=
// get Student List
  getStudentList = async (id) =>{
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getStudentListBySchoolId?pageNo=1&size=50&classId=${id}&studentname=`,{
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
     console.log(data)
     debugger
     console.log(data,'datABBBBBBBBBBB',)

    // console.log(list, 'list')
    //  console.log(data,'datA',)
     console.log('list')
       this.setState({
           studentList: data.SearchData,
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

/// GET Holiday LIST
// getHoliday = async pageNumber => {
//   this.setState({isLoading:true})
// try{
//   let value = '1';
//   if(this.state.status == 'active'){
//     value = '1';
//   } else if(this.state.status == 'inactive'){
//     value = '0';
//     debugger
//   } else {
//   }
// //http://35.200.220.64:1500/aarambhTesting/getHolidayBySchoolId?page=1&size=10&status=1&FromDate=2020-11-13&ToDate=2020-11-16
//                                                 // ${value}
// const response = await fetch( api_Url+`getHolidayBySchoolId?page=${pageNumber}&size=${this.state.per_page}&status=${value}&FromDate=&ToDate=`,{
//     method: "GET",
//     headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json",
//       'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
//     }
//   }
// );
// const data = await response.json();
//  if(data.success){
//    debugger
//    console.log(data)
//    debugger
//    this.setState({
//          holidayList: data.HolidayDetail,
//          total: data.TotalCount[0].Total,
//        current_page:pageNumber,
//      });
//
//
//  } else {
//      this.setState({
//       holidayList: []
//      });
//  }
// this.setState({isLoading:false})
// }
// catch(err)
// {
//   toast.error('Error found',err)
//   console.log('error console')
//   console.log(err)
// }
// };


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
   var timeValid = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/
  if(this.state.classId==''){
        isValid= false
        return this.setState({classId_ErMsg:"Class is required", studentId_ErMsg:"", courseId_ErMsg:"", attendanceDate_ErMsg:"", attendanceTime_ErMsg:""})
    }

    else  if(this.state.courseId==''){
        isValid= false
        return this.setState({classId_ErMsg:"", courseId_ErMsg:"Course is required",studentId_ErMsg:"", attendanceTime_ErMsg:"", attendanceDate_ErMsg:""})
    }
    else  if(this.state.studentId==''){
        isValid= false
        return this.setState({classId_ErMsg:"", studentId_ErMsg:"Student Name is required", courseId_ErMsg:"", attendanceDate_ErMsg:"", attendanceTime_ErMsg:""})
    }
    else  if(this.state.attendanceTime.trim()=='' || !this.state.attendanceTime.match(timeValid)){
        isValid= false
        return this.setState({classId_ErMsg:"", studentId_ErMsg:"", courseId_ErMsg:"", attendanceDate_ErMsg:"", attendanceTime_ErMsg:"attendance time is required or present in invalid format"})
    }
    else  if(this.state.attendanceDate.trim()==''){
        isValid= false
        return this.setState({classId_ErMsg:"", studentId_ErMsg:"", courseId_ErMsg:"", attendanceDate_ErMsg:"Date is required",attendanceTime_ErMsg:""})
    }

    else{
        this.setState({classId_ErMsg:"", studentId_ErMsg:"", courseId_ErMsg:"", attendanceTime_ErMsg:"", attendanceDate_ErMsg:""})
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
        this.getHoliday(this.state.current_page, this.state.per_page)

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

   if(this.state.isAdd){
     var data = {
       "AttendanceDate": this.state.attendanceDate,
       "AttendanceTime": this.state.attendanceTime,
       "ClassId":this.state.classId,
       "CourseId":this.state.courseId,
       "StudentId": this.state.studentId
      }
    this.setState({isLoading:true})
  //   http://35.200.220.64:1500/aarambhTesting/insertHoliday
  //  return;
    fetch(api_Url+`insertStudentAttendance`,{
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
        this.setState({studentId:""},()=>{
        })
        toast.success(result.message,{
        })
      }
      else{
     toast.error(result.message,{

     })
      }
      this.setState({isLoading:false})

    }).catch((e) => toast.error(e))
   }
   else if(this.state.isEdit){

    debugger

   this.setState({isLoading:true})
   var data = {
      "StudentAttendanceId":this.props.match.params.id,
      "AttendanceDate": this.state.attendanceDate,
      "AttendanceTime": this.state.attendanceTime,
      "ClassId":this.state.classId,
      "CourseId":this.state.courseId,
      "StudentId": this.state.studentId,
      "StatusId": 1
   }
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
        this.setState({courseId:"",studentId:"", classId:""},()=>{
          this.props.history.goBack()
        })
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

  showTest = () => {
    console.log('holidayList')
    console.log(this.state.holidayList.length)
    if (this.state.holidayList !== undefined) {
      return this.state.holidayList.map((holiday, i) => {
           return (
          <tr>
            <td>{((this.state.current_page - 1) * this.state.per_page) + (i + 1)}</td>
            <td>{holiday.HolidayName}</td>
            <td> {moment(holiday.FromDate).format('DD-MMM-YYYY')}</td>
            <td> {moment(holiday.ToDate).format('DD-MMM-YYYY')}</td>
            <td>
            <i  onClick={() => this.editHoliday(holiday)} class="ti-pencil"></i>
            {" "}  {" "}
            <i  onClick={() => this.deleteHoliday(holiday)} class="ti-trash"></i>
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
  this.getHoliday(1)
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
            onClick={() => this.getHoliday(number, this.state.per_page, this.state.classId, this.state.courseId, this.state.status)}
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
      <SideBar tabIndex='attendance'  shown='master' />
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



              {/*<ul className="filter-ul">
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
                  </ul>*/}



                  <div style={{overflow: 'visible'}} class="card">
                    <div class="card-body">
                      <div className="">
                        <h4 class="header-title">{this.props.match.params.id==='insert'?"Insert Attendance":`Update Attendance Student : ${this.state.studentName}`}</h4>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft:  13}}>Class Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 79,marginRight: 25}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="classId" value={this.state.classId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Class-</option>
                        {this.state.classList.length > 0 ? this.state.classList.map(cls =>
                          <option key={cls.ClassId} value={cls.ClassId}>{cls.StudentClass}</option>
                        ) : null}
                      </select>{" "}
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.classId_ErMsg}</div>
                      </div>
                      <div style={{flexDirection: 'row',width: 493}}>
                      <span style={{marginLeft: 13}}>Course Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 49,marginRight: 25}}> : </span>
                      <select style={{width: '38%'}} className="input-s br-w-1" name="courseId" value={this.state.courseId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Course-</option>
                        {this.state.courseList.length > 0 ? this.state.courseList.map(course =>
                          { console.log(course)
                            return(<option key={course.CourseId} value={course.CourseId}>{course.CourseName}</option>)}
                        ) : null}
                      </select>{" "}
                      <div style={{marginLeft: 200}} className={this.state.displaytext + " text-danger error123"}>{this.state.courseId_ErMsg}</div></div>
                      </div>


                      <div style={{display: "flex",flexDirection: 'row'}}>
                      {this.props.match.params.id==='insert'?<div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft:  13}}>Student Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 63,marginRight: 25}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="studentId" value={this.state.studentId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Student-</option>
                        {this.state.studentList.length > 0 ? this.state.studentList.map(student =>
                          <option key={student.StudentId} value={student.StudentId}>{student.StudentName}</option>
                        ) : null}

                      </select>{" "}
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.studentId_ErMsg}</div>
                      </div>: <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft:  13}}>Attendance Time<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 46,marginRight: 25}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="HH:MM:SS" value={this.state.attendanceTime} onChange={this.handleInputs} name="attendanceTime" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.attendanceTime_ErMsg}</div>
                      </div>}
                      <div style={{flexDirection: 'row',width: 493}}>
                      <span style={{marginLeft: 13}}>Attendance Date<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 28,marginRight: 25}}> : </span>
                      <DatePicker style={{width: 324}} className="input-s" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" selected={this.state.completionDt} value={this.state.attendanceDate} /*minDate={this.state.startDate? new Date(this.state.startDate) : new Date()} maxDate={this.state.resultDate ? new Date(this.state.resultDate) : ''}*/ onChange={(e) => {this.handleChange(e,'end')}} placeholderText="MM-DD-YYYY" />
                      <div style={{marginLeft: 200}} className={this.state.displaytext + " text-danger error123"}>{this.state.attendanceDate_ErMsg}</div></div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      {this.props.match.params.id==='insert'&&
                       <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft:  13}}>Attendance Time<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 46,marginRight: 25}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="HH:MM:SS" value={this.state.attendanceTime} onChange={this.handleInputs} name="attendanceTime" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.attendanceTime_ErMsg}</div>
                      </div>}
                      </div>

                      <button className="searchbutton123" onClick={this.manageAttendance}>{this.props.match.params.id==='insert'?'Save':'Update'}</button>
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
      							<FormControl type="text" placeholder="Holiday Name" value={this.state.holidayName} onChange={this.handleInputs} name="holidayName" />
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





export default Attendance
