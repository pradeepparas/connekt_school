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

class InsertNewStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      readOnly: false,
      firstName: "",
      lastName: "",
      firstName_ErMsg: "",
      lastName_ErMsg: "",
      studentMobile_ErMsg: "",
      studentMobile: "",
      bloodGroup: [{groupId:"1",groupName:"A+"},
                    {groupId:"2",groupName:"A-"},
                    {groupId:"3",groupName:"B+"},
                    {groupId:"4",groupName:"B-"},
                    {groupId:"5",groupName:"O+"},
                    {groupId:"6",groupName:"O-"},
                    {groupId:"7",groupName:"AB+"},
                    {groupId:"8",groupName:"AB-"}],
      interestsList: [],
      fatherName: "",
      fatherMobile: "",
      motherName: "",
      motherMobile: "",
      bloodgroupId: "",
      admission:"1",
      admissionType: [{AdmissionId:"1",AdmissionName:"Direct Admission"},{AdmissionId:"2",AdmissionName:"By Enquiry"}],
      nationList: [{NationId:"1",NationName:"INDIAN"},{NationId:"2",NationName:"Other"}],
      categoryList: [{CategoryId:"1",CategoryName:"General"},{CategoryId:"2",CategoryName:"OBC"},{CategoryId:"3",CategoryName:"SC"},{CategoryId:"4",CategoryName:"ST"},],
      studentName:"",
      studentName_ErMsg:"",
      studentUsername:"",
      studentUsername_ErMsg:"",
      password:"",
      password_ErMsg:"",
      enrollment:"",
      gender:"",
      gender_ErMsg:"",
      birthDate:"",
      birthDate_ErMsg:"",
      classId:"",
      classId_ErMsg:"",
      sectionId:"",
      enquiryId:"",
      medium:"",
      previousSchool:"",
      anyDisability:"",
      childInterests:"",
      nationality:"",
      religionId:"",
      casteId:"",
      category:"",
      religionList: [],
      casteList: [],
      sectionList: [],
      mediumList: [],
      enquiryId: "",
      enquiryList: [],
      toDate: moment(new Date()).format("YYYY-MM-DD"),
      fromDate:moment(new Date()).format("YYYY-MM-DD"),
      enquiryName:"",
      guardianName:"",
      enquiryMobile:"",
      guardianMobile:"",
      localAddress:"",
      permanentAddress:"",
      enquiryDate:"",
      enquiryTaken:"",
      remarks:"",
      dropoutReason:"",
      change: false,
      count: false,
      classList:[],
      id: '',
      show: false,
      showDeleteModal: false,
      isEdit: false,
      isAdd: true,
      isDelete: false,
      displaytext: 'hide_block',
      total: '',
      per_page: pageSize[1].size,
      current_page: 1,
      isLoading:false,
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

  // ON CHANGE INSERT TYPE
  onChangeInsertType =(e)=>{
    debugger
    this.setState({insertType:e.target.name,})
    }


  handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        if(this.state.enquiryId){
        this.getEnquiry(this.state.enquiryId)
      } else {
        toast.error('Enquiry Id is required')
      }
    }
    }

