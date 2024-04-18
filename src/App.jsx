import { Button, Modal } from 'react-bootstrap'
import './App.css'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllStudentsAPI, studentRegistrationAPI } from './services/AllApi';


function App() {
  const [inputs, setInputs] = useState({
    fullname: "", address: "", mobile: "", email: "", gender: "", dob: "", course: ""
  })

  // get all students
  const [studentData, setStudentData] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setInputs({ fullname: "", address: "", mobile: "", email: "", gender: "", dob: "", course: "" })
  }
  const handleShow = () => setShow(true);

  // validation fields logic
  const validateFullName = (fullname) => {
    return fullname.trim() !== ''
  }
  const validateAddress = (address) => {
    return address.trim() !== ''
  }
  const validateMobile = (mobile) => {
    return mobile.length <= 10;
  }
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }
  const validateGender = (gender) => {
    return gender.trim() !== ''
  }
  const validateDob = (dob) => {
    return dob.trim() !== ''
  }
  const validateCourse = (course) => {
    return course.trim() !== ''
  }

  // student registration
  const handleStudentRegistration = async (e) => {
    e.preventDefault()
    const { fullname, address, mobile, email, gender, dob, course } = inputs
    if (validateFullName(fullname) && validateAddress(address) && validateMobile(mobile) &&
      validateEmail(email) && validateGender(gender) && validateDob(dob) && validateCourse(course)) {
      // api call

      try {
        const result = await studentRegistrationAPI(inputs)
        console.log(result);
        if (result.status == 200) {
          toast.success('Successfully Registered')
          setInputs({ fullname: "", address: "", mobile: "", email: "", gender: "", dob: "", course: "" })
          handleClose()
          getAllStudents()
        }
        else {
          toast.error(result.response.data)
        }

      } catch (err) {
        console.log(err);
      }

    } else {
      toast.warning('Fill the form')
    }

  }
  console.log(inputs);

  // get all student data
  const getAllStudents = async () => {
    const result = await getAllStudentsAPI()
    if (result.status == 200) {
      setStudentData(result.data)
    }
  }

  useEffect(() => {
    getAllStudents()
  }, [])

  console.log(studentData);



  return (
    <>
      <div className='bg'>
        <div className='row'>
          <div className="col-lg-6">
            <div className=' container ms-5 mt-5 p-5'>
              <h2><b>EDUCATION</b></h2>
              <p className='mt-3'>Education is about learning skills and knowledge. It also means helping people to learn how to do things and support them to think about what they learn. It is also important for educators to teach ways to find and use information. Education needs research to find out how to make it better.</p>
              <button onClick={handleShow} className='btn btn-danger rounded mt-5'>Register</button>
            </div>
          </div>
          <div className="col-lg-6 p-5">
            <img width={"100%"} src="https://static.vecteezy.com/system/resources/previews/011/381/950/original/young-male-student-writing-on-sheet-of-paper-3d-character-illustration-png.png" alt="" />
          </div>
        </div>
        <Modal size='lg' centered
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title> Student Deatiles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-5">
                <label>
                  <img className='img-fluid mt-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPEBXUIU5ObLSPTSzTKUSPCYS91GaEdwRRDbJbxH9SkA&s" alt="" />
                </label>

              </div>
              <div className="col-lg-7 py-3">
                <div className='mb-3'>
                  <input value={inputs.company_name}
                    onChange={e => setInputs({ ...inputs, fullname: e.target.value })} type="text" className='form-control' placeholder='Name' />
                </div>
                <div className='mb-3'>
                  <input value={inputs.address}
                    onChange={e => setInputs({ ...inputs, address: e.target.value })} type="text" className='form-control' placeholder='Address' />
                </div>
                <div className='mb-3'>
                  <input value={inputs.mobile}
                    onChange={e => setInputs({ ...inputs, mobile: e.target.value })} type="text" className='form-control' placeholder='Mobile No' />
                </div>
                <div className='mb-3'>
                  <input value={inputs.email}
                    onChange={e => setInputs({ ...inputs, email: e.target.value })} type="email" className='form-control' placeholder='Email' />
                </div>
                <div className='mb-3'>
                  <input value={inputs.gender}
                    onChange={e => setInputs({ ...inputs, gender: e.target.value })} type="text" className='form-control' placeholder='Gender' />
                </div>
                <div className='mb-3'>
                  <input value={inputs.dob}
                    onChange={e => setInputs({ ...inputs, dob: e.target.value })} type="text" className='form-control' placeholder='date of birth' />
                </div>
                <div className='mb-3'>
                  <select className='form-control text-balck'
                    name="course" id="course" value={inputs.course} onChange={e => setInputs({ ...inputs, course: e.target.value })}  >
                    <option>Select a Course</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Humanities">Humanities</option>
                  </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleStudentRegistration} variant="primary">Register</Button>
          </Modal.Footer>
        </Modal>
        <div className='container' >
          <table className='table shadow mt-5'>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Mobile no</th>
                <th>Email</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Course</th>
              </tr>
            </thead>

            <tbody>
              {
                studentData?.length > 0 && studentData?.map((students, index) => (
                  <tr key={students}>
                    <td>{index + 1}</td>
                    <td>{students.fullname}</td>
                    <td>{students.address}</td>
                    <td>{students.mobile}</td>
                    <td>{students.email}</td>
                    <td>{students.gender}</td>
                    <td>{students.dob}</td>
                    <td>{students.course}</td>
                  </tr>
                ))

              }
            </tbody>
          </table>
        </div>

        <ToastContainer position='top-center' theme='colored' autoClose={3000} />

      </div>

    </>
  )
}

export default App
