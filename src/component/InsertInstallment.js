import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import styles from "../css/App.module.css";
import { Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { Modal } from "react-bootstrap";
import { Form, FormGroup, FormControl, Col } from "react-bootstrap";
import SideBar from './SideBar';
import DatePicker from 'react-datepicker';
import moment from 'moment';
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

class InsertInstallment extends React.Component {
  constructor() {
    super();
    this.state = {
      alreadySaved: true,
      statusId: "",
      statusDetails: [{statusId:"2",statusName:"Inactive"},
                      {statusId:"1",statusName:"Active"}],
      name: '',
      value: 0.0,
      feeType: [],
      masterId: '',
      remark: '',
      installmentName: '',
      installmentName_ErMsg: '',
      totalAmount_ErMsg: '',
      sessionId: '',
      sessionList: [],
      listArray: [],
      feetypeList: [],
      listLength: '',
      list: [],
      totalAmount: "",
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
            [e.target.name]: e.target.value, [e.target.name+`_ErMsg`]:"", count: (e.target.name == 'per_page')? true : false,
            listLength: (e.target.name == 'installmentName')? e.target.value : ''
          },
            () => {
              if(this.state.count){
                this.getClass(this.state.current_page);
                this.getInsertInstallment(this.state.current_page)
              }
            });
            if(e.target.name == 'installmentName'){
              this.showInputs(e.target.value)
            }
            if(e.target.name == 'classId'){
              this.getTotalAmount(e.target.value)
            }
      }

  }

  getTotalAmount = async(id) => {
    // http://35.200.220.64:4000/connektschool/getTotalAmountByClassId?classId=1&status=1&page=1&size=5
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getTotalAmountByClassId?classId=${id}&status=1&page=1&size=10`,{
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
    this.setState({totalAmount: data.FeesStructure[0].TotalFees,
                  fixedAmount: data.FeesStructure[0].TotalFees},() => {
                    this.getFeesStructureMasterId()
                    this.getDetails()
                  })

   } else {
      debugger
      toast.error('please enter fee structure for selected class')
       this.setState({
        installmentName: '',
        remark: '',
        listArray: [],
        totalAmount: '',
        fixedAmount: '',
        name:'',
        value: 0.0
      },()=> {

      });
   }
  this.setState({isLoading:false})
  }
  catch(err)
  {
    debugger
  }
  }

  getDetails = async() => {
    //http://35.200.220.64:4000/connektschool/getInstallmentDetailBySchoolAndClassId?page=1&size=10&classId=1&status=1
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getInstallmentDetailBySchoolAndClassId?page=1&size=10&classId=${this.state.classId}&status=1`,{
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
    let list = [{
      "installmentDetail":"",
      "amount": "",
      "fromDate": "",
      "toDate": "",
      //"InstallmentMasterId": id,
      "penalty": "",
      "remark": ""
    }]
    data.InstallmentDetail.map((item,index) => {
      list.push({
        "installmentDetail": item.InstallmentDetail,
        "amount":item.Amount,
       "fromDate": moment(item.FromDate).format("YYYY-MM-DD"),
       "toDate": moment(item.ToDate).format("YYYY-MM-DD"),
       "penalty": item.Penalty? item.Penalty: '',
       "remark": item.Remarks? item.Remarks: '',
      })
    })
    list.shift()

    this.setState({
      listArray: list,
      alreadySaved: false,
      installmentName: data.InstallmentDetail[0].NumberOfInstallments,
                  })

   } else {
      debugger
      //toast.error('please enter fee structure for selected class')
       this.setState({
         listArray: [],
         alreadySaved: true,
         installmentName: "",
       });
   }
  this.setState({isLoading:false})
  }
  catch(err)
  {
    debugger
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
      if(this.props.match.params.id1!=='insert'){
        this.getInstallmentMasterById(1)
        this.getInstallmentDetailById();
      }
   this.getClass(1);
   //this.getInsertInstallment(1)
   this.getFeeType();
   this.getSession()

    }
  }

  getInstallmentDetailById = async() => {
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getInstallmentDetailByInstallmentMasterId?status=1&page=1&size=50&InstallmentMasterId=${this.props.match.params.id1}`,{
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
     console.log(data,'installment')
     debugger
     console.log(data,'datABBBBBBBBBBB',)
    // console.log(list, 'list')
    //  console.log(data,'datA',)
    let list = [{
      //"installmentDetailId": "",
      "installmentDetail": "",
      "amount": "",
      "fromDate": "",
      "toDate": "",
      "penalty": "",
      "remark": "",
      "installmentMasterId": "",
      "statusId": "1"
    }]
    // list.shift()

     // console.log('list')
     // let list = [{
     //     "feesTypeId": item.FeesTypeMasterId,
     //     "FeesStructureMasterId":this.props.params.match.id,
     //     "amount":item.Amount,
     //     "otherDescription":item.OtherDescription
     // }]

      data.InstallmentDetail.map((item,index) => {
        list.push({
          "installmentDetail": item.InstallmentDetail,
          //"installmentDetailId": item.InstallmentDetailId,
         "installmentMasterId": item.InstallmentMasterId,
         "amount":item.Amount,
         "fromDate": moment(item.FromDate).format("YYYY-MM-DD"),
         "toDate": moment(item.ToDate).format("YYYY-MM-DD"),
         "penalty": item.Penalty? item.Penalty: '',
         "remark": item.Remarks? item.Remarks: '',
         "statusId": "1"
        })
      })

       list.shift()
       while(this.state.listLength>list.length){
         list.push({
           "installmentDetail": "",
           //"installmentDetailId": item.InstallmentDetailId,
          "installmentMasterId": this.props.match.params.id1,
          "amount":"",
          "fromDate": "",
          "toDate": "",
          "penalty": "",
          "remark": "",
          "statusId": "1"
         })
       }
     // console.log(list)
     debugger
       this.setState({

         // id: this.props.match.params.id1,
          listArray: list,
         // feesStructure: data.FeesStructure[0].FeesStructureType,
         // classId: data.FeesStructure[0].ClassId,
         // totalAmount: data.FeesStructure[0].TotalFees,
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
  getInstallmentMasterById = async() => {
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getInstallmentMasterByMasterId?status=${this.props.match.params.id2}&InstallmentMasterId=${this.props.match.params.id1}&page=1&size=1`,{
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
          id: this.props.match.params.id1,
          studentClass: data.InstallmentMaster[0].StudentClass,
         // feesStructure: data.FeesStructure[0].FeesStructureType,
         classId: data.InstallmentMaster[0].ClassId,
         // totalAmount: data.FeesStructure[0].TotalFees,
         // sessionId: data.FeesStructure[0].SessionId,
         //statusId: data.FeesType[0].StatusId=='1'?'1':'2',
         statusId: data.InstallmentMaster[0].StatusId=='1'?'1':'2',
         remark: data.InstallmentMaster[0].Remark,
         totalAmount: data.InstallmentMaster[0].TotalAmount,
         installmentName: data.InstallmentMaster[0].NumberOfInstallments,
         //installmentName: data.InstallmentMaster[0].InstallmentName,
         isEdit:true,
         isAdd:false
       },()=> {
         this.getFeesStructureMasterId()
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



  getFeesStructureMasterId = async() => {

  //  http://35.200.220.64:4000/connektschool/getFeesStructureByClassIdAndFeeStructureType?page=1&size=10&classId=5&status=1&feesStructureType=Installment
  this.setState({isLoading:true})
try{
const response = await fetch( api_Url+`getFeesStructureBySchoolIdAndClassId?page=1&size=1&status=1&ClassId=${this.state.classId}`,{
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
         masterId: data.FeesStructure[0].FeesStructureMasterId,
     }, () => {
       this.getFeesTypeById()
     });

 } else {
     this.setState({
      masterId: []
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

// fees Type
  getFeesTypeById = async() => {
    debugger
    // http://35.200.220.64:4000/connektschool/getFeesStructureDetailByStructureId?status=1&id=13&page=1&size=1
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getFeesStructureDetailByStructureId?status=1&id=${this.state.masterId}&page=1&size=50`,{
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
     let count = 0
     let name = ''
     data.FeesStructureDetail.map((item,index) => {
       if(item.ModeofPayment=='Single'){
         name = name + item.FeesType+',';
         count = +count+(+item.Amount)
         console.log(count)
         debugger
       }
     })
     console.log(count,name)
     name = name.substring(0, name.length - 1)
     debugger
     this.setState({
           name: name,
           value: count,
       });

   } else {
       this.setState({
         value: 0,
         name: ""
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
         //this.showInputs()
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

editInsertInstallment = (data) => {
  console.log(data)
  debugger
  this.setState({
    show: true,
    classId:data.ClassId,
     insertType:"single",
    title: 'Update Fees Structure',
    feesStructure:data.InsertInstallmentType,
    active:data.StatusId==1?true:false,
    id:data.InsertInstallmentMasterId,
    totalAmount: data.TotalFees?data.TotalFees:"",
    totalAmount_ErMsg: "",
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
this.getInsertInstallment(1, this.state.current_page, this.state.classId, this.state.status)
}


// delete section
deleteInsertInstallment = (data) => {
  console.log(data)
  debugger
   this.setState({
     id: data.InsertInstallmentMasterId,
     title: 'Delete Fees Structure',
     btntitle: 'Delete',
     btnValue: "Delete",
     show: false,
     showDeleteModal: true,
     isEdit: false,
     isAdd: false,
     isDelete: true,
     feesStructure: data.InsertInstallmentType,
     displaytext: 'hide_block',
   })

}

// delete fee by Id
deleteInsertInstallmentById = async(e) => {
  debugger
  e.preventDefault();
  //http://35.200.220.64:4000/connektschool/deleteInsertInstallment?status=0&InsertInstallmentMasterId=1
  this.setState({isLoading:true})
  fetch(api_Url+`deleteFeeStructureMaster?status=0&InsertInstallmentMasterId=${this.state.id}`,{
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
      this.getInsertInstallment(this.state.current_page, this.state.per_page)

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
getInsertInstallment = async pageNumber => {
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
const response = await fetch( api_Url+`getInsertInstallmentBySchoolId?page=${pageNumber}&size=${this.state.per_page}&status=${value}`,{
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
         feesStructureList: data.InsertInstallment,
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
        return this.setState({classId_ErMsg:"Class name is required", feesStructure_ErMsg:"",totalAmount_ErMsg:"", sessionId_ErMsg:""})
    } else if(this.state.installmentName==''){
      isValid= false
      return this.setState({installmentName_ErMsg:'please enter no. of Installments', classId_ErMsg:"", feesStructure_ErMsg:"",totalAmount_ErMsg:"", sessionId_ErMsg:""})
    } else if(this.state.sessionId==''){
      isValid = false
      return this.setState({installmentName_ErMsg:'', classId_ErMsg:"", feesStructure_ErMsg:"",totalAmount_ErMsg:"", sessionId_ErMsg:"Session is required"})
    }
    // else if(this.state.totalAmount==''||isNaN(this.state.totalAmount)){
    //     isValid= false
    //      return this.setState({installmentName_ErMsg:'',classId_ErMsg:"", feesStructure_ErMsg:"",totalAmount_ErMsg:"total fees is required or invalid number", sessionId_ErMsg:""})
    //  }
   // else if(this.state.feesStructure.trim()==''){
   //     isValid= false
   //      return this.setState({classId_ErMsg:"", feesStructure_ErMsg:"Fees Structure type is required", totalAmount_ErMsg:"", sessionId_ErMsg:""})
   //  }
    // else if(this.state.sessionId==''){
    //     isValid= false
    //     return this.setState({classId_ErMsg:"", feesStructure_ErMsg:"", totalAmount_ErMsg:"", sessionId_ErMsg:"Session is required"})
    // }
    else{
        this.setState({classId_ErMsg:"", installmentName_ErMsg:"", totalAmount_ErMsg:"", sessionId_ErMsg:""})
        return isValid
    }
}



  // manage Course
  manageInsertInstallment = (e) => {
    if(this.state.totalAmount==''){
      toast.error('fee structure is not present for selected class');
    }
    console.log(this.state.totalAmount)
    debugger
    debugger
    e.preventDefault();
    if(!this.validateForm()){
      debugger
      return
    }
    debugger
    var value = false
    for(let i=0;i<this.state.listArray.length-1;i++){
      if(this.state.listArray[i].toDate==''||this.state.listArray[i].fromDate==''){
        value = true;
        break;
      }
    }
    if(value){
      toast.error('please fill dates')
      return
    }

    var empty = false
    for(let i=0;i<this.state.listArray.length-1;i++){
      if(this.state.listArray[i].toDate>=this.state.listArray[i+1].fromDate){
        empty = true;
        break;
      }
    }
    if(empty){
      toast.error('please check installment dates')
      return
    }

   if(this.state.isAdd||this.props.match.params.id1=='insert'){
    // {
    //     "InstallmentName":"Test",
    //     "ClassId":1,(DD)
    //     "TotalAmount":10000
    // }
    // Note:- "Remark can be null at the insertion.

     var data = {
       "NumberOfInstallments": this.state.installmentName,
       //"InstallmentName": this.state.installmentName,
       "ClassId": this.state.classId,
       "TotalAmount": this.state.totalAmount,
       "Remark": this.state.remark,
       "SessionId": this.state.sessionId,
     }
     // if(this.state.totalAmount){
     //   data.TotalFees = this.state.totalAmount;
     // }

    let url= `insertInstallmentMaster`;
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
              console.log(result)
              debugger
             this.insertInstallment(result.id)

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
              "SessionId": this.state.sessionId,
              "InstallmentMasterId":this.props.match.params.id1,
              "NumberOfInstallments": this.state.installmentName,
              //"InstallmentName": this.state.installmentName,
              // "StatusId":"1",
              "StatusId":this.state.statusId=='1'?"1":"0",
              "TotalAmount": this.state.totalAmount,
              "Remark": this.state.remark
            }

          this.setState({isLoading:true})

          fetch(api_Url+`updateInstallmentMaster`,{
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
              // toast.success(result.message,{
              //
              // })
              this.insertInstallment()
             //  this.getInsertInstallment(this.state.current_page, this.state.per_page)
             // this.handleClose()
            }
            else{
           toast.error(result.message,{

           })
            }
            this.setState({isLoading:false})

          })
   }
  }

  insertInstallment = async(id)=> {

    if(this.state.isAdd ||this.props.match.params.id1=='insert'){
      this.setState({isLoading:true})
    debugger
    console.log(id)
    debugger
          //     [{
          // "InstallmentDetail":"Ins 3",
          // "Amount": 10000,
          // "FromDate": "2020-09-09",
          // "ToDate": "2020-10-09",
          // "InstallmentMasterId":1
          // },
          // {
          // "InstallmentDetail":"Ins 4",
          // "Amount": 10000,
          // "FromDate": "2020-11-09",
          // "ToDate": "2020-12-09",
          // "InstallmentMasterId":1
          // }]
          // Note:- Penalty and remarks can be null at the time of insertion.


          let list = [{
            "InstallmentDetail":"",
            "Amount": "",
            "FromDate": "",
            "ToDate": "",
            "InstallmentMasterId": id,
            "Penalty": "",
            "Remark": "",
            "SessionId": ""
          }]
      this.state.listArray.map((data, index)=> {
        list.push({
          "InstallmentDetail":`Installment ${index+1}`,
          "Amount": index==0?parseFloat((this.state.value)+(((this.state.totalAmount)-(this.state.value))/this.state.installmentName)).toFixed(2):parseFloat((((this.state.totalAmount)-(+this.state.value))/this.state.installmentName)).toFixed(2),
          "FromDate": data.fromDate,
          "ToDate": data.toDate,
          "InstallmentMasterId": id,
          "SessionId": this.state.sessionId
          //
          //
      })
        if(data.penalty){
          list.push({
            "Penalty": data.penalty
          })
        }
        if(data.remark){
          list.push({
            "Remark": data.remark
          })
        }
      })
      list.shift()
      console.log(list, 'installment')
      debugger
      this.setState({isLoading:true})
      fetch(api_Url+`insertInstallmentDetail`,{
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
    else if(this.state.isEdit){

      this.setState({isLoading:true})
    debugger
    console.log(id)
    debugger
          let list = [{
            //"InstallmentDetailId": "",
            "InstallmentDetail": "",
            "Amount": "",
            "FromDate": "",
            "ToDate": "",
            "Penalty": "",
            "Remark": "",
            "InstallmentMasterId": "",
            "StatusId": "1",
            "SessionId": ""
          }]
      this.state.listArray.map((data, index)=> {
        list.push({
          //"InstallmentDetailId": data.installmentDetailId,
          "InstallmentDetail": `Installment ${index+1}`,
          "Amount": index==0?parseFloat((this.state.value)+(((this.state.totalAmount)-(this.state.value))/this.state.installmentName)).toFixed(2):parseFloat((((this.state.totalAmount)-(+this.state.value))/this.state.installmentName)).toFixed(2),
          "FromDate": data.fromDate,
          "ToDate": data.toDate,
          "InstallmentMasterId": this.props.match.params.id1,
          "StatusId": "1",
          "SessionId": this.state.sessionId
        })
        if(data.remark){
          list.push({"Remarks": data.remark})
        }
        if(data.penalty){
          list.push({"Penalty": data.penalty})
        }
      })
      list.shift()
      console.log(list)
      debugger

      this.setState({isLoading:true})
      fetch(api_Url+`updateInstallmentDetail`,{
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

  showInsertInstallment = () => {
    if (this.state.feesStructureList !== undefined) {
      return this.state.feesStructureList.map((fees, i) => {
        return (
          <tr>
            <td>{((this.state.current_page - 1) * this.state.per_page) + (i + 1)}</td>
            <td>{fees.InsertInstallmentType}</td>
            <td>{fees.StudentClass}</td>
            <td>{fees.TotalFees? fees.TotalFees:'-'}</td>
            {/*<td>{fee.CourseOtherDetails}</td>*/}
            <td>{fees.StatusId==1?"Active":"In-Active"}</td>


            {/* <td><img className="team-profile-pic" src={api_Url + '/UserProfile/' + course.profile_pic} title={member.firstname + ' ' + "profile pic"} alt={member.firstname + ' ' + "profile pic"} /></td> */}

            <td>
            <i  onClick={() => this.editInsertInstallment(fees)} class="ti-pencil"></i>
            {" "}  {" "}<Link to={`feestructure/${fees.InsertInstallmentMasterId}`}> <i  class="ti-eye"></i></Link>{" "}{" "}
            {<i  onClick={() => this.deleteInsertInstallment(fees)} class="ti-trash"></i>}
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
                {/*<td key={i}>{<input style={{marginLeft: -2, width: 130}} className="tableinput" type="text" placeholder="Installment No." name="installmentDetail" value={list.installmentDetail} onChange={(e)=>{this.feesStructureDetails(e,i,'I')}} />}</td>*/}
                <td>Installment {(i+1)} {i==0&&`(${this.state.name})`}</td>
                <td key={i}><div style={{marginLeft: 0}}><DatePicker style={{ width: "322px",marginLeft: 0}} className="tableinput"
                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                selected={this.state.assignDt} value={list.fromDate} minDate={new Date()}
                maxDate={list.toDate ? new Date(list.toDate) : ''}
                onChange={(e)=>{this.feesStructureDetails(e,i,'F')}} placeholderText="MM-DD-YYYY" /></div></td>

                <td key={i}><DatePicker style={{ width: "322px",marginLeft: 0 }} className="tableinput"
                peekNextMonth showMonthDropdown showYearDropdown dropdownMode="select"
                selected={this.state.assignDt} value={list.toDate} minDate={list.fromDate ? new Date(list.fromDate) : new Date()}
                onChange={(e)=>{this.feesStructureDetails(e,i,'T')}} placeholderText="MM-DD-YYYY" /></td>
                <td>{i==0?parseFloat((this.state.value)+(((this.state.totalAmount)-(this.state.value))/this.state.installmentName)).toFixed(2):parseFloat((((this.state.totalAmount)-(+this.state.value))/this.state.installmentName)).toFixed(2)}</td>
                {/*<td key={i}>{<input style={{marginLeft: -2,width: 130}} className="tableinput" type="number" placeholder="Amount" name="amount" value={list.amount} onChange={(e)=>{this.feesStructureDetails(e,i,'A')}} />}</td>*/}
                <td key={i}>{<input style={{marginLeft: -2,width: 130}} className="tableinput" type="number" placeholder="Penalty" name="penalty" value={list.penalty} onChange={(e)=>{this.feesStructureDetails(e,i,'P')}} />}</td>
                <td key={i}>{<input style={{marginLeft: -2, width: 130}} className="tableinput" type="text" placeholder="Remarks" name="remark" value={list.remark} onChange={(e)=>{this.feesStructureDetails(e,i,'R')}} />}</td>
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
       if(type=='I'){
         debugger
         item.installmentDetail = e.target.value;
       }
       if(type=='A'){
         item.amount = e.target.value;
       }
       if(type=='F'){
         item.fromDate = moment(e).format("YYYY-MM-DD")
       }
       if(type=='T'){
         item.toDate = moment(e).format("YYYY-MM-DD")
       }
       if(type=='P'){
         item.penalty = e.target.value;
       }
       if(type=='R'){
         item.remark = e.target.value;
       }
       items[i] = item;
       this.setState({listArray: items});
     }

     // Fees Structure Details listArray length generate
     showInputs = async (value) => {
       //this.setState({studentmarks:this.state.searchStr? true : false})
       let a = [];
       for(let i=1;i<=parseInt(value); i++){
         a.push({installmentDetail:'',fromDate:'',toDate: '', amount:'',penalty:'', remark: ''})
       }
       console.log(a)
       debugger
       await this.setState({
         listArray: a
       },() => {
         if(this.props.match.params.id1!='insert'){
           this.getInstallmentDetailById()
         }
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
            onClick={() => this.getInsertInstallment(number, this.state.per_page, this.state.classId, this.state.status, this.state.searchStr,)}
          >
            {number}
          </span>
        );
      }
    });
  };

  cancelInstallment = () => {
    if(this.props.match.params.id1=='insert'){
      this.setState({classId: "", totalAmount: "",installmentName: "", listArray: []})

    } else {
      // this.getInstallmentMasterById(1)
      // this.getInstallmentDetailById();
      this.props.history.goBack()
    }
  }

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
      <SideBar tabIndex='installment'  shown='fees_management' />
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
                    <h4 className="page-title pull-left">Installment</h4>

                    <ul className="breadcrumbs pull-left">
                      <li><a >Home</a></li>
                      <li><span>Installment</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-content-inner">
              <div class="row">

                <div  class="col-lg-12 mt-5">
                  <div style={{overflow: 'visible'}} class="card">
                    <div class="card-body">
                      <div className="">
                        <h4 class="header-title">{this.props.match.params.id1==='insert'?"Insert Installment":"Update Installment"}</h4>
                      </div>
                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Class Name<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 77,marginRight: 30}}> : </span>
                      {this.props.match.params.id1==='insert'?<><select style={{width: '40%'}} className="input-s br-w-1" name="classId" value={this.state.classId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Class-</option>
                        {this.state.classList.length > 0 ? this.state.classList.map(cls =>
                          <option key={cls.ClassId} value={cls.ClassId}>{cls.StudentClass}</option>
                        ) : null}
                      </select>{" "}
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.classId_ErMsg}</div></>: <span style={{display: 'inline-flex',marginBottom: 7}}>{this.state.studentClass}</span>}
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Total Fees<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 55,marginRight: 30}}> : </span>
                      {/*<input style={{width: '38%'}} type="text" className="input-s br-w-1" placeholder="Total Fees" value={this.state.totalAmount} onChange={this.handleInputs} name="totalAmount" />
                      <div style={{marginLeft: 160 }} className={this.state.displaytext + " text-danger error123"}>{this.state.totalAmount_ErMsg}</div>*/}
                      {this.state.totalAmount?this.state.totalAmount:'-'}
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Number of Installments<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 4,marginRight: 30}}> : </span>
                      <input style={{width: '40%'}} type="number" className="input-s br-w-1" placeholder="Enter Numbers" value={this.state.installmentName} onChange={this.handleInputs} name="installmentName" />
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.installmentName_ErMsg}</div>
                      </div>
                      {this.props.match.params.id1!='insert'? <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Status<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 78,marginRight: 25}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="statusId" value={this.state.statusId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Status-</option>
                        {this.state.statusDetails.length > 0 ? this.state.statusDetails.map(cls =>
                          <option key={cls.statusId} value={cls.statusId}>{cls.statusName}</option>
                        ) : null}
                      </select>{" "}
                      </div>: <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Session<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 71,marginRight: 30}}> : </span>
                      <select style={{width: '38%'}} className="input-s br-w-1" name="sessionId" value={this.state.sessionId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Session-</option>
                        {this.state.sessionList.length > 0 ? this.state.sessionList.map(cls =>
                          <option key={cls.SessionId} value={cls.SessionId}>{cls.SessionName}</option>
                        ) : null}
                      </select>{" "}
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.sessionId_ErMsg}</div>
                      </div>}
                      </div>

                      {this.props.match.params.id1!='insert'&&<div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Session<small style={{color: 'red', fontSize: 18}}>*</small></span><span style={{marginLeft: 103,marginRight: 30}}> : </span>
                      <select style={{width: '40%'}} className="input-s br-w-1" name="sessionId" value={this.state.sessionId} onChange={this.handleInputs}>
                        <option value={'0'}>-Select Session-</option>
                        {this.state.sessionList.length > 0 ? this.state.sessionList.map(cls =>
                          <option key={cls.SessionId} value={cls.SessionId}>{cls.SessionName}</option>
                        ) : null}
                      </select>{" "}
                      <div className={this.state.displaytext + " text-danger error123"}>{this.state.sessionId_ErMsg}</div>
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <div style={{display: 'flex',flexDirection: 'row'}}>
                      <div style={{marginLeft: 13}}>Remarks</div><div style={{marginLeft: 73,marginRight: 30}}> : </div>
                      <textarea style={{width: '37%',height: 50}} type="text" className="input-s br-w-1" placeholder="Remarks" value={this.state.remark} onChange={this.handleInputs} name="remark" /></div>
                      </div>
                      </div>}

                      {this.props.match.params.id1=='insert'&&<div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <div style={{display: 'flex',flexDirection: 'row'}}>
                      <div style={{marginLeft: 13}}>Remarks</div><div style={{marginLeft: 106,marginRight: 30}}> : </div>
                      <textarea style={{width: '40%',height: 50}} type="text" className="input-s br-w-1" placeholder="Remarks" value={this.state.remark} onChange={this.handleInputs} name="remark" />
                      </div>
                      </div></div>}

                      <div style={{marginTop: 10}} class="table-responsive">
                        <table class="table text-center">
                          <thead class="text-uppercase  bg-light-green">
                            <tr class="text-white">
                              {/* <th scope="col">ID</th> */}
                              <th scope="col">S.No</th>
                              <th scope="col">Installment No.</th>

                              {/* <th scope="col">Class</th> */}
                              <th scope="col">From Date</th>
                              <th scope="col">To Date</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Penalty</th>
                              <th scope="col">Remark</th>
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
                    {this.state.installmentName&&this.state.alreadySaved&&<div style={{display: "flex",flexDirection: 'row',justifyContent: 'flex-end',marginRight: 60}}>
                      <button className="searchbutton123" onClick={this.cancelInstallment}>Cancel</button>
                      <button style={{marginLeft: 24}} className="searchbutton123" onClick={this.manageInsertInstallment}>{this.props.match.params.id1==='insert'?'Save':'Update'}</button>
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
							<FormControl type="text" placeholder="Total Fees" value={this.state.totalAmount} onChange={this.handleInputs} name="totalAmount" />
							<small className={this.state.displaytext + " text-danger"}>{this.state.totalAmount_ErMsg}</small>
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
				<Button type="submit" disabled={this.state.isValiddata} onClick={this.manageInsertInstallment} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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
				<Button type="submit" onClick={this.deleteInsertInstallmentById} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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





export default InsertInstallment
