import React, { useReducer } from "react";
import ReactDOM from "react-dom";
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

class FeeType extends React.Component {
  constructor() {
    super();
    this.state = {
      count: false,
      fsize: 0,
      courseList: [],
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
      courseName:"",
      courseDescription:"",
      courseOtherDetails:"",
      courseImage:[],
      courseFile:[],
      classId_ErMsg:"",
      courseName_ErMsg:"",
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
                this.getCourseList(this.state.current_page)
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
    let token = window.sessionStorage.getItem('auth_token');
    if (token === null) {
      return this.props.history.push('/login');
    } else {

   this.getClass(1);
   this.getCourseList(1)


    }
  }

// ON CHANGE INSERT TYPE
onChangeInsertType =(e)=>{
  this.setState({insertType:e.target.name, title:e.target.name=='single'?'Add Course':"Add Courses"})
  }
  handleShow = () => {

    this.setState({
      show: true,
      chapterFile:[], fileName:"",
      title: 'Add Course',
       courseName:"",
      courseDescription:"",
      courseOtherDetails:"",
      courseImage:[],
      classId_ErMsg:"",
      courseName_ErMsg:"",
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

editCourse = (data) => {
  console.log(data)
  debugger
  this.setState({
    show: true,
    chapterFile:[], fileName:"",
     insertType:"single",
    classId:data.ClassId,
    courseImage:[],
    title: 'Update Course',
    courseName:data.CourseName,
    courseDescription:data.CourseDescription==null?'':data.CourseDescription,
    //courseOtherDetails:data.CourseOtherDetails==null?'':data.CourseOtherDetails,
    active:data.StatusId==1?true:false,
    id:data.CourseId,
    classId_ErMsg:"",
    courseName_ErMsg:"",
    courseDescription_ErMsg:"",
    //courseOtherDetails_ErMsg:"",
    btntitle: 'Update',
    isAdd: false,
    isEdit: true,
    isDelete: false,
    displaytext: 'hide_block',
    imgSrc:`http://35.200.220.64:1500/course/`+data.CourseImage
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
this.getCourseList(1, this.state.current_page, this.state.classId, this.state.status)
}

// GET CLASS LIST by me
 //getCourseList = async pageNumber => {
//   debugger
//   this.setState({isLoading:true})
//
//   fetch(api_Url+`getCoursesFiltering?page=${pageNumber}&size=${this.state.per_page}&name=${this.state.searchStr}`,
//     {
//         method: "GET",
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json",
//           'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
//         }
//       })
//   .then(response => response.json())
//   .then(data => {
//     if(data.success){
//        debugger
//        this.setState({
//              courseList: data.CourseList,
//              total: data.TotalCount[0].Total,
//            current_page:pageNumber,
//          });
//
//      } else {
//          this.setState({
//           courseList: []
//          });
//      }
//     this.setState({isLoading:false})
//   })
//   .catch(error => {
//                   console.log('error', error)
//                   toast.error('uploading failed')
//                   this.setState({isLoading: false})
// });
// }



/// GET CLASS LIST by sir
getCourseList = async pageNumber => {
  debugger
  this.setState({isLoading:true})
try{
const response = await fetch( api_Url+`getCoursesFiltering?page=${pageNumber}&size=${this.state.per_page}&class=${this.state.classId}&name=${this.state.searchStr}&status=${this.state.status}`,{
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
   console.log('total', data.CourseList.length)
   // if(!data.TotalCount){
   //   this.setState({
   //     total: data.CourseList.length
   //   })
   // } else {
   //   this.setState({
   //     total: data.TotalCount[0].Total
   //   })
   // }
   this.setState({
         courseList: data.CourseList,
         total: data.TotalCount[0].Total,
         current_page:pageNumber,
     });

 } else {
     this.setState({
      courseList: []
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
    if(this.state.classId==''){
        isValid= false
        return this.setState({classId_ErMsg:"Class name is required", courseName_ErMsg:"", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"", courseImage_ErMsg:""})
    }
   else if(this.state.courseName.trim()==''){
       isValid= false
        return this.setState({classId_ErMsg:"", courseName_ErMsg:"Course name is required", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"", courseImage_ErMsg:""})
    }
    else if(this.state.courseDescription.trim()==''){
        isValid= false
        return this.setState({classId_ErMsg:"", courseName_ErMsg:"", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"Description is required", courseImage_ErMsg:""})
    }
    // else  if(this.state.courseOtherDetails.trim()==''){
    //     isValid= false
    //     return this.setState({classId_ErMsg:"", courseName_ErMsg:"", courseOtherDetails_ErMsg:"Course other description is required", courseDescription_ErMsg:"", courseImage_ErMsg:""})
    // }
    // else  if(this.state.isAdd&&this.state.courseImage.length==0){
    //     isValid= false
    //     return this.setState({classId_ErMsg:"", courseName_ErMsg:"", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"", courseImage_ErMsg:"Course image is required"})
    // }
    else{
        return isValid
    }
}



  // manage Course
  manageCourse = (e) => {
    debugger
    e.preventDefault();
    if(this.state.insertType=='single'&&!this.validateForm()){
      return
    }
    else if(this.state.insertType=='bulk'&&this.state.classId==''){
   return toast.error('Class name is required')
    }
    else if(this.state.insertType=='bulk'&&this.state.courseFile.length==0){
      return toast.error('Please upload file')
       }

   if(this.state.isAdd){
    let formData = new FormData();
    let url= this.state.insertType=='single'?'insertCourse':`importCourseExcelData2MySQL?classId=${this.state.classId}`;
    if(this.state.insertType=='bulk'){
     formData.append('uploadfile', this.state.courseFile)
     formData.append('classId', this.state.classId)
     var header={
      "Accept":"Application/json",
      // "Content-Type": "application/json",
      'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
    }
    }else{
      formData.append('CourseName', this.state.courseName);
      formData.append('CourseDescription', this.state.courseDescription);
      //formData.append('CourseOtherDetails', this.state.courseOtherDetails);
      formData.append('CourseImage', this.state.courseImage);
      formData.append('ClassId', this.state.classId);
      formData.append('StatusId', this.state.active?1:0);
      header={
        "Accept":"Application/json",
        // "Content-Type": "application/json",
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
      }
    }

    this.setState({isLoading:true})
         fetch(api_Url+url,{
            method:"POST",
           headers:header,
            body:formData
          })
          .then(res=>res.json())
          .then(result=>{
              debugger
            if(result.success){
              toast.success(result.message,{

              })
              this.setState({classId:""},()=>{
                this.getCourseList(this.state.current_page, this.state.per_page, this.state.classId, this.state.status)

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
    let formData = new FormData();
          this.setState({isLoading:true})
          formData.append('CourseName', this.state.courseName);
          formData.append('CourseDescription', this.state.courseDescription);
          //formData.append('CourseOtherDetails', this.state.courseOtherDetails);
          if(this.state.courseImage.name!==undefined){

            formData.append('CourseImage', this.state.courseImage)
          }
          formData.append('ClassId', this.state.classId);
          formData.append('StatusId', this.state.active?1:0);

          fetch(api_Url+`updateCourseByIdWeb?CourseId=${this.state.id}`,{
            method:"POST",
            headers :{
              "Accept":"Application/json",
            //   "Content-Type":"Application/json",
              "Authorization":"Bearer "+sessionStorage.getItem("auth_token"),
            },
            body:formData
          })
          .then(res=>res.json())
          .then(result=>{
              debugger
            if(result.success){
              toast.success(result.message,{

              })
              this.setState({classId:""},()=>{
                this.getCourseList(this.state.current_page, this.state.per_page, this.state.classId, this.state.status)

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

  showTeam = () => {
    if (this.state.courseList !== undefined) {
      return this.state.courseList.map((course, i) => {
        // var desc = member.description;
        // var res = desc;
        // if (desc.length > 20) {
        //   var res1 = desc.substring(0, 20);
        //   res = res1 + '...';
        // }
        return (
          <tr>
            <td>{((this.state.current_page - 1) * this.state.per_page) + (i + 1)}</td>
            <td>{course.StudentClass}</td>
            <td>{course.CourseName?course.CourseName:'-'}</td>
            <td>{course.CourseDescription?course.CourseDescription:'-'}</td>
            {/*<td>{course.CourseOtherDetails}</td>*/}
            <td>{course.StatusId==1?"Active":"In-Active"}</td>


            {/* <td><img className="team-profile-pic" src={api_Url + '/UserProfile/' + course.profile_pic} title={member.firstname + ' ' + "profile pic"} alt={member.firstname + ' ' + "profile pic"} /></td> */}

            <td>
            <i  onClick={() => this.editCourse(course)} class="ti-pencil"></i>
            {" "}  {" "}
            {/* <i  onClick={() => this.deleteCountry(member)} class="ti-trash"></i> */}
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
            onClick={() => this.getCourseList(number, this.state.per_page, this.state.classId, this.state.status, this.state.searchStr,)}
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
      <SideBar tabIndex='section'  shown='master' />
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
                    <h4 className="page-title pull-left">Fee Type</h4>

                    <ul className="breadcrumbs pull-left">
                      <li><a >Home</a></li>
                      <li><span>Fee Type</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-content-inner">
              <div class="row">

                <div class="col-lg-12 mt-5">
                  <ul className="filter-ul">
                    <li>
                      <span>Class Name</span>
                      <select className="input-s br-w-1" name="classId" value={this.state.classId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Class-</option>
                        {this.state.classList.length > 0 ? this.state.classList.map(cls =>
                          <option key={cls.ClassId} value={cls.ClassId}>{cls.StudentClass}</option>
                        ) : null}

                      </select>{" "}
                    </li>


                    <li>
                      <span>Course Name</span><br></br>
                      <input className="input-s br-w-1" type="text" placeholder="Search by name" name="searchStr" value={this.state.searchStr} onChange={this.handleInputs} />
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
                        <h4 class="header-title">Section List</h4>
                        <p className={styles.addCountry}>
                          <button
                            onClick={this.handleShow}
                            className="btn btn-warning btn-xs"
                            data-title="Add"
                            data-toggle="modal"
                            data-target="#add"
                          >
                            {" "}
                      Add Caste {" "}
                            <span className="glyphicon glyphicon-plus"> </span>
                          </button>
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
                                <th scope="col">Course Name</th>
                                <th scope="col">Description</th>
                                {/*<th scope="col">Other Details</th>*/}
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>


                              </tr>
                            </thead>


                            <tbody>{this.showTeam()}</tbody>


                          </table>
                          {this.state.courseList.length == 0 && <p style={{ textAlign: "center" }}> No Record Found</p>}


                        </div>
                        {this.state.courseList.length>0&&
                      <div className={styles.pagination}>
                      <span className={this.state.current_page=='1'?"disabled":""}
                        onClick={()=> {
                          if(this.state.current_page=='1'){return;}
                          this.getCourseList(this.state.current_page-1, this.state.per_page, this.state.searchStr)}}>Previous</span>
                        {this.state.courseList.length > 0 && this.renderPageNumbers()}
                    <span  className={Math.ceil(this.state.total / this.state.per_page)==this.state.current_page?"disabled":""}
                        onClick={()=> {
                          if(Math.ceil(this.state.total / this.state.per_page)==this.state.current_page){return;}
                          this.getCourseList(+this.state.current_page+1, this.state.per_page, this.state.searchStr)}}>Next</span>
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
						{/* <div style={{ textAlign: 'center' }}> {this.state.dynamicImg && <img className="profile-userpic" src={this.state.file} /> } {this.state.staticImg && <img className="profile-userpic" src={banner} alt="for simg" /> }
							<Col style={{ marginLeft: '47px' }} sm={9}>
								<label className="upload-a"><img src={upload_icon} />
									<input className="hide-input" name="photo" accept=" image/jpeg, image/png" onClick={this.imageChange} />Upload new image</label>
							</Col>
							<p className={this.state.displaytext + " text-danger"}>{this.state.imgErrorMessage}</p>
						</div> */}
                  {this.state.isAdd&&<Col sm={9}>
                    <tr>
                      <td>
                        <input type="radio" name="single" value={this.state.insertType} checked={this.state.insertType === "single"} onChange={(e) => this.onChangeInsertType(e, "single")} /> {" "} {" "}Single Insert</td>
                      <td>
                        <input type="radio" name="bulk" value={this.state.insertType} checked={this.state.insertType === "bulk"} onChange={(e) => this.onChangeInsertType(e, "bulk")} /> {" "} {" "}Upload file</td>
                    </tr>
                  </Col>}
            {this.state.insertType=='single'&& <div>
						<Col sm={4}> Class Name <small style={{color: 'red', fontSize: 18}}>*</small></Col>
                  <Col sm={9}>
                    <FormControl as="select" value={this.state.classId} name="classId" onChange={this.handleInputs} class="form-control">
                      <option value='0'>-Select Class Name-</option> {this.state.classList.length > 0 ? this.state.classList.map(classId =>
                        <option key={classId.ClassId} value={classId.ClassId}>{classId.StudentClass}</option>) : null} </FormControl>
                    <small className={this.state.displaytext + " text-danger"}>{this.state.classId_ErMsg}</small>
                  </Col>
						<Col sm={4}> Course Name <small style={{color: 'red', fontSize: 18}}>*</small></Col>
						<Col sm={9}>
							<FormControl type="text" placeholder="Course Name" value={this.state.courseName} onChange={this.handleInputs} name="courseName" />
							<small className={this.state.displaytext + " text-danger"}>{this.state.courseName_ErMsg}</small>
						</Col>
						<Col sm={4}> Description <small style={{color: 'red', fontSize: 18}}>*</small></Col>
						<Col sm={9}>
							<FormControl type="text" placeholder="Course Description" value={this.state.courseDescription} onChange={this.handleInputs} name="courseDescription" />
							<small className={this.state.displaytext + " text-danger"}>{this.state.courseDescription_ErMsg}</small>
						</Col>
						{/*<Col sm={4}> Other Details </Col>
						<Col sm={9}>
							<FormControl type="text" placeholder="Other Details" value={this.state.courseOtherDetails} onChange={this.handleInputs} name="courseOtherDetails" />
							<small className={this.state.displaytext + " text-danger"}>{this.state.courseOtherDetails_ErMsg}</small>
						</Col>*/}
          <Col sm={4}> Course Image </Col>
          <small style={{textAlign: 'right',marginLeft: 145,/*marginTop: -39,*/fontSize: 10.5,color: 'red'}}>
          (allowed formats : .png, .jpeg, .jpg size max. {file1}mb)</small>
						<Col sm={9} style={{flexDirection: 'row',marginTop: -20}}><div><div>
                        <label style={{ color: "black"}} className="ado"><span>CHOOSE IMAGE</span>
	                   <input className="hide-input" type="file" name="image" onChange={(e)=> this.uploadFile(e, '1')} /> </label></div>
                     {/*<div style={{width: '100%',marginLeft: 10}}><Col sm={9} style={{
                     textAlign: 'left',marginLeft: 130,marginTop: -43}}><span style={{width: '100%',}}>
                     (allowed formats : .png, jpeg, .jpg, size max. 1mb)</span></Col></div>*/}
                    </div>
                       {(this.state.imgSrc !== '') && <span><img className="ado-img " src={this.state.imgSrc} />
                       <span className="select-ans"></span> </span>}

    					<small className={this.state.displaytext + " text-danger"}>{this.state.courseImage_ErMsg}</small>
						</Col>
            <Col sm={9}>
              <input type="checkbox"  checked={this.state.active} onChange={this.onChageCheckboxActive} name="active" /> Is Active
						</Col>
            </div>}
            {this.state.isAdd&&this.state.insertType=='bulk'&&<div>
        <Col sm={4}> Class Name <small style={{color: 'red', fontSize: 18}}>*</small></Col>
                  <Col sm={9}>
                    <FormControl as="select" value={this.state.classId} name="classId" onChange={this.handleInputs} class="form-control">
                      <option value='0'>-Select Class Name-</option> {this.state.classList.length > 0 ? this.state.classList.map(classId =>
                        <option key={classId.ClassId} value={classId.ClassId}>{classId.StudentClass}</option>) : null} </FormControl>
                    <small className={this.state.displaytext + " text-danger"}>{this.state.classId_ErMsg}</small>
                  </Col><br></br>
        <Col>
        <div style={{marginTop: -8,marginBottom: 9,width: '68.1%'}}>
        <a className="btn btn-primary form-control" rel="noopener noreferrer" style={{fontSize: 13}}
        target="_blank" href="http://35.200.220.64:1500/sample/CourseTemplate.xlsx">
        Download Template
          <span className="glyphicon glyphicon-plus"> </span>
        </a>
        </div>
        <Col style={{textAlign:"center",marginLeft: -15}} sm={9}>
         <label className="btn btn-primary form-control"> <input className="hide-input" type="file"  onChange={(e)=>this.uploadFile(e,'2')}  />Browse file</label>
          <a style={{marginTop:"10px"}} className="for_class">{this.state.fileName}</a>
        </Col>
        <div style={{marginTop: -3}}><label>(allowed formats : .xls, .xlsx, file size max. {file1}mb) <small style={{color: 'red', fontSize: 18}}>*</small></label></div>
        </Col>

        </div>}
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.handleClose}>Close</Button>
				<Button type="submit" disabled={this.state.isValiddata} onClick={this.manageCourse} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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
						<Col sm={9}> Are you sure you want to delete <strong>{this.state.firstName}</strong> ?
							<p className={this.state.displaytext + " text-danger"}>{this.state.descriptionErrorMessage}</p>
						</Col>
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.handleDeleteClose}>Close</Button>
				<Button type="submit" onClick={this.addCountry} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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





export default FeeType