// handle input changes
  handleInputs = (e) => {
    debugger
    if(e.target.value!=='0'){

    if(!this.state.readOnly||!(e.target.name=='classId'||e.target.name=='fatherName'
    ||e.target.name=='fatherMobile'||e.target.name=='permanentAddress'||
    e.target.name=='localAddress'||e.target.name=='firstName'
    ||e.target.name=='lastName')){

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
    }
      if(this.state.readOnly){
        this.setState({readOnly: (e.target.name=='admission'&&e.target.value=='1')? false: true}, () => {
          if(!this.state.readOnly){
            this.setState({classId: '',
            fatherName: '',
            fatherMobile: '',
            localAddress: '',
            permanentAddress:  '',
            lastName: "",
            firstName: "",
            readOnly: false,})
          }
        })
      }
      if(e.target.name=='classId'){
        // reset course id on class change
        this.setState({courseId:"",  chapterList: []})
        //this.getCoursebyId(e.target.value)
        //this.getStudentList(e.target.value)
      }
      if(e.target.name=='enquiryId'){
        console.log(e)
        debugger
        // this.getEnquiry(e.target.value)
      }
      }
  }

  getEnquiry = async id => {
    this.setState({isLoading:true})
  try{
    debugger
  //http://35.200.220.64:4000/connektschool/getEnquiryBySchoolClassCourseAndStudentId?page=1&size=10&status=1&FromDate=2020.10.01&ToDate=2020.10.31&classId=1&courseId=3&studentId=751 &classId=1
  const response = await fetch( api_Url+`getEnquiryById?page=1&size=10&status=1&enquiryId=${id}`,{
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
          classId: data.EnquiryData[0].ClassId? data.EnquiryData[0].ClassId: '',
          fatherName: data.EnquiryData[0].GuardianName? data.EnquiryData[0].GuardianName: '',
          fatherMobile: data.EnquiryData[0].GuardianMobile? data.EnquiryData[0].GuardianMobile: '',
          localAddress: data.EnquiryData[0].LocalAddress? data.EnquiryData[0].LocalAddress: '',
          permanentAddress: data.EnquiryData[0].PermanentAddress? data.EnquiryData[0].PermanentAddress: '',
          firstName: data.EnquiryData[0].FirstName? data.EnquiryData[0].FirstName: '',
          lastName: data.EnquiryData[0].LastName? data.EnquiryData[0].LastName: '',
          readOnly: true,
         // enquiryList: data.EnquiryData,
       });
       toast.success(`Details are found for EnquiryId = ${id}`)

   } else {
       this.setState({
         classId: '',
         fatherName: '',
         fatherMobile: '',
         localAddress: '',
         permanentAddress:  '',
         lastName: "",
         firstName: "",
         readOnly: false,
       });
       if(id){
         toast.error(`No details are found for EnquiryId = ${id}`)
       }

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
         else if(type=='birth'){
            this.setState({
                birthDt:date,
                birthDate:moment(date).format("YYYY-MM-DD")
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

      if(this.props.match.params.id!=='insert'){
        this.getStudentById(1)
      }
      this.getClass(1)
      this.getReligion()
      this.getCaste();
      this.getSection();
      this.getMedium();
      this.getChildInterests()
      //this.getStudentList(1)
      //this.getHoliday(1)
    }
  }

  /// GET CLASS LIST
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

// get religion details for drop down
  getReligion = async() => {
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getReligionBySchoolId?page=1&size=50&status=1`,{
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
           religionList: data.ReligionData,
       });

   } else {
       this.setState({
        religionList: []
       });
   }
  this.setState({isLoading:false})
  }
  catch(err)
  {
  this.setState({isLoading: false})
  toast.error('uploading failed')
  }
  }

// get Caste for drop down
  getCaste = async() => {
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getCasteBySchoolId?page=1&size=50&status=1`,{
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
           casteList: data.CasteData,
       });

   } else {
       this.setState({
        casteList: []
       });
   }
  this.setState({isLoading:false})
  }
  catch(err)
  {
  this.setState({isLoading: false})
  toast.error('uploading failed')
  }
  }

// get Section for drop down
  getSection = async() => {
    debugger
    this.setState({isLoading:true})
  try{

  const response = await fetch( api_Url+`getSectionBySchoolId?page=1&size=50&status=1`,{
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
           sectionList: data.SectionData,
       });

   } else {
       this.setState({
        sectionList: []
       });
   }
  this.setState({isLoading:false})
  }
  catch(err)
  {
  this.setState({isLoading: false})
  toast.error('uploading failed')
  }
  }

// get School Medium
  getMedium = async() => {
    debugger
    this.setState({isLoading:true})
  try{

  const response = await fetch( api_Url+`getSchoolMediumBySchoolId?page=1&size=50&status=1`,{
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
           mediumList: data.SchoolMedium,
       });

   } else {
       this.setState({
       mediumList: []
       });
   }
  this.setState({isLoading:false})
  }
  catch(err)
  {
  this.setState({isLoading: false})
  toast.error('uploading failed')
  }
  }

