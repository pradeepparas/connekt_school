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
const pageSize = myConstClass.pageSize

class Class extends React.Component {
  constructor() {
    super();
    this.state = {
      order: "",
      count: false,
      classList: [],
       id: '',
      searchStr:"",
      btnValue: "Submit",
      active:true,
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
     className:"",
      className_ErMsg:"",



    };


  }

  handleInputs = (e) => {
      if(e.target.value!=='0'){
        this.setState({
            [e.target.name]: e.target.value, [e.target.name+`_ErMsg`]:"", count: (e.target.name == 'per_page' ? true : false)},
            () => {
              if(this.state.count){
                this.getClass(this.state.current_page)
              }
            });
      }

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


    }
  }


  handleShow = () => {

    this.setState({
      show: true,
      title: 'Add Class',

      className:"",
      className_ErMsg:"",
      btntitle: 'Save',
      isAdd: true,
      isEdit: false,
      isDelete: false,
      displaytext: 'hide_block',
        });

  };


  onChageCheckboxActive = (e) => {
    debugger
    this.setState({ active: !this.state.active })
  }
  // edit class
  editClass =(data)=>{
      debugger
    this.setState({
      order: "",
      id:data.ClassId,
      className: data.StudentClass,
      show: true,
      title: 'Update Class',
      className_ErMsg: "",
      btntitle: 'Update',
   show: true,
      isEdit: true, isAdd: false, isDelete: false,
    })
  }

// ON SEARCH CLASS
onSearchClass =()=>{
  this.getClass(1)
}


