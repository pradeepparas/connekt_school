import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import styles from "../css/App.module.css";
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
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

class InsertFeesStructure extends React.Component {
  constructor() {
    super();
    this.state = {
      sessionId: '',
      sessionList: [],
      listArray: [],
      feetypeList: [],
      listLength: '',
      list: [],
      totalFees: "",
      count: false,
      fsize: 0,
      feesStructureList: [{StructureId:"1",StructureName:"Lumpsum"},{StructureId:"2",StructureName:"Installment"},{StructureId:"3",StructureName:"Anytime"},],
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
      feesStructure:"",
      courseDescription:"",
      courseOtherDetails:"",
      courseImage:[],
      courseFile:[],
      classId_ErMsg:"",
      feesStructure_ErMsg:"",
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
                this.getInsertFeesStructure(this.state.current_page)
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
      if(this.props.match.params.id!=='insert'){
        this.getStructureTypeById(1)
        this.getStructureDetailById();
      }
   this.getClass(1);
   //this.getInsertFeesStructure(1)
   this.getFeeType();
   this.getSession()

    }
  }

  getStructureDetailById = async() => {
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getFeesStructureDetailByStructureId?status=1&id=${this.props.match.params.id}&page=1&size=1`,{
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
         // feesStructure: data.FeesStructure[0].FeesStructureType,
         // classId: data.FeesStructure[0].ClassId,
         // totalFees: data.FeesStructure[0].TotalFees,
         // sessionId: data.FeesStructure[0].SessionId,
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

  // Get Structure Type by Id
  getStructureTypeById = async() => {
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getFeesStructureById?status=1&id=${this.props.match.params.id}&page=1&size=1`,{
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
         feesStructure: data.FeesStructure[0].FeesStructureType,
         classId: data.FeesStructure[0].ClassId,
         totalFees: data.FeesStructure[0].TotalFees,
         sessionId: data.FeesStructure[0].SessionId,
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


  /// GET CLASS LIST by sir
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

  // get Fees Type
  getFeeType = async pageNumber => {
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getFeesTypeBySchoolId?page=1&size=50&status=1`,{
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
           feetypeList: data.FeesType,
           listLength: data.TotalCount[0].Total,
       },()=> {
         this.showInputs()
       });

   } else {
       this.setState({
        feetypeList: []
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
      title: 'Add Fees Structure Type',
       feesStructure:"",
      courseDescription:"",
      courseOtherDetails:"",
      courseImage:[],
      classId_ErMsg:"",
      feesStructure_ErMsg:"",
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

editInsertFeesStructure = (data) => {
  console.log(data)
  debugger
  this.setState({
    show: true,
    classId:data.ClassId,
     insertType:"single",
    title: 'Update Fees Structure',
    feesStructure:data.InsertFeesStructureType,
    active:data.StatusId==1?true:false,
    id:data.InsertFeesStructureMasterId,
    totalFees: data.TotalFees?data.TotalFees:"",
    totalFees_ErMsg: "",
    feesStructure_ErMsg:"",
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
this.getInsertFeesStructure(1, this.state.current_page, this.state.classId, this.state.status)
}


// delete section
deleteInsertFeesStructure = (data) => {
  console.log(data)
  debugger
   this.setState({
     id: data.InsertFeesStructureMasterId,
     title: 'Delete Fees Structure',
     btntitle: 'Delete',
     btnValue: "Delete",
     show: false,
     showDeleteModal: true,
     isEdit: false,
     isAdd: false,
     isDelete: true,
     feesStructure: data.InsertFeesStructureType,
     displaytext: 'hide_block',
   })

}

// delete fee by Id
deleteInsertFeesStructureById = async(e) => {
  debugger
  e.preventDefault();
  //http://35.200.220.64:4000/connektschool/deleteInsertFeesStructure?status=0&InsertFeesStructureMasterId=1
  this.setState({isLoading:true})
  fetch(api_Url+`deleteFeeStructureMaster?status=0&InsertFeesStructureMasterId=${this.state.id}`,{
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
      this.getInsertFeesStructure(this.state.current_page, this.state.per_page)

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
getInsertFeesStructure = async pageNumber => {
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
const response = await fetch( api_Url+`getInsertFeesStructureBySchoolId?page=${pageNumber}&size=${this.state.per_page}&status=${value}`,{
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
         feesStructureList: data.InsertFeesStructure,
         total: data.TotalCount[0].Total,
         current_page:pageNumber,
     });

 } else {
     this.setState({
      feesStructureList: []
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
        return this.setState({classId_ErMsg:"Class name is required", feesStructure_ErMsg:"",totalFees_ErMsg:"", sessionId_ErMsg:""})
    }
    else if(this.state.totalFees==''||isNaN(this.state.totalFees)){
        isValid= false
         return this.setState({classId_ErMsg:"", feesStructure_ErMsg:"",totalFees_ErMsg:"total fees is required or invalid number", sessionId_ErMsg:""})
     }
   else if(this.state.feesStructure.trim()==''){
       isValid= false
        return this.setState({classId_ErMsg:"", feesStructure_ErMsg:"Fees Structure type is required", totalFees_ErMsg:"", sessionId_ErMsg:""})
    }
    else if(this.state.sessionId.trim()==''){
        isValid= false
        return this.setState({classId_ErMsg:"", feesStructure_ErMsg:"", totalFees_ErMsg:"", sessionId_ErMsg:"Session is required"})
    }
    // else  if(this.state.courseOtherDetails.trim()==''){
    //     isValid= false
    //     return this.setState({classId_ErMsg:"", feesStructure_ErMsg:"", courseOtherDetails_ErMsg:"Course other description is required", courseDescription_ErMsg:"", courseImage_ErMsg:""})
    // }
    // else  if(this.state.isAdd&&this.state.courseImage.length==0){
    //     isValid= false
    //     return this.setState({classId_ErMsg:"", feesStructure_ErMsg:"", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"", courseImage_ErMsg:"Course image is required"})
    // }
    else{
        this.setState({classId_ErMsg:"", feesStructure_ErMsg:"", totalFees_ErMsg:"", session_ErMsg:""})
        return isValid
    }
}



  // manage Course
  manageInsertFeesStructure = (e) => {

    debugger
    e.preventDefault();
    if(!this.validateForm()){
      debugger
      return
    }


    var empty = false
    for(let i=0;i<this.state.listArray.length;i++){
      if(this.state.listArray[i].feesTypeId == ''){
        empty = true;
        break;
      }
    }
    // this.state.listArray.map((a)=> {
    //   if(a.feesTypeId == ''){
    //     empty = true;
    //     break;
    //   }
    // })
    if(empty){
      toast.error('Fees Type is required');
      return
    }
    console.log(this.state.listArray)
    debugger
    const uniqueValues = new Set(this.state.listArray.map(v => v.feesTypeId));
    if (uniqueValues.size < this.state.listArray.length) {
      toast.error('Fees Type should be unquie')
      return;
    }

    let count = 0;
    this.state.listArray.map((a)=> {
      count = count + parseFloat(a.amount?a.amount:0)
    })
    console.log(count)
    debugger
    if(count!=parseFloat(this.state.totalFees)){
      toast.error('Amount should less or equal to Total Fees')
      return;
    }
    //toast.success('true')
    //return
   if(this.state.isAdd||this.props.match.params.id=='insert'){
     var data = {
       "FeesStructureType": this.state.feesStructure,
       "ClassId": this.state.classId,
       "SessionId": this.state.sessionId
     }
     if(this.state.totalFees){
       data.TotalFees = this.state.totalFees;
     }

    let url= `insertFeeStructureMaster`;
      let header={
        "Accept":"Application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
      }
      console.log(data)
      debugger
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
              // toast.success(result.message,{
              //
              // })
              console.log(result)
              debugger
             this.getInsertFeesStructure(result.id)

             //this.handleClose()
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
              "InsertFeesStructureMasterId":this.state.id,
              "InsertFeesStructureType": this.state.feesStructure,
              "ClassId": this.state.classId,
              "StatusId":this.state.active?"1":"0"
              }
          if(this.state.totalFees){
            data.TotalFees = this.state.totalFees
          }
          this.setState({isLoading:true})

          fetch(api_Url+`updateFeeStructureMaster`,{
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
              this.getInsertFeesStructure(this.state.current_page, this.state.per_page)
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

  getInsertFeesStructure = async(id)=> {

    this.setState({isLoading:true})
    debugger
    console.log(id)
    debugger
          let list = [{
          "FeesTypeMasterId": id,
          "FeesStructureMasterId":'',
          "Amount":'',
          "OtherDescription":''
      }]
      this.state.listArray.map((data, index)=> {
        list.push({"FeesTypeMasterId":id,
          "FeesStructureMasterId":data.feesTypeId,
          "Amount":data.amount,
          "OtherDescription": data.otherDescription
      })
      })
      list.shift()
      console.log(list)
      debugger

      this.setState({isLoading:true})
      fetch(api_Url+`insertFeesStructureDetail`,{
        method:"POST",
        headers :{
          "Accept":"Application/json",
          "Content-Type":"Application/json",
          "Authorization":"Bearer "+sessionStorage.getItem("auth_token"),
        },
        body:JSON.stringify(list)
      })
      .then(res=>res.json())
      .then(result=>{
          debugger
        if(result.success){
          console.log(result)
          debugger
          toast.success(result.message,{
          })
          this.props.history.goBack()

        }
        else{
       toast.error(result.message,{

       })
        }
        this.setState({isLoading:false})

      })
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

  showInsertFeesStructure = () => {
    if (this.state.feesStructureList !== undefined) {
      return this.state.feesStructureList.map((fees, i) => {
        return (
          <tr>
            <td>{((this.state.current_page - 1) * this.state.per_page) + (i + 1)}</td>
            <td>{fees.InsertFeesStructureType}</td>
            <td>{fees.StudentClass}</td>
            <td>{fees.TotalFees? fees.TotalFees:'-'}</td>
            {/*<td>{fee.CourseOtherDetails}</td>*/}
            <td>{fees.StatusId==1?"Active":"In-Active"}</td>


            {/* <td><img className="team-profile-pic" src={api_Url + '/UserProfile/' + course.profile_pic} title={member.firstname + ' ' + "profile pic"} alt={member.firstname + ' ' + "profile pic"} /></td> */}

            <td>
            <i  onClick={() => this.editInsertFeesStructure(fees)} class="ti-pencil"></i>
            {" "}  {" "}<Link to={`feestructure/${fees.InsertFeesStructureMasterId}`}> <i  class="ti-eye"></i></Link>{" "}{" "}
            {<i  onClick={() => this.deleteInsertFeesStructure(fees)} class="ti-trash"></i>}
            </td>



          </tr>
        );
      });
    }
  };

  renderTable = ()=> {
        if (this.state.listArray !== undefined) {
          return this.state.listArray.map((list, i) => {
               return (
              <tr style={{padding: 155}} key={i}>
                <td>{(i+1)}</td>

                <td key={i}>{<select style={{marginLeft: -2,borderColor: 'white',width: 170}} className="tableinput" name="feesTypeId" value={list.feesTypeId} onChange={(e) => {this.feesStructureDetails(e,i,'F')}}>
                  <option value={'0'}>-Select Fees Type-</option>
                  {this.state.feetypeList.length > 0 ? this.state.feetypeList.map(cls =>
                    <option key={cls.FeesTypeMasterId} value={cls.FeesTypeMasterId}>{cls.FeesType}</option>
                  ) : null}
                </select>}</td>
                <td key={i}>{<input style={{marginLeft: -2,width: 170}} className="tableinput" type="number" placeholder="Amount" name="amount" value={list.amount} onChange={(e)=>{this.feesStructureDetails(e,i,'A')}} />}</td>
                <td key={i}>{<input style={{marginLeft: -2, width: 170}} className="tableinput" type="text" placeholder="Other Description" name="otherDescription" value={list.otherDescription} onChange={(e)=>{this.feesStructureDetails(e,i,'O')}} />}</td>
              </tr>
            );
          });
        }
     }

     // Fees Structure Details Handling
     feesStructureDetails = (e,i,type) => {
       console.log(e)
       let items = [...this.state.listArray];
       let a = []
       let item = {...items[i]};
       if(type=='F'){
         debugger
         item.feesTypeId = e.target.value;
       }
       if(type=='A'){
         item.amount = e.target.value;
       }
       if(type=='O'){
         item.otherDescription = e.target.value;
       }
       items[i] = item;
       this.setState({listArray: items});
     }

     // Fees Structure Details listArray length generate
     showInputs = async () => {
       //this.setState({studentmarks:this.state.searchStr? true : false})
       let a = [];
       for(let i=1;i<=parseInt(this.state.listLength); i++){
         a.push({feesTypeId:'',amount:'',otherDescription:''})
       }
       console.log(a)
       debugger
       await this.setState({
         listArray: a
       },() => {
         console.log(this.state.listArray)
         debugger
       })
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
            onClick={() => this.getInsertFeesStructure(number, this.state.per_page, this.state.classId, this.state.status, this.state.searchStr,)}
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

    const handleInputChange = (e, index, type) => {
      const { name, value } = e.target;
      let isValid = true;

      console.log(isNaN(value))
      debugger
      const list = [...this.state.list];
      if (type=='fromrange'){
        if(!isNaN(value)&&parseFloat(value)<=100){
            // if(index>0&&parseFloat(list[index-1]['toRange']) <= parseFloat(value)){
            //   list[index][name] = '';
            //   return;
            // }
          debugger
          list[index][name] = value;
        } else {
          list[index][name] = '';
        }
      } else if(type=='torange'){
        debugger
        console.log(parseFloat(list[index]['fromRange']))
        debugger
        if(!isNaN(value)&&parseFloat(value)<=100){
          debugger
          list[index][name] = value;
        } else {
          list[index][name] = '';
        }
      } else {
        //[A-C][+-]?|D
        if(isNaN(value)){
          var b = value.toUpperCase()
          list[index][name] = b;
        } else {
          list[index][name] = '';
        }
      }
      //setInputList(list);
      this.setState({
        list: list
      })
    };

    const handleAddClick = () => {
    //setInputList([...inputList, { firstName: "", lastName: "" }]);
    let a = this.state.list
    a.push({ FeesStructure: "", Amount: "", OtherDescription: ""})
    this.setState({
      list: a
    })
  };

    return (
      <div>
        {this.state.isLoading && <div class="loader1"></div>}
        <div className="page-container">
      <SideBar tabIndex='feestructure'  shown='master' />
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
                    <h4 className="page-title pull-left">Fees Structure Type</h4>

                    <ul className="breadcrumbs pull-left">
                      <li><a >Home</a></li>
                      <li><span>Fees Structure Type</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-content-inner">
              <div class="row">

                <div class="col-lg-12 mt-5">
                  <div class="card">
                    <div class="card-body">
                      <div className="">
                        <h4 class="header-title">Insert Fees Structure</h4>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Class Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 67,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="classId" value={this.state.classId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Class-</option>
                        {this.state.classList.length > 0 ? this.state.classList.map(cls =>
                          <option key={cls.ClassId} value={cls.ClassId}>{cls.StudentClass}</option>
                        ) : null}
                      </select>{" "}
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.classId_ErMsg}</div>
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Total Fees<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 23,marginRight: 30}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Total Fees" value={this.state.totalFees} onChange={this.handleInputs} name="totalFees" />
                      <div style={{marginLeft: 160 }} className={this.state.displaytext + " text-danger error123"}>{this.state.totalFees_ErMsg}</div>
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Fees Structure Type<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 18,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="feesStructure" value={this.state.feesStructure} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Fees Structure-</option>
                        {this.state.feesStructureList.length > 0 ? this.state.feesStructureList.map(cls =>
                          <option key={cls.StructureId} value={cls.StructureName}>{cls.StructureName}</option>
                        ) : null}
                      </select>{" "}
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.feesStructure_ErMsg}</div></div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Session<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 39,marginRight: 30}}> : </span>
                      <select style={{width: '38%'}} className="input-s br-w-1" name="sessionId" value={this.state.sessionId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Session-</option>
                        {this.state.sessionList.length > 0 ? this.state.sessionList.map(cls =>
                          <option key={cls.SessionId} value={cls.SessionId}>{cls.SessionName}</option>
                        ) : null}
                      </select>{" "}
                      <div style={{marginLeft: 160 }} className={this.state.displaytext + " text-danger error123"}>{this.state.sessionId_ErMsg}</div></div>
                      </div>

                      <div style={{marginTop: 10}} class="table-responsive">
                        <table class="table text-center">
                          <thead class="text-uppercase  bg-light-green">
                            <tr class="text-white">
                              {/* <th scope="col">ID</th> */}
                              <th scope="col">S.No</th>
                              <th scope="col">Fees Type</th>
                              <th scope="col">Amount</th>
                              {/* <th scope="col">Class</th> */}
                              <th scope="col">OtherDescription</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTable()}</tbody>
                        </table>

                      </div>
                      {/*<i class="fa  fa-plus-circle" style={{marginTop: 3,fontSize: 30,marginRight: 2}} onClick={() => {handleAddClick()}}></i>*/}
                      {/*this.state.list.map((x, i) => {
                        return(<div><div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Fees Type<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 80,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="feesStructure" value={x.feesStructure} onChange={e => handleInputChange(e, i, 'feesStructure')}>
                        <option value={'0'}>-Select Fees Type-</option>
                        {this.state.feesStructureList.length > 0 ? this.state.feesStructureList.map(cls =>
                          <option key={cls.StructureId} value={cls.StructureName}>{cls.StructureName}</option>
                        ) : null}
                      </select>{" "}
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.feesStructure_ErMsg}</div></div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Amount<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 54,marginRight: 25}}> : </span>
                      <input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Amount" value={x.amount} onChange={e => handleInputChange(e, i, 'amount')} name="amount" />
                      <div style={{marginLeft: 235}} className={this.state.displaytext + " text-danger error123"}>{this.state.amount_ErMsg}</div>
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Other Description</span><span style={{marginLeft: 36,marginRight: 30}}> : </span>
                      <input style={{width: '40%'}} type="text" className="input-s br-w-1" placeholder="Other Description" value={x.otherDescription} onChange={e => handleInputChange(e, i, 'otherDescription')} name="otherDescription" />
                      </div>
                      </div></div>)})*/}

                      </div>
                    </div>
                    {this.state.listLength&&<div style={{display: "flex",flexDirection: 'row',justifyContent: 'flex-end',marginRight: 60}}>
                      <button className="searchbutton123" onClick={this.manageInsertFeesStructure}>Cancel</button>
                      <button style={{marginLeft: 24}} className="searchbutton123" onClick={this.manageInsertFeesStructure}>{this.props.match.params.id==='insert'?'Save':'Update'}</button>
                    </div>}
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
						<Col sm={6}> Fees Structure Type <small style={{color: 'red', fontSize: 18}}>*</small></Col>
						<Col sm={9}>
							<FormControl type="text" placeholder="Fees Structure Type" value={this.state.feesStructure} onChange={this.handleInputs} name="feesStructure" />
							<small className={this.state.displaytext + " text-danger"}>{this.state.feesStructure_ErMsg}</small>
						</Col>
            <Col sm={4}> Class Name <small style={{color: 'red', fontSize: 18}}>*</small></Col>
                  <Col sm={9}>
                    <FormControl as="select" value={this.state.classId} name="classId" onChange={this.handleInputs} class="form-control">
                      <option value='0'>-Select Class Name-</option> {this.state.classList.length > 0 ? this.state.classList.map(classId =>
                        <option key={classId.ClassId} value={classId.ClassId}>{classId.StudentClass}</option>) : null} </FormControl>
                    <small className={this.state.displaytext + " text-danger"}>{this.state.classId_ErMsg}</small>
            </Col>
            <Col sm={4}> Total Fees</Col>
						<Col sm={9}>
							<FormControl type="text" placeholder="Total Fees" value={this.state.totalFees} onChange={this.handleInputs} name="totalFees" />
							<small className={this.state.displaytext + " text-danger"}>{this.state.totalFees_ErMsg}</small>
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
				<Button type="submit" disabled={this.state.isValiddata} onClick={this.manageInsertFeesStructure} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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
						<Col sm={9}> Are you sure you want to delete <strong>{this.state.feesStructure}</strong> ?
							<p className={this.state.displaytext + " text-danger"}>{this.state.descriptionErrorMessage}</p>
						</Col>
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.handleDeleteClose}>Close</Button>
				<Button type="submit" onClick={this.deleteInsertFeesStructureById} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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





export default InsertFeesStructure
