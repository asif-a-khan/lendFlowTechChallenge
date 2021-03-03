import { useState, useEffect } from 'react'
import axios from 'axios';
import './sass//App.scss';
import Students from './components/Students/Students';

// Steps 1-5 completed and tested.
const App = () => {
  // The state that will be acting as a default reference when the user filters through the list.
  const [studentData, setStudentData] = useState([])
  // Will be filtering through this state. Using studentData as a reference so that when the user stops searching the default list shows up.
  const [filteredStudents, setFilteredStudents] = useState([])

  const [nameField, setNameField] = useState('')
  const [tagField, setTagField] = useState('')

  // On page load, fetch the data. 
  // Add a tags property to each student.
  // Set studentData and filteredStudents to the new array.
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://api.hatchways.io/assessment/students'
    })
    .then(res => {
      const newStudentData = res.data.students.map(student => {
        student.tags = []
        return student
      })
      setStudentData(newStudentData)
      setFilteredStudents(newStudentData)
    })
  }, [])
  
  // When the user types in the name field, change the state for the name field and filter through filteredStudents to check if the names match the user's input.
  const handleChange = (e) => {
    setNameField(e.target.value)
    setFilteredStudents(studentData.filter(student => student.firstName.toLowerCase().includes(nameField.toLowerCase()) || student.lastName.toLowerCase().includes(nameField.toLowerCase())  ))
  }

  // When the user types a tag name, check the tags property on each student to see if it contains the user's input. Case insensitive.
  const handleChangeTag = (e) => {
    setTagField(e.target.value)
    if (e.target.value === '') {
      setFilteredStudents(studentData)
    } else {
      setFilteredStudents(studentData.filter(student => student.tags.includes(e.target.value.toLowerCase()) ))
    }
  }

  return (
    <div className='App'>
      <main className="mainWrap">
        <section className="searchBoxes">
          <input placeholder='Search by name' className='nameSearch' type="search" value={nameField} onChange={handleChange} />
          <input placeholder='Search by tag' className='nameSearch' type="search" value={tagField} onChange={handleChangeTag} />
        </section>
        {
          filteredStudents.map((student, index) => (
            <Students
              key={student.id}
              index={index}
              firstName={student.firstName}
              lastName={student.lastName}
              email={student.email}
              company={student.company}
              skill={student.skill}
              grades={student.grades}
              pic={student.pic}
              mutableStudentData={studentData}
              setStudentData={setStudentData}
              setFilteredStudents={setFilteredStudents}
              createdTags={student.tags}
            />
          ))
        }
      </main>
    </div>
  )
}

export default App

