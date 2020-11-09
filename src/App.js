import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { hashHistory } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';

import Home  from './component/Home';
import Login from './component/Login';
import Register from './component/Register';
// import Aboutus from './component/Aboutus';
// import Contact from './component/Contact';
// import Profile from './component/Profile';
import Mycources from './component/Mycourses'
// import Privacypolicy from './component/Privacypolicy';
import Footer from './component/Footer';
// import Prices from './component/Prices';
// import Bookatutor from './component/Bookatutor';
// import Termsconditions from './component/Termsconditions';
// import Introduction from './component/Introduction';
// import Profilebookatutor from './component/Profilebookatutor';
// import Country from './component/Country1';
import Dashboard2 from './component/Dashboard2';
import Dashboard from './component/Dashboard';
import User1 from './component/User1';
import SideBar from './component/SideBar';
import Country from './component/Country2';
import Time from './component/Time';
import Language from './component/Language';
import SiteSetting from './component/SiteSetting';

import Team from './component/Team';
import Level from './component/Level';
import ProductPrice from './component/ProductPrice';
import Chapter from './component/Chapter';
import Lesson from './component/Lesson';
import Vocabulary from './component/Vocabulary';
import EntertainmentVideo from './component/EntertainmentVideo';
import Text from './component/Text';
import UserSubscription from './component/UserSubscription';
import UserCommentList from './component/UserCommentList';
import UserQuestionList from './component/UserQuestionList';
import Tutor from './component/Tutor';
import TutorEnquiry from './component/TutorEnquiry';
import FourLSystem from './component/FourLSystem';
import Add4LVideo from './component/Add4LVideo';
import Update4L from './component/Update4L';
import Exercise from './component/Exercise';
import EntertainmentTranscription from './component/EntertainmentTranscription';
import BlogList from './component/BlogList';
import AddBlog from './component/AddBlog';
import IframeWith4L from './component/IframeWith4L';
import ExcerciseNew from './component/ExerciseNew';
import ExerciseDetails from './component/ExerciseDetails';
// new import
import Students from './component/Students';
import Parent from './component/Parent';
import Course from './component/Course';
import Topic from './component/Topic';
import Teachers from './component/Teachers';
import TimeTable from './component/TimeTable';
import School from './component/School';
import Class from './component/Class';
import Notification from './component/Notification';
import ClaassTheme from './component/ClassTheme';
import ChangePassword from './component/ChangePassword';
import LiveClass from './component/LiveClass';
import Assignment from './component/Aassignment';
import StudentAssignment from './component/StudentAssignment';
import Feedback from './component/Feedback';
import UploadVideo from './component/UploadVideo';
import Test from './component/Test';
import Practice from './component/Practice';
import StudentTest from './component/StudentTest';
import StudentExam from './component/StudentExam';
import Exam from './component/Exam';
import StudentExamCalculate from './component/StudentExamCalculate';
import StudentTestCalculate from './component/StudentTestCalculate';
import Grade from './component/Grade';
import ExamMaster from './component/ExamMaster';
import ExamResultTeacher from './component/ExamResultTeacher';
import ExamResultSchool from './component/ExamResultSchool';
import ExamResultEdit from './component/ExamResultEdit';
import TestResult from './component/TestResult';
import TestResultEdit from './component/TestResultEdit';
import PracticeQuestions from './component/PracticeQuestions';
import Notes from './component/Notes';
import Holiday from './component/Holiday';
import InsertAttendance from './component/InsertAttendance';
import Attendance from './component/Attendance';
import Enquiry from './component/Enquiry';
import InsertEnquiry from './component/InsertEnquiry';
import NewStudent from './component/NewStudent';
import InsertNewStudent from './component/InsertNewStudent';
import Section from './component/Section';
import Session from './component/Session';
import Caste from './component/Caste';
import Religion from './component/Religion';
import FeeType from './component/FeeType';
import FeesStructure from './component/FeesStructure';
import FeesStructureDetail from './component/FeesStructureDetail';

