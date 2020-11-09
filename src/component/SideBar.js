import React from 'react';

import '../assets/css/styles.css';
import '../css/style.css';
import '../assets/css/default-css.css';
import '../assets/css/themify-icons.css';
import '../assets/css/font-awesome.min.css';
import '../assets/css/metisMenu.css';
import '../assets/css/owl.carousel.min.css';
import '../assets/css/responsive.css';
import '../assets/css/slicknav.min.css';
import '../assets/css/typography.css';
import * as $ from 'jquery';
import logo from '../Images/logo-white.png';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import Country from './Country1';
import User1 from './User1';



class SideBar extends React.Component{
    constructor(props){

        super(props);
        this.state = {
              selected:'dashboard1',
              redirect: false,
              lessonShown: false,
              aboutShown:false,
              Miscelleneusshown:false,
              languageShown:false,


        }
    }


    activateTab = (e) => {
        this.setState({
            selected  : e,
           /// profileActive: true
        });
    }


	componentWillMount() {

        let token = window.sessionStorage.getItem('auth_token');

		if(token ==null) {

			// return <Redirect to="/mycourses" />
			// return <Link to="/mycourses" />
			// window.history.push('/mycourses');
			// window.history.forward();
			//this.props.history.push('/login');
			// window.history.go(1);
			// this.props.context.history.push('/mycourses');
        }

	}

    componentDidMount(){

        // $( document ).ready(function() {
        //     $("#menu").metisMenu();
        // })
    }


