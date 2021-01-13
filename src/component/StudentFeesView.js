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
import moment from 'moment';
import DatePicker from 'react-datepicker';

import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import upload_icon from '../Images/upload_icon1.png';
import Avatar from 'react-avatar-edit'
import * as myConstClass from './constants';
const api_Url = myConstClass.api
const imageUrl = myConstClass.imageUrl
const pageSize = myConstClass.pageSize
const file1 = myConstClass.fileSize

class StudentFeesView extends React.Component {
  constructor() {
    super();
    this.state = {
      studentName: '',
      dateEdit: false,
      studentList: [],
      class1Id: "",
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
      statusDetails: [{statusId:"2",statusName:"Inactive"},
                      {statusId:"1",statusName:"Active"}],
      statusId: ""
    };


  }

  componentDidMount() {
    $('.nav-btn').on('click', function () {
        $('.page-container').toggleClass('sbar_collapsed');
      });
    let sessionId = window.sessionStorage.getItem('SessionId')
    let token = window.sessionStorage.getItem('auth_token');
    if (token === null&&sessionId==null) {
      return this.props.history.push('/login');
    } else {
   this.setState({sessionId: sessionId},()=> {
     this.getFeesMasterById(1)
     this.getStudentFeesDetailById();
   })
    }
  }

// ON CHANGE ACTIVE
  onChageCheckboxActive = (e) => {
    debugger
    this.setState({ active: !this.state.active })
  }

// Get Student Fees Details By Master Id
  getStudentFeesDetailById = async() => {
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getStudentFeesDetailByStudentFeesMasterId?status=${this.props.match.params.id2}&StudentFeesMasterId=${this.props.match.params.id1}&page=1&size=50`,{
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
    let list = [{
      name:"",
      fromDate:"",
      toDate:"",
      amount:"",
      feeStatus:"",
      penalty:"",
      remark:""
    }]

      data.StudentFeesDetail.map((item,index) => {
        list.push({
          "name": item.NumberOfInstallments,
          "fromDate": moment(item.FromDate).format('YYYY-MM-DD'),
          "toDate": moment(item.ToDate).format('YYYY-MM-DD'),
          "amount": item.FeeAmount,
          "feeStatus": item.FeeStatus,
          "penalty": item.Penalty,
          "remark": item.Remarks
        })
      })

      list.shift()
     console.log(list)
     debugger
       this.setState({

         id: this.props.match.params.id1,
         listArray: list,
       });

   } else {
      debugger
       this.setState({
        listArray: []
       });
   }
  this.setState({isLoading:false})
  }
  catch(err)
  {
  }
  }

  // Get Student Fees Master by Id
  getFeesMasterById = async() => {
    debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getStudentFeesMasterByMasterId?status=${this.props.match.params.id2}&StudentFeesMasterId=${this.props.match.params.id1}&page=1&size=1`,{
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
         studentName: data.StudentFeesMaster[0].FirstName+" "+data.StudentFeesMaster[0].LastName,
         // feesStructure: data.StudentFeesMaster[0].StudentFeesMasterType,
         sessionName: data.StudentFeesMaster[0].SessionName,
         classId: data.StudentFeesMaster[0].ClassId,
         studentId: data.StudentFeesMaster[0].StudentId,
         class1Id: data.StudentFeesMaster[0].StudentClass,
         totalFees: data.StudentFeesMaster[0].TotalFees,
         grandTotal: data.StudentFeesMaster[0].GrandTotal,
         statusId: this.props.match.params.id2=='1'? 'Active': 'In-Active',
         feesStructure: data.StudentFeesMaster[0].FeeType,
         feesRebate: data.StudentFeesMaster[0].FeesRebate? data.StudentFeesMaster[0].FeesRebate: '',
         reason: data.StudentFeesMaster[0].RebateReason? data.StudentFeesMaster[0].RebateReason: '-',
       },()=> {
         // this.getStudentList(this.state.classId)
       });

   } else {
      debugger
       this.setState({
         id: '',
         // feesStructure: data.StudentFeesMaster[0].StudentFeesMasterType,
         classId: '',
          class1Id: '',
         totalFees: '',
         grandTotal: '',
         feesStructure: '',
         feesRebate: '',
         reason: '',
       });
   }
  this.setState({isLoading:false})
  }
  catch(err)
  {
    debugger
  }
  }

// ON CHANGE INSERT TYPE
onChangeInsertType =(e)=>{
  this.setState({insertType:e.target.name, title:e.target.name=='single'?'Add Course':"Add Courses"})
  }

/// ON SEARCH COURSE
onSearchCourese=()=>{
this.getStudentFeesView(1, this.state.current_page, this.state.classId, this.state.status)
}