class App extends React.Component {
render() {
  return (
      // <HashRouter history={ hashHistory }>
      <HashRouter>
        <ToastContainer hideProgressBar ={true}/>
        <Switch>
          <Route path="/" exact={true} component={ Login } />
          <Route path="/login" exact={true} component={Login} />
          {/* <Route path="/register" exact={true} component={Register} /> */}
          {/* <Route path="/aboutus" exact={true} component={Aboutus} /> */}
          {/* <Route path="/contact" exact={true} component={Contact} /> */}
          {/* <Route path="/profile" exact={true} component={Profile} /> */}
          {/* <Route path="/mycourses" exact={true} component={Mycources} /> */}
          {/* <Route path="/privacypolicy" exact={true} component={Privacypolicy} /> */}
          <Route path="/footer" exact={true} component={ Footer } />
          <Route path="/uploadvideo" exact={true} component={ UploadVideo } />
          <Route path="/test" exact={true} component={ Test } />
          <Route path="/student-test/:id1/:id2" exact={true} component={ StudentTest } />
          <Route path="/practice" exact={true} component={ Practice } />
          <Route path="/exam" exact={true} component={ Exam } />
          <Route path="/student-exam/:id1/calculate/:id1/:id2/:id3" exact={true} component={ StudentExamCalculate } />
          <Route path="/student-test/:id1/calculate/:id1/:id2/:id3" exact={true} component={ StudentTestCalculate } />
          <Route path="/student-exam/:id1/:id2" exact={true} component={ StudentExam } />
          <Route path="/grade" exact={true} component={ Grade } />
          <Route path="/exam-master" exact={true} component={ ExamMaster } />
          <Route path="/exam-result-teacher" exact={true} component={ ExamResultTeacher } />
          <Route path="/exam-result-school" exact={true} component={ ExamResultSchool } />
          <Route path="/exam-result-edit/:id" exact={true} component={ ExamResultEdit } />
          <Route path="/test-result" exact={true} component={ TestResult } />
          <Route path="/test-result-edit/:id" exact={true} component={ TestResultEdit } />
          <Route path="/practice-questions/:id" exact={true} component={ PracticeQuestions } />
          <Route path="/notes" exact={true} component={ Notes } />
          <Route path="/holiday" exact={true} component={ Holiday } />
          <Route path="/attendance/:id" exact={true} component={ InsertAttendance } />
          <Route path="/attendance" exact={true} component={ Attendance } />
          <Route path="/enquiry/:id" exact={true} component= { InsertEnquiry } />
          <Route path="/enquiry" exact={true} component= { Enquiry } />
          <Route path="/students" exact={true} component= { NewStudent } />
          <Route path="/students/:id" exact={true} component= { InsertNewStudent } />
          <Route path="/section" exact={true} component= { Section } />
          <Route path="/caste" exact={true} component= { Caste } />
          <Route path="/religion" exact={true} component= { Religion } />
          <Route path="/feetype" exact={true} component= { FeeType } />
          <Route path="/feestructure" exact={true} component= { FeesStructure } />
          <Route path="/feestructuredetail" exact={true} component= { FeesStructureDetail } />
          <Route path="/session" exact={true} component= { Session } />
          {/* <Route path="/prices" exact={true} component={ Prices } /> */}
          {/* <Route path="/bookatutor" exact={true} component={ Bookatutor } /> */}
          {/* <Route path="/termsconditions" exact={true} component={ Termsconditions } /> */}
          {/* <Route path="/introduction" exact={true} component={ Introduction } /> */}
          {/* <Route path="/profilebookatutor" exact={true} component={ Profilebookatutor } /> */}
          {/* <Route path="/country" exact={true} component={ Country } />
          <Route path="/dashboard1" exact={true} component={ Dashboard2 } />
          <Route path="/user" exact={true} component={ User1 } />
          <Route path="/user-list" exact={true} component={ User1 } />
          <Route path="/side-bar" exact={true} component={ SideBar } />
          <Route path="/time" exact={true} component={ Time } />
          <Route path="/language" exact={true} component={ Language } />
          <Route path="/sitesetting" exact={true} component={ SiteSetting } /> */}





          {/* <Route path="/team" exact={true} component={ Team } />
          <Route path="/hour-challenges" exact={true} component={ Level } />
          <Route path ="/price"exact={true} component ={ProductPrice}></Route>
          <Route path = "/chapter" exact ={true}  component ={Chapter}></Route>
          <Route path = "/lesson" exact ={true}  component ={Lesson}></Route>
          <Route path = "/vocabulary" exact ={true}  component ={Vocabulary}></Route>
          <Route path = "/entertainment-video" exact ={true}  component ={EntertainmentVideo}></Route>
          <Route path = "/text" exact ={true}  component ={Text}></Route>
          <Route path = "/usersubscription" exact ={true}  component ={UserSubscription}></Route>
          <Route path = "/usercommentlist" exact ={true}  component ={UserCommentList}></Route>
          <Route path = "/userquestionlist" exact ={true}  component ={UserQuestionList}></Route>
          <Route path = "/tutor" exact ={true}  component ={Tutor}></Route>
          <Route path = "/tutor-enquiry" exact ={true}  component ={TutorEnquiry}></Route>
          <Route path = "/fourlsystem" exact ={true}  component ={FourLSystem}></Route>
          <Route path = "/add-4L-video" exact ={true}  component ={Add4LVideo}></Route>
          <Route path = "/blog-list" exact ={true}  component ={BlogList}></Route>
          <Route path = "/add-blog" exact ={true}  component ={AddBlog}></Route>
          <Route path = "/add-blog" exact ={true}  component ={AddBlog}></Route>
          <Route path = "/update-4L-video/:video_id" exact ={true}  component ={Update4L}></Route>
          <Route path = "/iframe-with-4L/:videoId" exact ={true}  component ={IframeWith4L}></Route>
          <Route path = "/exercise" exact ={true}  component ={Exercise}></Route>
          <Route path = "/entertainment-transcription" exact ={true}  component ={EntertainmentTranscription}></Route>
          <Route path = "/exercise-master" exact ={true}  component ={ExcerciseNew}></Route>
          <Route path = "/exercise-details" exact ={true}  component ={ExerciseDetails}></Route> */}

      <Route path="/dashboard" exact={true} component={ Dashboard } />
          <Route path="/users" exact={true} component={ Students } />
          <Route path="/student/:id" exact={true} component={ Students } />
          <Route path="/parents" exact={true} component={ Parent } />
          <Route path="/course" exact={true} component={ Course } />
          <Route path="/chapter" exact={true} component={ Chapter } />
          <Route path="/topic" exact={true} component={ Topic } />
          <Route path="/teachers" exact={true} component={ Teachers } />
          <Route path="/time-table" exact={true} component={ TimeTable } />
          <Route path="/school" exact={true} component={ School } />
          <Route path="/class" exact={true} component={ Class } />
          <Route path="/notification" exact={true} component={ Notification } />
          <Route path="/class-theme" exact={true} component={ ClaassTheme } />
          <Route path="/change-password" exact={true} component={ ChangePassword } />
          <Route path="/live-class" exact={true} component={ LiveClass } />
          <Route path="/assignment" exact={true} component={ Assignment } />
          <Route path="/student-assignment/:id" exact={true} component={ StudentAssignment } />
          <Route path="/feedback" exact={true} component={ Feedback } />





        </Switch>
      </HashRouter>
    );
  }
}
export default App;