// Get child interests
  getChildInterests = async() => {
    debugger
    this.setState({isLoading:true})
  try{

  const response = await fetch( api_Url+`getChildInterestsBySchoolId?page=1&size=50&status=1`,{
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
           interestsList: data.ChildInterests,
       });

   } else {
       this.setState({
        interestsList: []
       });
   }
  this.setState({isLoading:false})
  }
  catch(err)
  {
  this.setState({isLoading: false})
  toast.error('uploading failed')
  }
  }

// get Enquiry Details by Id
  getStudentById = async(id) => {
    //http://35.200.220.64:4000/connektschool/getStudentById?page=1&size=10&status=1&enquiryId=1
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getStudentMainById?studentId=${this.props.match.params.id}`,{
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
           status: data.Student[0].StatusId? 'active': 'inactive',
           id: this.props.match.params.id,
           studentName: data.Student[0].StudentName,
           gender: data.Student[0].StudentGender,
           birthDate: moment(data.Student[0].StudentDOB).format("YYYY-MM-DD"),
           classId: data.Student[0].ClassId,
           enrollment: data.Student[0].EnrollmentNumber,
           medium: data.Student[0].Medium,
           previousSchool: data.Student[0].PreviousSchool,
           enquiryId: data.Student[0].EnquiryId,
           anyDisability: data.Student[0].AnyDisability,
           childInterests: data.Student[0].ChildInterests,
           sectionId: data.Student[0].Section,
           nationality: data.Student[0].Nationality,
           religionId: data.Student[0].Religion,
           casteId: data.Student[0].Caste,
           category: data.Student[0].Category,
           bloodgroupId: data.Student[0].BloodGroup,
           studentMobile: data.Student[0].StudentMobile?data.Student[0].StudentMobile:'',
           enrollment: data.Student[0].EnrollmentNumber?data.Student[0].EnrollmentNumber:'',
           localAddress:data.Student[0].LocalAddress,
           permanentAddress: data.Student[0].PermanentAddress,
           motherName: data.Student[0].MotherName?data.Student[0].MotherName:'',
           motherMobile: data.Student[0].MotherMobile?data.Student[0].MotherMobile:'',
           fatherName: data.Student[0].FatherName?data.Student[0].FatherName:'',
           isEdit:true,
           isAdd:false
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
   if(this.state.studentMobile)
   {
     var mobileValid =this.state.studentMobile.toString().match(/^[0]?[6789]\d{9}$/)
   }
   var timeValid = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
   if(this.state.isAdd&&this.state.admission==''){
     isValid= false
     return this.setState({bloodgroupId_ErMsg:"",admission_ErMsg:"admission type is required", studentMobile_ErMsg:"", studentName_ErMsg:"", studentUsername_ErMsg:"", password_ErMsg:"", gender_ErMsg:"", birthDate_ErMsg:"",classId_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:""})
   }
   else if(this.state.studentName.trim()==''){
        debugger
        isValid= false
        return this.setState({bloodgroupId_ErMsg:"",admission_ErMsg:"", studentMobile_ErMsg:"", studentName_ErMsg:"Student Name is required", studentUsername_ErMsg:"", password_ErMsg:"", gender_ErMsg:"", birthDate_ErMsg:"",classId_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:""})
    }

    // else  if(this.state.isAdd&&this.state.password.toString().trim()==''){
    //   debugger
    //     isValid= false
    //     return this.setState({studentName_ErMsg:"", studentUsername_ErMsg:"", password_ErMsg:"password is required", gender_ErMsg:"", birthDate_ErMsg:"",classId_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:""})
    // }
    else  if(this.state.gender==''){
      debugger
        isValid= false
        return this.setState({bloodgroupId_ErMsg:"",admission_ErMsg:"", studentMobile_ErMsg:"",studentName_ErMsg:"", studentUsername_ErMsg:"", password_ErMsg:"", gender_ErMsg:"gender is required", birthDate_ErMsg:"",classId_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:""})
    }
    else  if(this.state.birthDate.trim()==''){
      debugger
        isValid= false
        return this.setState({bloodgroupId_ErMsg:"",studentMobile_ErMsg:"",studentName_ErMsg:"", studentUsername_ErMsg:"", password_ErMsg:"", gender_ErMsg:"", birthDate_ErMsg:"Date of birth is required",classId_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:""})
    }
    else  if(this.state.classId==''){
      debugger
        isValid= false
        return this.setState({bloodgroupId_ErMsg:"",studentMobile_ErMsg:"", studentName_ErMsg:"", studentUsername_ErMsg:"", password_ErMsg:"", gender_ErMsg:"", birthDate_ErMsg:"",classId_ErMsg:"class is required",localAddress_ErMsg:"",permanentAddress_ErMsg:""})
    }
    else if(this.state.isEdit&&(this.state.studentMobile.toString().trim()==''||!mobileValid)){
      isValid= false
    return this.setState({bloodgroupId_ErMsg:"",studentMobile_ErMsg:"student mobile is empty or invalid", studentName_ErMsg:"", studentUsername_ErMsg:"", password_ErMsg:"", gender_ErMsg:"", birthDate_ErMsg:"",classId_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:""})
    }
    else  if(this.state.localAddress.toString().trim()==''){
        isValid= false
      return this.setState({bloodgroupId_ErMsg:"",studentMobile_ErMsg:"",studentName_ErMsg:"", studentUsername_ErMsg:"", password_ErMsg:"", gender_ErMsg:"", birthDate_ErMsg:"",classId_ErMsg:"",localAddress_ErMsg:"local address is required",permanentAddress_ErMsg:""})
    }
    else  if(this.state.permanentAddress.toString().trim()==''){
        isValid= false
        return this.setState({bloodgroupId_ErMsg:"",studentMobile_ErMsg:"",studentName_ErMsg:"", studentUsername_ErMsg:"", password_ErMsg:"", gender_ErMsg:"", birthDate_ErMsg:"",classId_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:"permanent address is required"})
    }
    else  if(this.state.isAdd&&this.state.studentUsername.trim()==''){
      debugger
        isValid= false
        return this.setState({bloodgroupId_ErMsg:"",studentMobile_ErMsg:"", studentName_ErMsg:"", studentUsername_ErMsg:"Student Username is required", password_ErMsg:"", gender_ErMsg:"", birthDate_ErMsg:"",classId_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:""})
    }
    else if(this.state.bloodgroupId==''){
      isValid= false
      return this.setState({bloodgroupId_ErMsg:"blodd group is required", studentMobile_ErMsg:"", studentName_ErMsg:"", studentUsername_ErMsg:"", password_ErMsg:"", gender_ErMsg:"", birthDate_ErMsg:"",classId_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:""})
    }
    else{
        this.setState({bloodgroupId_ErMsg:"", admission_ErMsg:"",studentMobile_ErMsg:"",studentName_ErMsg:"", studentUsername_ErMsg:"", password_ErMsg:"", gender_ErMsg:"", birthDate_ErMsg:"",classId_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:""})
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
  manageStudent= (e) => {
    debugger
    e.preventDefault();
      if(!this.validateForm()){
        return
      }
      // toast.success("all are true")
      // return

      var data = {
        "EnquiryId": this.state.admission==='1'?"0":this.state.enquiryId,
        "StudentName": this.state.studentName,
        "StudentGender": this.state.gender,
        //"StudentUsername":this.state.studentUsername,
        "StudentDOB": this.state.birthDate,
        //"StudentPassword": "123456",
        "ClassId":this.state.classId,
        "StudentMobile": this.state.studentMobile,
       //"EnrollmentNumber": this.state.enrollment,
       //"Medium": this.state.medium,
       //"PreviousSchool": this.state.previousSchool,
       //"EnquiryId": this.state.enquiryId,
        //"AnyDisability": this.state.anyDisability,
        //"ChildInterests": this.state.childInterests,
        //"Section":this.state.sectionId,
        //"Nationality": this.state.nationality,
        //"Religion": this.state.religionId,
        //"Caste": this.state.casteId,
        //"Category": this.state.category,
        //"FatherName": this.state.fatherName,
        //"FatherMobile": this.state.fatherMobile,
        //"MotherName": this.state.motherName,
        //"MotherMobile": this.state.motherMobile,
        "LocalAddress": this.state.localAddress,
        "PermanentAddress": this.state.permanentAddress,
        "BloodGroup": this.state.bloodgroupId
       }
       if(this.state.enrollment){
         data.EnrollmentNumber = this.state.enrollment
       }
       if(this.state.medium){
         data.Medium = this.state.medium
       }
       if(this.state.previousSchool){
         data.PreviousSchool = this.state.previousSchool
       }
       // if(this.state.enquiryId){
       //   data.EnquiryId = this.state.enquiryId
       // }
       if(this.state.anyDisability){
         data.AnyDisability = this.state.anyDisability
       }
       if(this.state.childInterests){
         data.ChildInterests = this.state.childInterests
       }
       if(this.state.sectionId){
         data.Section = this.state.sectionId
       }
       if(this.state.nationality){
         data.Nationality = this.state.nationality
       }
       if(this.state.religionId){
         data.Religion = this.state.religionId
       }
       if(this.state.casteId){
         data.Caste = this.state.casteId
       }
       if(this.state.category){
         data.Category = this.state.category
       }
       if(this.state.fatherName){
         data.FatherName = this.state.fatherName
       }
       if(this.state.fatherMobile){
         data.FatherMobile = this.state.fatherMobile
       }
       if(this.state.motherName){
         data.MotherName = this.state.motherName
       }
       if(this.state.motherMobile){
         data.MotherMobile = this.state.motherMobile
       }
       // if(this.state.bloodgroupId){
       //   data.BloodGroup = this.state.bloodgroupId
       // }

       //str = str.split(" ").join("")


   if(this.state.isAdd){
      data.StudentUsername = this.state.enrollment;
      data.StudentPassword = "123456";
    this.setState({isLoading:true})
  //   http://35.200.220.64:4000/connektschool/insertEnquiry
  //  return;
    console.log(data)
    debugger
    fetch(api_Url+`insertStudentWeb`,{
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

        toast.success(result.message,{
        })
        this.props.history.goBack()
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

    data.StudentMobile = this.state.studentMobile;
    data.StudentId = this.props.match.params.id;
    data.StatusId = this.state.status==='active'?"1":"0";
   this.setState({isLoading:true})
   // http://35.200.220.64:1500/aarambhTesting/updateHoliday
    fetch(api_Url+`updateStudentMainWeb`,{
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
          this.props.history.goBack();
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
  //this.getEnquiry()
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

  cancelStudent = () => {
    if(this.props.match.params.id=='insert'){
      this.setState({
        readOnly: false,
        studentUsername: "",
        motherName: "",
        motherMobile: "",
        admission: "1",
        studentName: "",
        fatherName: "",
        fatherMobile: "",
        gender: "",
        birthDate: "",
        classId: "",
        enrollment: "",
        medium: "",
        previousSchool: "",
        enquiryId: "",
        anyDisability: "",
        childInterests: "",
        sectionId: "",
        nationality: "",
        religionId: "",
        casteId: "",
        category: "",
        bloodgroupId: "",
        studentMobile: "",
        enrollment: "",
        localAddress:"",
        permanentAddress: "",
      })
      // this.showInputs()
    } else {
      // this.getStructureTypeById(1)
      // this.showInputs()
      //this.getStudentById(1)
      this.props.history.goBack()
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
                    <h4 className="page-title pull-left">Admission Form</h4>

                    <ul className="breadcrumbs pull-left">
                      <li><a >Home</a></li>
                      <li><span>Admission Form</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-content-inner">
              <div class="row">

                <div class="col-lg-12 mt-5">


              {/*<ul className="filter-ul">
              {<li style={{width: 186}}>
                <span>Enquiry From Date</span>
                <DatePicker style={{ width: "322px" }} className="input-s br-w-1" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" selected={new Date()} value={this.state.fromDate}  onChange={(e) => this.handleChange(e,'from')} placeholderText="MM-DD-YYYY" />
              </li>}
              {<li style={{width: 186}}>
                <span>Enquiry To Date</span>
                <DatePicker style={{ width: "322px" }} className="input-s br-w-1" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" selected={new Date()} value={this.state.toDate}  onChange={(e) => this.handleChange(e,'to')} placeholderText="MM-DD-YYYY" />
              </li>}
                    <li>
                      <button className="search-button" onClick={this.onSearchHoliday}>Get Enquiry Name</button>
                    </li>
                  </ul>*/}



                  <div class="card">
                    <div class="card-body">
                      <div className="">
                        <h4 class="header-title">{this.props.match.params.id==='insert'?"New Admission":"Update Admission Details"}</h4>
                      </div>
                      {this.props.match.params.id ==='insert'&&<div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Admission Type<small style={{color: 'red', fontSize: 18}}>*</small> </span><span style={{marginLeft: 49,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="admission" value={this.state.admission} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Admission Type-</option>
                        {this.state.admissionType.length > 0 ? this.state.admissionType.map(cls =>
                          <option key={cls.AdmissionId} value={cls.AdmissionId}>{cls.AdmissionName}</option>
                        ) : null}

                      </select>{" "}
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.admission_ErMsg}</div></div>

                      {this.state.admission=="2"&&<><div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Enquiry Id</span><span style={{marginLeft: 91,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Enquiry Id and press Enter" value={this.state.enquiryId} onChange={this.handleInputs} onKeyPress={this.handleKeyPress} name="enquiryId" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.password_ErMsg}</div></div></>}</div>}

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Student First Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 26,marginRight: 30}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="First Name" value={this.state.firstName} onChange={this.handleInputs} name="firstName" />
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Student Last Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 29,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Last Name" value={this.state.lastName} onChange={this.handleInputs} name="lastName" />
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      {/*<div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Student Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 57,marginRight: 30}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="Student Name" value={this.state.studentName} onChange={this.handleInputs} name="studentName" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.studentName_ErMsg}</div>
                      </div>*/}
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Enrollment Number<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 22,marginRight: 30}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="Enrollment Number" value={this.state.enrollment} onChange={this.handleInputs} name="enrollment" />
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Student Mobile Number<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 0,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Student's contact number" value={this.state.studentMobile} onChange={this.handleInputs} name="studentMobile" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.studentMobile_ErMsg}</div>
                      </div>
                      </div>

                      {/*this.props.match.params.id=='insert'&&<><div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Student Username<small style={{color: 'red', fontSize: 18}}>*</small> </span><span style={{marginLeft: 30,marginRight: 30}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="Student Username" value={this.state.studentUsername} onChange={this.handleInputs} name="studentUsername" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.studentUsername_ErMsg}</div></div>

                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Password<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 86,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="password" className="input-s br-w-1" placeholder="Password" value={this.state.password} onChange={this.handleInputs} name="password" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.password_ErMsg}</div></div></div></>*/}

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Gender<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 100,marginRight: 35}}> : </span>
                      <span style={{marginLeft:"16px"}}>
                      <label   style={{paddingRight:"32px"}} type="radio"class="radio-inline">
                   <input className="gen-input" type="radio"  value="Male" onChange={this.handleInputs} name="gender" checked={this.state.gender=='Male'}/>Male
                 </label>
                 <label style={{paddingRight:"32px"}} class="radio-inline">
                   <input type="radio" value="Female" onChange={this.handleInputs} className="gen-input" name="gender"checked={this.state.gender=='Female'} />Female
                 </label>
                      </span>
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.gender_ErMsg}</div>
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Date of Birth<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 67,marginRight: 25}}> : </span>
                      <DatePicker style={{ width: "322px" }} className="input-s" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" selected={this.state.birthDt} value={this.state.birthDate} maxDate={new Date()} onChange={(e) => this.handleChange(e,'birth')} placeholderText="MM-DD-YYYY" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.birthDate_ErMsg}</div>
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Class Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 76,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="classId" value={this.state.classId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Class-</option>
                        {this.state.classList.length > 0 ? this.state.classList.map(cls =>
                          <option key={cls.ClassId} value={cls.ClassId}>{cls.StudentClass}</option>
                        ) : null}

                      </select>{" "}
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.classId_ErMsg}</div></div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Section<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 100,marginRight: 25}}> : </span>
                      <select style={{width: '38%'}} className="input-s br-w-1" name="sectionId" value={this.state.sectionId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Section-</option>
                        {this.state.sectionList.length > 0 ? this.state.sectionList.map(cls =>
                          <option key={cls.SectionMasterId} value={cls.SectionName}>{cls.SectionName}</option>
                        ) : null}

                      </select>{" "}
                      </div>
                      </div>

                      {this.props.match.params.id !=='insert'&&<><div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Status<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 109,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="status" value={this.state.status} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Status-</option>
                        <option value={'active'}>Active</option>
                        <option value={'inactive'}>In-Active</option>
                      </select>{" "}
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.status_ErMsg}</div>
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Student Mobile Number<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 0,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Student's contact number" value={this.state.studentMobile} onChange={this.handleInputs} name="studentMobile" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.studentMobile_ErMsg}</div>
                      </div>
                      </div></>}


                      {/*<div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Enquiry Id</span><span style={{marginLeft: 92,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="enquiryId" value={this.state.enquiryId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Enquiry Name-</option>
                        {this.state.enquiryList.length > 0 ? this.state.enquiryList.map(cls =>
                          <option key={cls.EnquiryId} value={cls.EnquiryId}>{cls.EnquiryName}</option>
                        ) : null}

                      </select>{" "}
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Medium</span><span style={{marginLeft: 103,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Medium" value={this.state.medium} onChange={this.handleInputs} name="medium" />
                      </div>
                      </div>*/}
                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Father's Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 57,marginRight: 30}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="Father's Name" value={this.state.fatherName} onChange={this.handleInputs} name="fatherName" />
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Father's Mobile Number<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 0,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Father's contact number" value={this.state.fatherMobile} onChange={this.handleInputs} name="fatherMobile" />
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Mother's Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 51,marginRight: 30}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="Mother's Name" value={this.state.motherName} onChange={this.handleInputs} name="motherName" />
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Mother's Mobile Number</span><span style={{marginLeft: 0,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Mother's Contact Number" value={this.state.motherMobile} onChange={this.handleInputs} name="motherMobile" />
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}><div style={{display: 'flex',flexDirection: 'row'}}>
                      <div style={{marginLeft: 13}}>Local Address<small style={{color: 'red', fontSize: 18}}>*</small></div><div style={{marginLeft: 66,marginRight: 30}}> : </div>
                      <textarea style={{width: '40%',height: 50}} rows="3" type="text" className="input-s br-w-1" placeholder="Local Address" value={this.state.localAddress} onChange={this.handleInputs} name="localAddress" /></div>
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.localAddress_ErMsg}</div></div>
                      <div style={{flexDirection: 'row',width: 493}}><div style={{display: 'flex',flexDirection: 'row'}}>
                      <div style={{marginLeft: 13}}>Permanent Address<small style={{color: 'red', fontSize: 18}}>*</small></div><div style={{marginLeft: 28,marginRight: 30}}> : </div>
                      <textarea style={{width: '38%',height: 50}} type="text" rows="3" className="input-s br-w-1" placeholder="Permanent Address" value={this.state.permanentAddress} onChange={this.handleInputs} name="permanentAddress" /></div>
                      <div style={{marginLeft: 235}} className={this.state.displaytext + " text-danger error123"}>{this.state.permanentAddress_ErMsg}</div></div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>PreviousSchool</span><span style={{marginLeft: 59,marginRight: 30}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="Previous School" value={this.state.previousSchool} onChange={this.handleInputs} name="previousSchool" />
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Any Disability</span><span style={{marginLeft: 69,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="any disability" value={this.state.anyDisability} onChange={this.handleInputs} name="anyDisability" />
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Child Interests<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 56,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="childInterests" value={this.state.childInterests} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Child Interest-</option>
                        {this.state.interestsList.length > 0 ? this.state.interestsList.map(cls =>
                          <option key={cls.ChildInterestsId} value={cls.ChildInterests}>{cls.ChildInterests}</option>
                        ) : null}

                      </select>{" "}
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Nationality<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 80,marginRight: 25}}> : </span>
                      <select style={{width: '38%'}} className="input-s br-w-1" name="nationality" value={this.state.nationality} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Nationality-</option>
                        {this.state.nationList.length > 0 ? this.state.nationList.map(cls =>
                          <option key={cls.NationId} value={cls.NationId}>{cls.NationName}</option>
                        ) : null}

                      </select>{" "}
                      </div>
                      </div>
                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Religion<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 97,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="religionId" value={this.state.religionId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Religion-</option>
                        {this.state.religionList.length > 0 ? this.state.religionList.map(cls =>
                          <option key={cls.ReligionMasterId} value={cls.ReligionName}>{cls.ReligionName}</option>
                        ) : null}

                      </select>{" "}
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Caste<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 111,marginRight: 25}}> : </span>
                      <select style={{width: '38%'}} className="input-s br-w-1" name="casteId" value={this.state.casteId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Caste-</option>
                        {this.state.casteList.length > 0 ? this.state.casteList.map(cls =>
                          <option key={cls.CasteMasterId} value={cls.CasteName}>{cls.CasteName}</option>
                        ) : null}

                      </select>{" "}
                      </div>
                      </div>
                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Category<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 89,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="category" value={this.state.category} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Category-</option>
                        {this.state.categoryList.length > 0 ? this.state.categoryList.map(cls =>
                          <option key={cls.CategoryId} value={cls.CategoryId}>{cls.CategoryName}</option>
                        ) : null}

                      </select>{" "}
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Medium<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 95,marginRight: 25}}> : </span>
                      <select style={{width: '38%'}} className="input-s br-w-1" name="medium" value={this.state.medium} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Medium-</option>
                        {this.state.mediumList.length > 0 ? this.state.mediumList.map(cls =>
                          <option key={cls.SchoolMediumId} value={cls.SchoolMediumId}>{cls.SchoolMedium}</option>
                        ) : null}

                      </select>{" "}
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Blood Group<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 69,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="bloodgroupId" value={this.state.bloodgroupId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Blood Group-</option>
                        {this.state.bloodGroup.length > 0 ? this.state.bloodGroup.map(cls =>
                          <option key={cls.groupId} value={cls.groupName}>{cls.groupName}</option>
                        ) : null}

                      </select>{" "}
                      <div style={{marginLeft: 235}} className={this.state.displaytext + " text-danger error123"}>{this.state.bloodgroupId_ErMsg}</div>
                      </div>

                      </div>

                      {/*<button className="searchbutton123" onClick={this.manageStudent}>{this.props.match.params.id==='insert'?'Save':'Update'}</button>*/}
                      </div>
                    </div>
                    <div style={{display: "flex",flexDirection: 'row',justifyContent: 'flex-end',marginRight: 60}}>
                      <button className="searchbutton123" onClick={this.cancelStudent}>Cancel</button>
                      <button style={{marginLeft: 24}} className="searchbutton123" onClick={this.manageStudent}>{this.props.match.params.id==='insert'?'Save':'Update'}</button>
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
				<Button type="submit" disabled={this.state.isValiddata} onClick={this.manageStudent} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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





export default InsertNewStudent