/// GET CLASS LIST by sir

  handleClose = () => {
    this.setState({ show: false,
    fsize: 0 });
  };
  handleDeleteClose = () => {
    this.setState({ showDeleteModal: false });
  };


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

  showStudentFeesView = () => {
    if (this.state.feesStructureList !== undefined) {
      return this.state.feesStructureList.map((fees, i) => {
        return (
          <tr>
            <td>{((this.state.current_page - 1) * this.state.per_page) + (i + 1)}</td>
            <td>{fees.StudentFeesViewType}</td>
            <td>{fees.StudentClass}</td>
            <td>{fees.TotalFees? fees.TotalFees:'-'}</td>
            {/*<td>{fee.CourseOtherDetails}</td>*/}
            <td>{fees.StatusId==1?"Active":"In-Active"}</td>


            {/* <td><img className="team-profile-pic" src={api_Url + '/UserProfile/' + course.profile_pic} title={member.firstname + ' ' + "profile pic"} alt={member.firstname + ' ' + "profile pic"} /></td> */}

            <td>
            <i  onClick={() => this.editStudentFeesView(fees)} class="ti-pencil"></i>
            {" "}  {" "}<Link to={`feestructure/${fees.StudentFeesViewMasterId}`}> <i  class="ti-eye"></i></Link>{" "}{" "}
            {<i  onClick={() => this.deleteStudentFeesView(fees)} class="ti-trash"></i>}
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
                <td>{list.name}</td>
                <td key={i}>{moment(list.fromDate).format("YYYY-MM-DD")}</td>

                <td key={i}>{moment(list.toDate).format("YYYY-MM-DD")}</td>

                <td>{list.amount}</td>
                <td key={i}>{list.feeStatus}</td>
                <td key={i}>{list.penalty?list.penalty: '-'}</td>
                <td key={i}>{list.remark? list.remark: '-'}</td>
              </tr>
            );
          });
        }
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
            onClick={() => this.getStudentFeesView(number, this.state.per_page, this.state.classId, this.state.status, this.state.searchStr,)}
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
                  <div class="card">
                    <div class="card-body">
                      <div className="">
                        <h4 class="header-title">Student Fees Details</h4>
                      </div>
                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Class Name</span><span style={{marginLeft: 67,marginRight: 30}}> : </span>
                      {this.state.class1Id}

                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Total Fees</span><span style={{marginLeft: 36,marginRight: 30}}> : </span>
                      {this.state.totalFees}
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Student Name</span><span style={{marginLeft: 51,marginRight: 30}}> : </span>
                      {this.state.studentName}
                      </div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Session</span><span style={{marginLeft: 52,marginRight: 30}}> : </span>
                      {this.state.sessionName}
                      </div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Fees Structure Type</span><span style={{marginLeft: 18,marginRight: 30}}> : </span>
                      {this.state.feesStructure}</div>
                      <div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Fees Rebate</span><span style={{marginLeft: 23,marginRight: 30}}> : </span>
                      {this.state.feesRebate}</div>
                      </div>

                      <div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <span style={{marginLeft: 13}}>Grand Total</span><span style={{marginLeft: 69,marginRight: 30}}> : </span>
                      {this.state.grandTotal}
                      </div>
                      {<div style={{flexDirection: 'row',width: 492}}>
                      <span style={{marginLeft: 13}}>Status</span><span style={{marginLeft: 59,marginRight: 30}}> : </span>
                      {this.state.statusId}
                      </div>}
                      </div>

                      {this.props.match.params.id1!=='insert'&&<div style={{display: "flex",flexDirection: 'row'}}>
                      <div style={{flexDirection: 'row',width: 460}}>
                      <div style={{display: 'flex',flexDirection: 'row'}}>
                      <div style={{marginLeft: 13}}>Rebate Reason</div><div style={{marginLeft: 52,marginRight: 30}}> : </div>
                      {this.state.reason}
                      </div>
                      </div></div>}

                      <div style={{marginTop: 10}} class="table-responsive">
                        <table class="table text-center">
                          <thead class="text-uppercase  bg-light-green">
                            <tr class="text-white">
                              <th scope="col">S.No</th>
                              <th scope="col">Installment No.</th>
                              <th style={{minWidth: 120}} scope="col">From_Date (YYYY-MM-DD)</th>
                              <th style={{minWidth: 120}} scope="col">To_Date (YYYY-MM-DD)</th>
                              <th scope="col">Amount</th>
                              <th scope="col">Fee Status</th>
                              <th scope="col">Penalty</th>
                              <th scope="col">Remark</th>
                            </tr>
                          </thead>
                          <tbody>{this.renderTable()}</tbody>
                        </table>

                      </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}





export default StudentFeesView;