/// GET CLASS LIST
getClass = async pageNumber => {
  debugger
    this.setState({isLoading:true})
  try{
  const response = await fetch( api_Url+`getClassSearch?page=${pageNumber}&size=${this.state.per_page}&name=${this.state.searchStr}`,{
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

       this.setState({
           classList: data.Data,
           total: data.TotalCount.Total,
           current_page:pageNumber,

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




  handleClose = () => {
    this.setState({ show: false });
  };
  handleDeleteClose = () => {
    this.setState({ showDeleteModal: false });
  };

// validate form
validateForm =()=>{
   var isValid=true;

    if(this.state.className==''){
        isValid= false
        return this.setState({className_ErMsg:"Class name is required", courseName_ErMsg:"", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"", courseImage_ErMsg:""})
    }
    else if(!Number.isInteger(this.state.order)){
      isValid= false
      return this.setState({classId_ErMsg:"", courseName_ErMsg:"", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"", courseImage_ErMsg:"", order_ErMsg:"order is required"})
    }
//    else if(this.state.courseName.trim()==''){
//        isValid= false
//         return this.setState({classId_ErMsg:"", courseName_ErMsg:"Course name is required", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"", courseImage_ErMsg:""})
//     }
//     else if(this.state.courseDescription.trim()==''){
//         isValid= false
//         return this.setState({classId_ErMsg:"", courseName_ErMsg:"", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"Description is required", courseImage_ErMsg:""})
//     }
//     else  if(this.state.courseOtherDetails.trim()==''){
//         isValid= false
//         return this.setState({classId_ErMsg:"", courseName_ErMsg:"", courseOtherDetails_ErMsg:"Course other description is required", courseDescription_ErMsg:"", courseImage_ErMsg:""})
//     }
//     else  if(this.state.courseImage.length==0){
//         isValid= false
//         return this.setState({classId_ErMsg:"", courseName_ErMsg:"", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"", courseImage_ErMsg:"Course image is required"})
//     }
    else{
        this.setState({classId_ErMsg:"", courseName_ErMsg:"", courseOtherDetails_ErMsg:"", courseDescription_ErMsg:"", courseImage_ErMsg:"", order_ErMsg:""})
        return isValid
    }
}



  // manage Course
  manageClass = (e) => {
    e.preventDefault();
  if(!this.validateForm()){
     return
    }
    if (this.state.isAdd) {

      this.setState({ isLoading: true })
      var data={
        StudentClass:this.state.className,
        StatusId:this.state.active?1:0
         }
      fetch(api_Url + `insertClass`, {
        method: "POST",
        headers: {
          "Accept": "Application/json",
          "Content-Type":"Application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("auth_token"),
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(result => {
          debugger
          if (result.success) {
            toast.success(result.message, {

            })
            this.handleClose();
            this.getClass(1)
          }
          else {
            toast.error(result.message, {

            })
          }
          this.setState({ isLoading: false })

        })
    }
   else if (this.state.isEdit) {

      this.setState({ isLoading: true })
      var data={
        StudentClass:this.state.className,
        StatusId:this.state.active?1:0
         }
         debugger
      fetch(api_Url + `updateClassById?ClassId=${this.state.id}`, {
        method: "POST",
        headers: {
          "Accept": "Application/json",
          "Content-Type":"Application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("auth_token"),
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(result => {
          debugger
          if (result.success) {
            toast.success(result.message, {
            })
            this.getClass(1)
            this.handleClose()
          }
          else {
            toast.error(result.message, {

            })
          }
          this.setState({ isLoading: false })

        })
    }
   else{

   }
  }




// show class list

  showClass = () => {
    if (this.state.classList !== undefined) {
      return this.state.classList.map((cls, i) => {
        // var desc = member.description;
        // var res = desc;
        // if (desc.length > 20) {
        //   var res1 = desc.substring(0, 20);
        //   res = res1 + '...';
        // }
        return (
          <tr>
            <td>{((this.state.current_page - 1) * this.state.per_page) + (i + 1)}</td>
            <td>{cls.StudentClass}</td>
            <td>{cls.StatusId=='1'?"Active":"In-Active"}</td>

           <td>
            <i  onClick={() => this.editClass(cls)} class="ti-pencil"></i>
            {" "}  {" "}
            {/* <i  onClick={() => this.deleteCountry(cls)} class="ti-trash"></i> */}
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
            onClick={() => this.getClass(number, this.state.per_page)}
          >
            {number}
          </span>
        );
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.isLoading && <div class="loader1"></div>}
        <div className="page-container">
      <SideBar tabIndex='class'  shown='master' />
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
                    <h4 className="page-title pull-left">Class</h4>

                    <ul className="breadcrumbs pull-left">
                      <li><a >Home</a></li>
                      <li><span>Class</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-content-inner">
              <div class="row">

                <div class="col-lg-12 mt-5">
                <ul className ="filter-ul">
              <li>
                    <span>Class Name</span><br></br>
                  <input className="input-s br-w-1" type="text" placeholder ="Search by name" name="searchStr" value={this.state.searchStr} onChange={this.handleInputs} />
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
                    <button className ="search-button" onClick ={this.onSearchClass}>Search</button>
                    </li>
                  </ul>
                  <div class="card">
                    <div class="card-body">
                      <div className="">
                        <h4 class="header-title">Class List</h4>
                        <p className={styles.addCountry}>
                          <button
                            onClick={this.handleShow}
                            className="btn btn-warning btn-xs"
                            data-title="Add"
                            data-toggle="modal"
                            data-target="#add"
                          >
                            {" "}
                      Add Class {" "}
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
                                <th scope="col">Status</th>

                                {/* <th scope="col">Course Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Ohter Details</th> */}
                                <th scope="col">Action</th>


                              </tr>
                            </thead>


                            <tbody> {this.state.classList.length>0&&this.showClass()}</tbody>


                          </table>
                          {this.state.classList.length == 0 && <p style={{ textAlign: "center" }}> No Record Found</p>}


                        </div>
                        {this.state.classList.length>0&&
                      <div className={styles.pagination}>
                      <span className={this.state.current_page=='1'?"disabled":""}
                        onClick={()=> {
                          if(this.state.current_page=='1'){return;}
                          this.getClass(this.state.current_page-1, this.state.per_page, this.state.searchStr)}}>Previous</span>
                      {this.state.classList.length > 0 && this.renderPageNumbers()}
                    <span  className={Math.ceil(this.state.total / this.state.per_page)==this.state.current_page?"disabled":""}
                        onClick={()=> {
                          if(Math.ceil(this.state.total / this.state.per_page)==this.state.current_page){return;}
                          this.getClass(+this.state.current_page+1, this.state.per_page, this.state.searchStr)}}>Next</span>
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
						<Col sm={4}> Class Name <small style={{color: 'red', fontSize: 18}}>*</small></Col>
						<Col sm={9}>
							<FormControl type="text" placeholder="Class Name" value={this.state.className} onChange={this.handleInputs} name="className" />
							<small className={this.state.displaytext + " text-danger"}>{this.state.className_ErMsg}</small>
						</Col>
            <Col sm={4}> Order <small style={{color: 'red', fontSize: 18}}>*</small></Col>
            <Col sm={9}>
              <FormControl type="text" placeholder="Enter Order" value={this.state.order} onChange={this.handleInputs} name="order" />
              <small className={this.state.displaytext + " text-danger"}>{this.state.order_ErMsg}</small>
            </Col>

               <Col sm={9}>
              <input type="checkbox"  checked={this.state.active} onChange={this.onChageCheckboxActive} name="active" /> Is Active
						</Col>

					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.handleClose}>Close</Button>
				<Button type="submit" disabled={this.state.isValiddata} onClick={this.manageClass} bsStyle="primary"> {" "} {" "} {this.state.btntitle} </Button>
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





export default Class