    toggleLanguage = (e) => {
        if (this.state.languageShown === false) {
            this.setState({
                languageShown: true
            });
        }else{
            this.setState({
                languageShown: false
            });
        }

    }
    toggleLesson = (e) => {
         if (this.state.lessonShown === false) {
             this.setState({
                lessonShown: true
             });
         }else{
             this.setState({
                lessonShown: false
             });
         }

     }
     toggleaboutLangistan = (e) => {

         if (this.state.aboutShown === false) {
             this.setState({
                aboutShown: true
             });
         }else{
             this.setState({
                aboutShown: false
             });
         }

     }
     togglMiscelllenues = (e) => {

         if (this.state.Miscelleneusshown === false) {
             this.setState({
                Miscelleneusshown: true
             });
         }else{
             this.setState({
                Miscelleneusshown: false
             });
         }

     }



Logout = () => {
    debugger
    sessionStorage.clear();
    this.props.history.push('/login')
}
toggleClass =(e, type)=>{

    $(`#toggleDemo${type}`).toggleClass('show')
   }
    render() {
    var role = sessionStorage.getItem('role')

      return(
        <div>

                <div className="sidebar-menu">
                    <div className="sidebar-header">
                        <div className="logo">
                            <a href="index.html"><img src={logo} alt="logo" /></a>
                        </div>
                    </div>
                    <div  className="main-menu">
                        <div className="menu-inner">
                            <nav>
                                <ul className="metismenu" id="menu">
                                    {this.props.tabIndex=='dashboard'?
                                <li className="active">
                                          <Link   to ="/dashboard" aria-expanded="true"><i className="ti-dashboard"></i><span>dashboard</span></Link>
                                    </li>: <li>
                                          <Link   to ="/dashboard" aria-expanded="true"><i className="ti-dashboard"></i><span>dashboard</span></Link>

                                    </li>}

                                    {/* <li>
                                        <a href="javascript:void(0)" aria-expanded="true"  onClick={this.toggle}><i className="ti-layout-sidebar-left"></i><span>Master
                                            </span></a>
                                            <ul className="collapse">
                                            <li><a href="">Country</a></li>
                                            <li><a href="">Time</a></li>
                                        </ul>
                                         {/* {(this.state.shown||this.props.shown) && <ul>
                                            <li><Link className="cursor1" to="/country"> Country </Link></li>
                                            <li><Link className="cursor1" to="/time"> Time </Link></li>
                                            <li><Link className="cursor1" to="/language"> Language </Link></li>


                                        </ul>}  */}
                                        {/* {(this.state.shown || this.props.shown=="true") && <ul>
                                            <li ><Link className="cursor1" to="/country" > Country </Link></li>
                                            <li><Link className="cursor1" to="/time" > Time </Link></li>
                                            <li><Link className="cursor1" to="/language" > Language </Link></li>
                                            <li><Link className="cursor1" to="/team" > Team </Link></li>
                                            <li><Link className="cursor1" to="/hour-challenges" >Hour Challenges</Link></li>
                                            <li><Link className="cursor1" to="/price" > Price </Link></li>
                                            <li><Link className="cursor1" to="/chapter" > Chapter </Link></li>
                                            <li><Link className="cursor1" to="/lesson" > Lesson </Link></li>
                                            <li><Link className="cursor1" to="/vocabulary" > Vocabulary </Link></li>
                                             <li><Link className="cursor1" to="/video" > Video </Link></li>
                                            <li><Link className="cursor1" to="/text" > Text </Link></li>


                                        </ul>}

                                    </li> */}



                                    {role=='2'  && <li>
                                        <a href="javascript:void(0)" aria-expanded="true" data-toggle="collapse" data-target="#toggleDemo" className={this.props.shown == 'user_management' ? 'active_submenu' : ""} data-parent="#sidenav01" onClick={(e) => this.toggleClass(e, "")}><i className="ti-layout-sidebar-left"></i><span>Students Management
                                            </span></a>
                                        <div className="collapse" id="toggleDemo">
                                            <ul>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'users' ? 'active' : ''} to="/users" > Students </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'feedback' ? 'active' : ''} to="/feedback" > Feedback </Link></li>
                                            </ul>
                                        </div>

                                    </li> }
                                    {/*role=='2' &&<li>
                                        <a href="javascript:void(0)" aria-expanded="true" data-toggle="collapse" data-target="#toggleDemo1" className={this.props.shown == 'parent_management' ? 'active_submenu' : ""} data-parent="#sidenav01" onClick={(e) => this.toggleClass(e, "1")}><i className="ti-layout-sidebar-left"></i><span>Parent Management
                                            </span></a>
                                        <div className="collapse" id="toggleDemo1">
                                            <ul>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'parents' ? 'active' : ''} to="/parents" > Parent </Link></li>
                                                {/* <li><Link className="cursor1" className={this.props.tabIndex == 'feeback' ? 'active' : ''} to="/" > Feedback </Link></li> */}
                                            {/*</ul>
                                        </div>

                                    </li>*/}
                                    {role=='1'&&<li>
                                        <a href="javascript:void(0)" aria-expanded="true" data-toggle="collapse" data-target="#toggleDemo2" className={this.props.shown == 'master' ? 'active_submenu' : ""} data-parent="#sidenav01" onClick={(e) => this.toggleClass(e, "2")}><i className="ti-layout-sidebar-left"></i><span>Master
                                            </span></a>
                                        <div className="collapse" id="toggleDemo2">
                                            <ul>
                                          <li><Link className="cursor1" className={this.props.tabIndex == 'school' ? 'active' : ''} to="/school" > School</Link></li>
                                          <li><Link className="cursor1" className={this.props.tabIndex == 'class' ? 'active' : ''} to="/class" > Class</Link></li>
                                          <li><Link className="cursor1" className={this.props.tabIndex == 'live-class' ? 'active' : ''} to="/live-class" > Live Class</Link></li>




                                           </ul>
                                        </div>

                                    </li>}
                                       {role=='2'&&<li>
                                        <a href="javascript:void(0)" aria-expanded="true" data-toggle="collapse" data-target="#toggleDemo3" className={this.props.shown == 'master' ? 'active_submenu' : ""} data-parent="#sidenav01" onClick={(e) => this.toggleClass(e, "3")}><i className="ti-layout-sidebar-left"></i><span>Master
                                            </span></a>
                                        <div className="collapse" id="toggleDemo3">
                                            <ul>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'course' ? 'active' : ''} to="/course" > Course </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'chapter' ? 'active' : ''} to="/chapter" > Chapter  </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'exammaster' ? 'active' : ''} to="/exam-master" > Exam  </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'grade' ? 'active' : ''} to="/grade" > Grades   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'topic' ? 'active' : ''} to="/topic" > Topic   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'teacher' ? 'active' : ''} to="/teachers" > Teacher   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'time' ? 'active' : ''} to="/time-table" > Time Table   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'exam-result-school' ? 'active' : ''} to="/exam-result-school" > Result   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'holiday' ? 'active' : ''} to="/holiday" > Holidays   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'enquiry' ? 'active' : ''} to="/enquiry" > Enquiry   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'students' ? 'active' : ''} to="/students" > Student   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'section' ? 'active' : ''} to="/section" > Section   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'caste' ? 'active' : ''} to="/caste" > Caste   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'religion' ? 'active' : ''} to="/religion" > Religion   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'feetype' ? 'active' : ''} to="/feetype" > Fee Type   </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'notification' ? 'active' : ''} to="/notification" > Notification</Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'feestructure' ? 'active' : ''} to="/feestructure" > Fees Structure</Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'feestructuredetail' ? 'active' : ''} to="/feestructuredetail" > Fees Structure Detail</Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'session' ? 'active' : ''} to="/session" > Session</Link></li>




                                            </ul>
                                        </div>

                                    </li>}

                                    {role=='3'  && <li>
                                        <a href="javascript:void(0)" aria-expanded="true" data-toggle="collapse" data-target="#toggleDemo" className={this.props.shown == 'master' ? 'active_submenu' : ""} data-parent="#sidenav01" onClick={(e) => this.toggleClass(e, "5")}><i className="ti-layout-sidebar-left"></i><span>Class Management
                                            </span></a>
                                        <div className="collapse" id="toggleDemo5">
                                            <ul>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'time' ? 'active' : ''} to="/time-table" > Time Table </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'assignment' ? 'active' : ''} to="/assignment" > Assignment </Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'exam' ? 'active' : ''} to="/exam" > Exam</Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'test' ? 'active' : ''} to="/test" > Test</Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'testresult' ? 'active' : ''} to="/test-result" > Test Result</Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'exam-result-teacher' ? 'active' : ''} to="/exam-result-teacher" > Exam Result   </Link></li>
                                                {/*<li><Link className="cursor1" className={this.props.tabIndex == 'upload' ? 'active' : ''} to="/uploadvideo" > Upload Videos</Link></li>*/}
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'practice' ? 'active' : ''} to="/practice" > Practice</Link></li>
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'notes' ? 'active' : ''} to="/notes" > Notes </Link></li>
                                                {/*<li><Link className="cursor1" className={this.props.tabIndex == 'attendance' ? 'active' : ''} to="/attendance/:" > Attendance </Link></li>*/}
                                                <li><Link className="cursor1" className={this.props.tabIndex == 'attendance' ? 'active' : ''} to="/attendance" > Attendance </Link></li>
                                            </ul>
                                        </div>

                                    </li> }
                                    <li>
                                        <a href="javascript:void(0)" aria-expanded="true" data-toggle="collapse" data-target="#toggleDemo4" className={this.props.shown == 'setting' ? 'active_submenu' : ""} data-parent="#sidenav01" onClick={(e) => this.toggleClass(e, "4")}><i className="ti-layout-sidebar-left"></i><span>Setting
                                            </span></a>
                                        <div className="collapse" id="toggleDemo4">
                                            <ul>
                                          <li><Link className="cursor1" className={this.props.tabIndex == 'password' ? 'active' : ''} to="/change-password" >Change Password</Link></li>
                                          <li><Link className="cursor1" className={this.props.tabIndex == 'update-profile' ? 'active' : ''} to="/update-profile" >Update Profile</Link></li>

                                          {/* <li><Link className="cursor1" className={this.props.tabIndex == 'class' ? 'active' : ''} to="/class" > Class</Link></li> */}



                                           </ul>
                                        </div>

                                    </li>
                                    {/* <li>
                                        <a href="javascript:void(0)" aria-expanded="true"  onClick={this.toggleLanguage}><i className="ti-layout-sidebar-left"></i><span>Parents Management
                                            </span></a>
                                            <ul className="collapse">
                                        </ul>

                                        {(this.state.languageShown || this.props.shown=="parent_management") && <ul>
                                             <li><Link className="cursor1"   className ={this.props.tabIndex =='parent'?'active':''}to="/users" > Parents </Link></li>
                                             <li><Link className="cursor1"  className ={this.props.tabIndex =='feedback'?'active':''} to="/" > Feedback </Link></li>

                                        </ul>}

                                    </li> */}

                                    {/* {this.props.tabIndex=='hourchallenges'?
                                    <li className="active"> <Link  className ="cursor1"   to="/hour-challenges"><i className="ti-receipt"></i> <span>Add hour challenges </span></Link></li>:
                                    <li> <Link  className ="cursor1"   to="/hour-challenges"  ><i className="ti-receipt"></i> <span>Add hour challenges  </span></Link></li>}

                                    {this.props.tabIndex=='chapter'?
                                    <li className="active"> <Link  className ="cursor1"   to="/chapter"><i className="ti-receipt"></i> <span>Create a chapter</span></Link></li>:
                                    <li> <Link  className ="cursor1"   to="/chapter"  ><i className="ti-receipt"></i> <span>Create a chapter</span></Link></li>}

                                    <li>
                                        <a href="javascript:void(0)" aria-expanded="true"  onClick={this.toggleLesson}><i className="ti-layout-sidebar-left"></i><span>Create a lesson</span></a>
                                            <ul className="collapse">
                                            <li><a href="">Country</a></li>
                                            <li><a href="">Time</a></li>
                                        </ul>

                                        {(this.state.lessonShown || this.props.shown=="lessonvocabulary") && <ul>
                                             <li><Link className="cursor1" className ={this.props.tabIndex =='lesson'?'active':''}  to="/lesson" >Lesson </Link></li>

                                             <li><Link className="cursor1" className ={this.props.tabIndex =='entertainmentvideo'?'active':''} to="/entertainment-video" >Entertainment-Video </Link></li>
                                             <li><Link className="cursor1" className ={this.props.tabIndex =='entertainmenttranscription'?'active':''} to="/entertainment-transcription" >Entertainment-Transcription </Link></li>

                                             <li><Link className="cursor1" className ={this.props.tabIndex =='vocabulary'?'active':''} to="/vocabulary" >Vocabulary </Link></li>

                                        </ul>}


                                    </li>


                                    <li className=  {this.props.tabIndex=="exercise_master"?'active':''}> <Link  className ="cursor1"   to="/exercise-master"><i className="ti-receipt"></i> <span>Exercise master</span></Link></li>
                                    <li className=  {this.props.tabIndex=="exercise_details"?'active':''}> <Link  className ="cursor1"   to="/exercise-details"><i className="ti-receipt"></i> <span>Exercise details</span></Link></li>


                                    {this.props.tabIndex=='4lsystem'?
                                    <li className="active"> <Link  className ="cursor1"   to="/fourlsystem"><i className="ti-receipt"></i> <span>Create a 4L Video</span></Link></li>:
                                    <li> <Link  className ="cursor1"   to="/fourlsystem"  ><i className="ti-receipt"></i> <span>Create a 4L Video</span></Link></li>}

                                    <li>
                                        <a href="javascript:void(0)" aria-expanded="true"  onClick={this.toggleaboutLangistan}><i className="ti-layout-sidebar-left"></i><span>About Langistan</span></a>
                                            <ul className="collapse">
                                            <li><a href="">Country</a></li>
                                            <li><a href="">Time</a></li>
                                        </ul>

                                        {(this.state.aboutShown || this.props.shown=="teamtutor") && <ul>
                                             <li><Link className="cursor1" className ={this.props.tabIndex =='team'?'active':''} to="/team" >Team </Link></li>
                                             <li><Link className="cursor1" className ={this.props.tabIndex =='tutor'?'active':''} to="/tutor" >Tutor </Link></li>


                                        </ul>}

                                    </li>

                                    <li>
                                        <a href="javascript:void(0)" aria-expanded="true"  onClick={this.togglMiscelllenues}><i className="ti-layout-sidebar-left"></i><span>Miscellaneous</span></a>
                                            <ul className="collapse">
                                            <li><a href="">Country</a></li>
                                            <li><a href="">Time</a></li>
                                        </ul>

                                        {(this.state.Miscelleneusshown || this.props.shown=="countrytime") && <ul>
                                             <li><Link className="cursor1" className ={this.props.tabIndex =='country'?'active':''} to="/country" >Country </Link></li>
                                             <li><Link className="cursor1" className ={this.props.tabIndex =='time'?'active':''} to="/time" >Time </Link></li>

                                        </ul>}

                                    </li>
                                     */}


                                    {/* {this.props.tabIndex=='userlist'?
                                    <li className="active"> <Link  className ="cursor1"   to="/user-list"  ><i className="ti-receipt"></i> <span>Users</span></Link></li>:
                                    <li> <Link  className ="cursor1"   to="/user-list"  ><i className="ti-receipt"></i> <span>Users</span></Link></li>}
                                      {this.props.tabIndex=='usersubscription'?
                                    <li className="active"> <Link  className ="cursor1"   to="/usersubscription"  ><i className="ti-hand-point-up"></i> <span>Subscription</span></Link></li>:
                                    <li> <Link  className ="cursor1"   to="/usersubscription"  ><i className="ti-hand-point-up"></i> <span>Subscription</span></Link></li>}
                                     {this.props.tabIndex=='userquestion'?
                                    <li className="active"> <Link  className ="cursor1"   to="/userquestionlist"  ><i className="ti-help"></i> <span>User Reporting</span></Link></li>:
                                    <li> <Link  className ="cursor1"   to="/userquestionlist"  ><i className="ti-help"></i> <span>User Reporting</span></Link></li>}
                                     {this.props.tabIndex=='usercomment'?
                                    <li className="active"> <Link  className ="cursor1"   to="/usercommentlist"  ><i className="ti-comment"></i> <span>User Comment</span></Link></li>:
                                    <li> <Link  className ="cursor1"   to="/usercommentlist"  ><i className="ti-comment"></i> <span>User Comment</span></Link></li>}
                                     {this.props.tabIndex=='tutorenquiry'?
                                    <li className="active"> <Link  className ="cursor1"   to="/tutor-enquiry"  ><i className="ti-comment"></i> <span>Tutor Enquiry</span></Link></li>:
                                    <li> <Link  className ="cursor1"   to="/tutor-enquiry"  ><i className="ti-comment"></i> <span>Tutor Enquiry</span></Link></li>}
                                    <li> <Link  className ="cursor1"   to="/sitesetting"  ><i className="ti-comment"></i> <span>Site Setting</span></Link></li> */}

                                    <li><Link  onClick={this.Logout}><i className="ti-control-skip-backward"></i> <span  >Sign Out</span></Link></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
                {/* <div className="main-content"> */}
                    {/* <div className="header-area">
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
                    </div> */}


                    {/* <div className="page-title-area">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <div className="breadcrumbs-area clearfix">
                                    <h4 className="page-title pull-left">Dashboard</h4>
                                    <ul className="breadcrumbs pull-left">
                                        <li><a href="index.html">Home</a></li>
                                        <li><span>Dashboard</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="main-content-inner">
                       <div className="sales-report-area mt-5 mb-5">
                        <div className="row">	 */}

                        {/* <div className="col-xl-3 col-lg-6 m-b-10">
                        <Link  className ="cursor1"  to="">
                            <div className="card card-inverse card-success">
                            <div className="card-block bg-success p-10">
                                <div className="rotate">
                                <i className="fa fa-user fa-5x"></i>
                                </div>
                                <h6 className="text-uppercase">Users</h6>
                                <h1 className="display-1">134</h1>
                            </div>
                            </div>
                            </Link>
                        </div>
                  */}


                {/* <div className="col-xl-3 col-lg-6 m-b-10">
                <Link  className ="cursor1"  to="dashboard1">
                    <div className="card card-inverse card-danger">
                    <div className="card-block bg-danger p-10">
                        <div className="rotate">
                        <i className="fa fa-list fa-4x"></i>
                        </div>
                          <h6 className="text-uppercase">Country List</h6>
                        <h1 className="display-1">87</h1>
                    </div>
                    </div>
                    </Link>
                </div> */}


                {/* <div className="col-xl-3 col-lg-6 m-b-10">
                <Link  className ="cursor1"  to="">
                    <div className="card card-inverse card-info">
                    <div className="card-block bg-info p-10">
                        <div className="rotate">
                        <i className="fa fa-twitter fa-5x"></i>
                        </div>
                        <h6 className="text-uppercase">Tweets</h6>
                        <h1 className="display-1">125</h1>
                    </div>
                    </div>
                    </Link>
                </div> */}
                {/* <div className="col-xl-3 col-lg-6 m-b-10">
                <Link  className ="cursor1"  to="">
                    <div className="card card-inverse card-warning">
                    <div className="card-block bg-warning p-10">
                        <div className="rotate">
                        <i className="fa fa-share fa-5x"></i>
                        </div>
                        <h6 className="text-uppercase">Shares</h6>
                        <h1 className="display-1">36</h1>
                    </div>
                    </div>
                    </Link>
                </div> */}

                        {/* </div>
                        </div>
                    </div> */}
                {/* </div> */}
                {/* <footer>
                    <div className="footer-area">
                        <p>© Copyright 2019. All right reserved.</p>
                    </div>
                </footer> */}

            <div className="offset-area">
                <div className="offset-close"><i className="ti-close"></i></div>
                    <ul className="nav offset-menu-tab">
                        <li><a className="active" data-toggle="tab" href="#activity">Activity</a></li>
                        <li><a data-toggle="tab" href="#settings">Settings</a></li>
                    </ul>
                    <div className="offset-content tab-content">
                        <div id="activity" className="tab-pane fade in show active">
                            <div className="recent-activity">
                                <div className="timeline-task">
                                    <div className="icon bg1">
                                        <i className="fa fa-envelope"></i>
                                    </div>
                                    <div className="tm-title">
                                        <h4>Rashed sent you an email</h4>
                                        <span className="time"><i className="ti-time"></i>09:35</span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
                                    </p>
                                </div>
                                <div className="timeline-task">
                                    <div className="icon bg2">
                                        <i className="fa fa-check"></i>
                                    </div>
                                    <div className="tm-title">
                                        <h4>Added</h4>
                                        <span className="time"><i className="ti-time"></i>7 Minutes Ago</span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur.
                                    </p>
                                </div>
                                <div className="timeline-task">
                                    <div className="icon bg2">
                                        <i className="fa fa-exclamation-triangle"></i>
                                    </div>
                                    <div className="tm-title">
                                        <h4>You missed you Password!</h4>
                                        <span className="time"><i className="ti-time"></i>09:20 Am</span>
                                    </div>
                                </div>
                                <div className="timeline-task">
                                    <div className="icon bg3">
                                        <i className="fa fa-bomb"></i>
                                    </div>
                                    <div className="tm-title">
                                        <h4>Member waiting for you Attention</h4>
                                        <span className="time"><i className="ti-time"></i>09:35</span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
                                    </p>
                                </div>
                                <div className="timeline-task">
                                    <div className="icon bg3">
                                        <i className="ti-signal"></i>
                                    </div>
                                    <div className="tm-title">
                                        <h4>You Added Kaji Patha few minutes ago</h4>
                                        <span className="time"><i className="ti-time"></i>01 minutes ago</span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
                                    </p>
                                </div>
                                <div className="timeline-task">
                                    <div className="icon bg1">
                                        <i className="fa fa-envelope"></i>
                                    </div>
                                    <div className="tm-title">
                                        <h4>Ratul Hamba sent you an email</h4>
                                        <span className="time"><i className="ti-time"></i>09:35</span>
                                    </div>
                                    <p>Hello sir , where are you, i am egerly waiting for you.
                                    </p>
                                </div>
                                <div className="timeline-task">
                                    <div className="icon bg2">
                                        <i className="fa fa-exclamation-triangle"></i>
                                    </div>
                                    <div className="tm-title">
                                        <h4>Rashed sent you an email</h4>
                                        <span className="time"><i className="ti-time"></i>09:35</span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
                                    </p>
                                </div>
                                <div className="timeline-task">
                                    <div className="icon bg2">
                                        <i className="fa fa-exclamation-triangle"></i>
                                    </div>
                                    <div className="tm-title">
                                        <h4>Rashed sent you an email</h4>
                                        <span className="time"><i className="ti-time"></i>09:35</span>
                                    </div>
                                </div>
                                <div className="timeline-task">
                                    <div className="icon bg3">
                                        <i className="fa fa-bomb"></i>
                                    </div>
                                    <div className="tm-title">
                                        <h4>Rashed sent you an email</h4>
                                        <span className="time"><i className="ti-time"></i>09:35</span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
                                    </p>
                                </div>
                                <div className="timeline-task">
                                    <div className="icon bg3">
                                        <i className="ti-signal"></i>
                                    </div>
                                    <div className="tm-title">
                                        <h4>Rashed sent you an email</h4>
                                        <span className="time"><i className="ti-time"></i>09:35</span>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse distinctio itaque at.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div id="settings" className="tab-pane fade">
                            <div className="offset-settings">
                                <h4>General Settings</h4>
                                <div className="settings-list">
                                    <div className="s-settings">
                                        <div className="s-sw-title">
                                            <h5>Notifications</h5>
                                            <div className="s-swtich">
                                                <input type="checkbox" id="switch1" />
                                                <label htmlFor="switch1">Toggle</label>
                                            </div>
                                        </div>
                                        <p>Keep it 'On' When you want to get all the notification.</p>
                                    </div>
                                    <div className="s-settings">
                                        <div className="s-sw-title">
                                            <h5>Show recent activity</h5>
                                            <div className="s-swtich">
                                                <input type="checkbox" id="switch2" />
                                                <label htmlFor="switch2">Toggle</label>
                                            </div>
                                        </div>
                                        <p>The for attribute is necessary to bind our custom checkbox with the input.</p>
                                    </div>
                                    <div className="s-settings">
                                        <div className="s-sw-title">
                                            <h5>Show your emails</h5>
                                            <div className="s-swtich">
                                                <input type="checkbox" id="switch3" />
                                                <label htmlFor="switch3">Toggle</label>
                                            </div>
                                        </div>
                                        <p>Show email so that easily find you.</p>
                                    </div>
                                    <div className="s-settings">
                                        <div className="s-sw-title">
                                            <h5>Show Task statistics</h5>
                                            <div className="s-swtich">
                                                <input type="checkbox" id="switch4" />
                                                <label htmlFor="switch4">Toggle</label>
                                            </div>
                                        </div>
                                        <p>The for attribute is necessary to bind our custom checkbox with the input.</p>
                                    </div>
                                    <div className="s-settings">
                                        <div className="s-sw-title">
                                            <h5>Notifications</h5>
                                            <div className="s-swtich">
                                                <input type="checkbox" id="switch5" />
                                                <label htmlFor="switch5">Toggle</label>
                                            </div>
                                        </div>
                                        <p>Use checkboxes when looking for yes or no answers.</p>
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

export default withRouter(SideBar) ;
