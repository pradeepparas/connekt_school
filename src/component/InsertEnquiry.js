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

class InsertEnquiry extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      firstName_ErMsg: "",
      lastName_ErMsg: "",
      statusId: "",
      statusDetails: [{statusId:"4",statusName:"Inactive Enquiries"},
                      {statusId:"1",statusName:"Active Enquiries"},
                      {statusId:"2",statusName:"Registered"},
                      {statusId:"3",statusName:"Dropout"}],
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
      classId:"",
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
                enquiryDate:moment(date).format("YYYY-MM-DD")
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
        this.getEnquiryById(1)
      }
      this.getClass(1)
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

  getEnquiryById = async(id) => {
    //http://35.200.220.64:4000/connektschool/getEnquiryById?page=1&size=10&status=1&enquiryId=1
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getEnquiryById?page=1&size=10&status=1&enquiryId=${this.props.match.params.id}`,{
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
         id: this.props.match.params.id,
         enquiryName: data.EnquiryData[0].EnquiryName,
         classId: data.EnquiryData[0].ClassId,
         guardianName: data.EnquiryData[0].GuardianName,
         studentId: data.EnquiryData[0].StudentId,
         enquiryDate: moment(data.EnquiryData[0].EnquiryDate).format("YYYY-MM-DD"),
         enquiryMobile: data.EnquiryData[0].EnquiryMobile?data.EnquiryData[0].EnquiryMobile:'',
         guardianMobile: data.EnquiryData[0].GuardianMobile,
         localAddress: data.EnquiryData[0].LocalAddress,
         permanentAddress: data.EnquiryData[0].PermanentAddress,
         enquiryTaken: data.EnquiryData[0].EnquiryTaken,
         remarks: data.EnquiryData[0].Remarks,
         dropoutReason: data.EnquiryData[0].DropOutReason,
         statusId: data.EnquiryData[0].StatusId=="1"?"1":"4",
         firstName: data.EnquiryData[0].FirstName,
         lastName: data.EnquiryData[0].LastName,
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
   var mobileValid =this.state.guardianMobile.toString().match(/^[0]?[6789]\d{9}$/)
   var timeValid = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/
   if(this.state.isAdd&&this.state.firstName.trim()==''){
        isValid= false
        return this.setState({firstName_ErMsg:"First Name is required",lastName_ErMsg:"",guardianName_ErMsg:"",guardianMobile_ErMsg:"",classId_ErMsg:"",enquiryDate_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:"",enquiryTaken_ErMsg:""})
   }
   else if(this.state.lastName.trim()==''){
     isValid = false
      return this.setState({lastName_ErMsg:"last Name is required",firstName_ErMsg:"",guardianName_ErMsg:"",guardianMobile_ErMsg:"",classId_ErMsg:"",enquiryDate_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:"",enquiryTaken_ErMsg:""})
   }
   else if(this.state.isAdd&&this.state.guardianName.trim()==''){
        isValid= false
        return this.setState({enquiryName_ErMsg:"",guardianName_ErMsg:"Guardian name is required",guardianMobile_ErMsg:"",classId_ErMsg:"",enquiryDate_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:"",enquiryTaken_ErMsg:""})
   }

   else if(this.state.guardianMobile.toString().trim()==''||!mobileValid){
        isValid= false
        return this.setState({enquiryName_ErMsg:"",guardianName_ErMsg:"",guardianMobile_ErMsg:"Guardian number is required or invalid number",classId_ErMsg:"",enquiryDate_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:"",enquiryTaken_ErMsg:""})
   }
   else if(this.state.classId==''){
        isValid= false
        return this.setState({enquiryName_ErMsg:"",guardianName_ErMsg:"",guardianMobile_ErMsg:"",classId_ErMsg:"Class Name is required",enquiryDate_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:"",enquiryTaken_ErMsg:""})
    }

    else  if(this.state.enquiryDate==''){
        isValid= false
        return this.setState({enquiryName_ErMsg:"",guardianName_ErMsg:"",guardianMobile_ErMsg:"",classId_ErMsg:"",enquiryDate_ErMsg:"Date is required",localAddress_ErMsg:"",permanentAddress_ErMsg:"",enquiryTaken_ErMsg:""})
    }
    else  if(this.state.localAddress.toString().trim()==''){
        isValid= false
      return this.setState({enquiryName_ErMsg:"",guardianName_ErMsg:"",guardianMobile_ErMsg:"",classId_ErMsg:"",enquiryDate_ErMsg:"",localAddress_ErMsg:"local address is required",permanentAddress_ErMsg:"",enquiryTaken_ErMsg:""})
    }
    else  if(this.state.permanentAddress.toString().trim()==''){
        isValid= false
        return this.setState({enquiryName_ErMsg:"",guardianName_ErMsg:"",guardianMobile_ErMsg:"",classId_ErMsg:"",enquiryDate_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:"Permanent address is required",enquiryTaken_ErMsg:""})
    }
    else  if(this.state.enquiryTaken.toString().trim()==''){
        isValid= false
        return this.setState({enquiryName_ErMsg:"",guardianName_ErMsg:"",guardianMobile_ErMsg:"",classId_ErMsg:"",enquiryDate_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:"",enquiryTaken_ErMsg:"Enquiry taken field is required"})
    }
    else{
        this.setState({firstName_ErMsg:"",lastName_ErMsg:"",guardianName_ErMsg:"",guardianMobile_ErMsg:"",classId_ErMsg:"",enquiryDate_ErMsg:"",localAddress_ErMsg:"",permanentAddress_ErMsg:"",enquiryTaken_ErMsg:""})
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
  manageEnquiry= (e) => {
    debugger
    e.preventDefault();
      if(!this.validateForm()){
        debugger
        return
      }
      var data = {
        "FirstName": this.state.firstName,
        "LastName": this.state.lastName,
        "GuardianMobile": this.state.guardianMobile,
        "LocalAddress": this.state.localAddress,
        "PermanentAddress":this.state.permanentAddress,
        "ClassId":this.state.classId,
        "EnquiryDate": this.state.enquiryDate,
        "EnquiryTaken": this.state.enquiryTaken,
       }
       if(this.state.enquiryMobile){
         data.EnquiryMobile = this.state.enquiryMobile
       }
       if(this.state.remarks){
         data.Remarks = this.state.remarks
       }
       if(this.state.dropoutReason){
         data.DropOutReason = this.state.dropoutReason
       }


   if(this.state.isAdd){
     debugger
     //data.EnquiryName = this.state.enquiryName;
     data.GuardianName = this.state.guardianName;
    this.setState({isLoading:true})
  //   http://35.200.220.64:4000/connektschool/insertEnquiry
  //  return;
    fetch(api_Url+`insertEnquiry`,{
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
    data.EnquiryId = this.props.match.params.id;
    let value = this.state.statusId;
    data.StatusId = this.state.statusId;
    if(value == '4'){
      data.StatusId = '0';
    }
   this.setState({isLoading:true})
   // http://35.200.220.64:1500/aarambhTesting/updateHoliday
    fetch(api_Url+`updateEnquiry`,{
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

  cancelEnquiry = () => {
    if(this.props.match.params.id=='insert'){
      this.setState({
      //classId: "", totalFees: "",sessionId:"",feesStructure:"",sessionId:""
      //id: this.props.match.params.id,
      enquiryName: "",
      classId: "",
      guardianName: "",
      studentId: "",
      enquiryDate: "",
      enquiryMobile: "",
      guardianMobile: "",
      localAddress: "",
      permanentAddress: "",
      enquiryTaken: "",
      remarks: "",
      dropoutReason: "",
      })
      // this.showInputs()
    } else {
      // this.getStructureTypeById(1)
      // this.showInputs()
      // this.getEnquiryById(1)
      this.props.history.goBack();
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
                    <h4 className="page-title pull-left">Enquiry</h4>

                    <ul className="breadcrumbs pull-left">
                      <li><a >Home</a></li>
                      <li><span>Enquiry</span></li>
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
                        <h4 class="header-title">{this.props.match.params.id==='insert'?"Add Enquiry":"Update Enquiry"}</h4>
                      </div>


                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Student First Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 31,marginRight: 25}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="First Name" value={this.state.firstName} onChange={this.handleInputs} name="firstName" />
                      <div style={{marginLeft: 235}} className={this.state.displaytext + " text-danger error123"}>{this.state.firstName_ErMsg}</div>
                      </div>
                      <div style={{flexDirection: 'row',width: 493}}>
                      <span style={{marginLeft: 13}}>Student Last Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 50,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Last Name" value={this.state.lastName} onChange={this.handleInputs} name="lastName" />
                      <div style={{marginLeft: 235}} className={this.state.displaytext + " text-danger error123"}>{this.state.lastName_ErMsg}</div></div>
                      </div>

                      {this.props.match.params.id==='insert'&&
                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Enquiry Mobile Number</span><span style={{marginLeft: 11,marginRight: 25}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="Enquiry Mobile Number" value={this.state.enquiryMobile} onChange={this.handleInputs} name="enquiryMobile" />
                      </div>
                      {/*<div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Enquiry Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 63,marginRight: 25}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="Enquiry Name" value={this.state.enquiryName} onChange={this.handleInputs} name="enquiryName" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.enquiryName_ErMsg}</div>
                      </div>*/}
                      <div style={{flexDirection: 'row',width: 493}}>
                      <span style={{marginLeft: 13}}>Guardian Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 70,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Guardian Name" value={this.state.guardianName} onChange={this.handleInputs} name="guardianName" />
                      <div style={{marginLeft: 235}} className={this.state.displaytext + " text-danger error123"}>{this.state.guardianName_ErMsg}</div>
                      </div></div>}

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
                      <span style={{marginLeft: 13}}>Guardian Mobile Number<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 12,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Guardian Mobile Number" value={this.state.guardianMobile} onChange={this.handleInputs} name="guardianMobile" />
                      <div style={{marginLeft: 235}} className={this.state.displaytext + " text-danger error123"}>{this.state.guardianMobile_ErMsg}</div></div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Enquiry Taken<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 65,marginRight: 25}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="Enquiry Taken" value={this.state.enquiryTaken} onChange={this.handleInputs} name="enquiryTaken" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.enquiryTaken_ErMsg}</div></div>
                      <div style={{flexDirection: 'row',width: 493}}>
                      <span style={{marginLeft: 13}}>Enquiry Date<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 88,marginRight: 25}}> : </span>
                      <DatePicker style={{width: 300}} className="input-s" peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select" selected={this.state.completionDt} value={this.state.enquiryDate} onChange={(e) => {this.handleChange(e,'end')}} placeholderText="MM-DD-YYYY" />
                      <div style={{marginLeft: 235}} className={this.state.displaytext + " text-danger error123"}>{this.state.enquiryDate_ErMsg}</div>
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}><div style={{display: 'flex',flexDirection: 'row'}}>
                      <div style={{marginLeft: 13}}>Local Address<small style={{color: 'red', fontSize: 18}}>*</small></div><div style={{marginLeft: 69,marginRight: 28}}> : </div>
                      <textarea style={{width: '40%',height: 50}} rows="3" type="text" className="input-s br-w-1" placeholder="Local Address" value={this.state.localAddress} onChange={this.handleInputs} name="localAddress" /></div>
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.localAddress_ErMsg}</div></div>
                      <div style={{flexDirection: 'row',width: 493}}><div style={{display: 'flex',flexDirection: 'row'}}>
                      <div style={{marginLeft: 13}}>Permanent Address<small style={{color: 'red', fontSize: 18}}>*</small></div><div style={{marginLeft: 51,marginRight: 28}}> : </div>
                      <textarea style={{width: '38%',height: 50}} type="text" rows="3" className="input-s br-w-1" placeholder="Permanent Address" value={this.state.permanentAddress} onChange={this.handleInputs} name="permanentAddress" /></div>
                      <div style={{marginLeft: 235}} className={this.state.displaytext + " text-danger error123"}>{this.state.permanentAddress_ErMsg}</div></div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      {this.props.match.params.id==='insert'?
                      <div style={{flexDirection: 'row',width: 460}}><div style={{display: 'flex',flexDirection: 'row'}}>
                      <div style={{marginLeft: 13}}>Remarks</div><div style={{marginLeft: 108,marginRight: 28}}> : </div>
                      <textarea style={{width: '40%',height: 50}} type="text" className="input-s br-w-1" placeholder="Remarks" value={this.state.remarks} onChange={this.handleInputs} name="remarks" /></div>
                      </div> : <>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Enquiry Mobile Number</span><span style={{marginLeft: 11,marginRight: 25}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="Enquiry Mobile Number" value={this.state.enquiryMobile} onChange={this.handleInputs} name="enquiryMobile" />
                      </div>
                      <div style={{flexDirection: 'row',width: 493}}>
                      <span style={{marginLeft: 13}}>Status<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 132,marginRight: 25}}> : </span>
                      <select style={{width: '38%'}} className="input-s br-w-1" name="statusId" value={this.state.statusId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Status-</option>
                        {this.state.statusDetails.length > 0 ? this.state.statusDetails.map(cls =>
                          <option key={cls.statusId} value={cls.statusId}>{cls.statusName}</option>
                        ) : null}
                      </select>{" "}
                      </div></>}
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      {this.props.match.params.id!=='insert'&&<><div style={{flexDirection: 'row',width: 460}}><div style={{display: 'flex',flexDirection: 'row'}}>
                      <div style={{marginLeft: 13}}>Remarks</div><div style={{marginLeft: 108,marginRight: 28}}> : </div>
                      <textarea style={{width: '40%',height: 50}} type="text" className="input-s br-w-1" placeholder="Remarks" value={this.state.remarks} onChange={this.handleInputs} name="remarks" /></div>
                      </div></>}
                      {this.state.statusId==='3'&&<div style={{flexDirection: 'row',width: 493}}><div style={{display: 'flex',flexDirection: 'row'}}>
                      <div style={{marginLeft: 13}}>Drop Out Reason</div><div style={{marginLeft: 75,marginRight: 28}}> : </div>
                      <textarea style={{width: '38%',height: 50}} type="text" className="input-s br-w-1" placeholder="Dropout Reason" value={this.state.dropoutReason} onChange={this.handleInputs} name="dropoutReason" />
                      </div></div>}
                      </div>
                      {/*<button className="searchbutton123" onClick={this.manageEnquiry}>{this.props.match.params.id==='insert'?'Save':'Update'}</button>*/}
                      </div>

                    </div>
                    <div style={{display: "flex",flexDirection: 'row',justifyContent: 'flex-end',marginRight: 60}}>
                      <button className="searchbutton123" onClick={this.cancelEnquiry}>Cancel</button>
                      <button style={{marginLeft: 24}} className="searchbutton123" onClick={this.manageEnquiry}>{this.props.match.params.id==='insert'?'Save':'Update'}</button>
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
				<Button type="submit" disabled={this.state.isValiddata} onClick={this.manageEnquiry} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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





export default InsertEnquiry
