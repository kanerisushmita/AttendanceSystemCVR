import StudentLogin from "./login/StudentLogin"
import ProfessorLogin from "./login/ProfessorLogin"
import StudentSignup from "./register/StudentSignup"
import ProfessorSignup from "./register/ProfessorRegistration"
import SubjectClass from "./register/SubjectClass"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentDashboard from './dashboards/StudentDashboard'
import ProfessorDashboard from './dashboards/ProfessorDashboard'
import Home from './Home'
import AuthenticateRoute from './helper/AuthenticateRoute'
import ViewAttendance from "./components/viewAttendance"
import ShowAttendance from "./components/showAttendance"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfessorSignup />}></Route>
        <Route path="/studentregistration" element={<StudentSignup />}></Route>
        <Route path="/professorregistration" element={<ProfessorSignup />}></Route>
        <Route path="/studentlogin" element={<StudentLogin />}></Route>
        <Route path="/professorlogin" element={<ProfessorLogin />}></Route>
        <Route
          path="/viewAttendance" element={<ViewAttendance />} //send Role parameter as desired access control role
        />
        <Route
          path="/showAttendance" element={<ShowAttendance />} //send Role parameter as desired access control role
        />
        <Route
          path="/attendance"
          exact
          element={<AuthenticateRoute Element={StudentDashboard} Role={"student"} endpoint={"studentlogin"} />} //send Role parameter as desired access control role
        />
        <Route
          path="/professordashboard"
          exact
          element={<AuthenticateRoute Element={ProfessorDashboard} Role={"professor"} endpoint={"professorlogin"} />} //send Role parameter as desired access control role
        />
        <Route
          path="/createsubjectclass"
          exact
          element={<AuthenticateRoute Element={SubjectClass} Role={"professor"} endpoint={"professorlogin"} />} //send Role parameter as desired access control role
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
