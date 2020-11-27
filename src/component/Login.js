import React from 'react';
import logo from '../Images/logo_black.png';
import { Link, Redirect, withRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
import { Form, FormGroup, FormControl, Col } from "react-bootstrap";

import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import '../css/style.css';
import * as myConstClass from './constants';

const api_Url = myConstClass.api

class Login extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			sessionId_ErMsg: "",
			sessionId: "",
			sessionList: [{SessionId:"1",SessionName:"2019-20"},{SessionId:"2",SessionName:"2020-21"},{SessionId:"2021-22",SessionName:"2022-23"}],
			show: false,
			id: '',
			isRedirect: false,
			email: '',
			password: '',
			rememberMe: '',
			redirect: false,
			displaytext:'hide_block',
			message:'',
			email_ErMsg:'',
			password_ErMsg:'',
			isLoading:false,
			username:'',
			username_ErMsg:''
		};
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value, [e.target.name+`_ErMsg`]:""});
	}

	componentDidMount() {
		let token = window.sessionStorage.getItem('auth_token');
		if (token) {
			this.props.history.push('/dashboard');

		}
		else {
			this.props.history.push('/login');
		}

	}

	handleInputs = (e) => {

    this.setState({
      [e.target.name]: e.target.value, [e.target.name+`_ErMsg`]:""});

  }

	handleClose = () => {
		this.setState({ show: false });
	};

	handleSubmit = (e) => {
		debugger
		e.preventDefault();
		var emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

		if(this.state.email === '') {
			this.setState({displaytext:'show_block'});
			this.setState({email_ErMsg:'Username is required', password_ErMsg:"",sessionId_ErMsg:""});
			return;
		}
		// else if(!emailValid){
		// 	this.setState({displaytext:'show_block'});
		// 	this.setState({email_ErMsg:'Invaild email', password_ErMsg:""});
		// 	return;
		// }
		else if(this.state.password=='') {
            this.setState({
				password_ErMsg:'Password is required', email_ErMsg:"", sessionId_ErMsg:""
			});
		}
		else if(this.state.sessionId=="") {
			this.setState({
				password_ErMsg:'', email_ErMsg:"", sessionId_ErMsg:"Session is required"
			})
			return;
		}
		else{
			this.setState({
				password_ErMsg:'', email_ErMsg:"", sessionId_ErMsg:"",  displaytext:"hide_block",
			});
		}

			var data = {
				username: this.state.email,
				password: this.state.password
			}
    this.setState({isLoading:true})
	// MAKING API REQUEST schoolLoginTest
	fetch (api_Url+`schoolLoginTest`,{
		method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
         // 'Authorization': 'Bearer ' + window.sessionStorage.getItem('token'),
		},
	     body:JSON.stringify(data)
	})
	.then(res=>res.json())
	.then(result=>{
		if(result.success){
			debugger
			toast.success("LoggedIn Successfully",{
			})
			  //CLEAR LOCAL STORAGE BEFORE LOGIN
			  window.sessionStorage.removeItem("role",)
			  localStorage.removeItem("auth_token",)

			 // SET VALUE IN LOCAL STORAGE
			 window.sessionStorage.setItem("auth_token", result.Token);
			window.sessionStorage.setItem("role", result.RoleId)
			//  if(result.Data[0].RoleId=='2'){
				this.props.history.push('/dashboard')

			//   }
		}
		else{
			toast.error(result.Message,{

			})
			toast.error(result.error,{

			})
			toast.error(result.message,{

			})
			debugger
		}
		this.setState({username:"", password:""})
		this.setState({isLoading:false})

	})
}
	rememberMe = (e) => {
		if(e.target.name) {
			Cookies.set('email', this.state.email, { expires: 7});
			Cookies.set('password', this.state.password, { expires: 7});
		}
	}

	handleShow = () => {

		this.setState({
			show: true,
			email:"",
			username:'',
			password:"",
			email_ErMsg:"",
			username_ErMsg:"",
			password_ErMsg:"",
				});

	};

  	render() {

		return (
			<div>
		 {this.state.isLoading && <div className="loader1"></div>}

				<div className="limiter">
					<div className="login-bg">
						<div className="login-overlay">
					</div>
					<div style={{height: 550}} className="wrap-login100 p-l-60 p-r-50 p-t-40 p-b-40 login-blur">
						<img src={logo} alt="logo"></img>
						{/* <h4 className="mb-3 f-w-400">Log in</h4> */}
							<form onSubmit={this.handleSubmit} className="login100-form validate-form flex-sb flex-w">

									<input autoFocus className="input100" type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Username"  />
									{/* <span className="focus-input100"></span> */}
									<small className={this.state.displaytext+" text-danger text-left"}>{this.state.email_ErMsg}</small>

								<div className="">
									<input className="input100" type="password" name="password" value={this.state.password} onChange={this.handleChange}  placeholder="Password"  />
									<small className={this.state.displaytext+" text-danger text-left"}>{this.state.password_ErMsg}</small>
								</div>

								<div className="">
								<select style={{borderColor: 'white'}} className="input100" name="sessionId" value={this.state.sessionId} onChange={this.handleInputs}>
									<option style={{width: '100%'}} value={'0'}>--SELECT SESSION--</option>
									{this.state.sessionList.length > 0 ? this.state.sessionList.map(cls =>
										<option key={cls.SessionId} value={cls.SessionName}>{cls.SessionName}</option>
									) : null}
								</select>{" "}
								<small className={this.state.displaytext+" text-danger text-left"}>{this.state.sessionId_ErMsg}</small>
								</div>
								<div className="w-full p-b-48 m-t-25">
									{/* <div className="contact100-form-checkbox">
										<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember" value={this.state.rememberMe}  onClick={this.rememberMe} />
										<label className="label-checkbox100" htmlFor="ckb1">
											Remember me
										</label>
									</div> */}
									<div className="container-login100-form-btn">
										<button className="login100-form-btn">
											Sign In
										</button>
										<div>
										<button style={{marginTop: 4}}className='button1234' onClick ={this.handleShow}>Forgot password?</button></div>
									</div>
								</div>
								<div>

									{/* <Link to='/#' className="txt3">
										Forgot Password?
									</Link> */}

									{<div className="static-modal">

						  <Modal show={this.state.show} backdrop="static" onHide={this.handleClose}>
						    <Modal.Header closeButton>
						      <Modal.Title>Forgot password</Modal.Title>
						    </Modal.Header>
						    <Modal.Body>
						               {this.state.isLoading &&
						      <div class="loader1"></div>}
						      <Form horizontal>
						        <FormGroup controlId="formHorizontalEmail">
											<Col sm={4}>Email</Col>
										<Col sm={9}>
											<FormControl type="email" placeholder="email address" value={this.state.username} onChange={this.handleInputs} name="username" required/>
											<small className={this.state.displaytext + " text-danger"}>{this.state.username_ErMsg}</small>
										</Col>
						        </FormGroup>
						      </Form>
						    </Modal.Body>
						    <Modal.Footer>
						      <Button onClick={this.handleClose}>Close</Button>
						      <Button type="submit" disabled={this.state.isValiddata} onClick={() => {
										var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
										if (reg.test(this.state.username) == false)
            					{
                			toast.error("Please enter email address")
                			this.setState({
												username: ''
											})
            					}
									}} bsStyle="primary"> {" "} {" "} Send </Button>
						    </Modal.Footer>
						  </Modal>
						</div>}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
  	}
}

export default withRouter(Login) ;
