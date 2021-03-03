import { useState } from 'react'
import { IconButton } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const Students = ({ index, firstName, lastName, email, company, skill, grades, pic, mutableStudentData, setStudentData, setFilteredStudents, createdTags }) => {
  // If the icon is clicked, display the test scores. If, not then hide it.
  const [isClicked, setIsClicked] = useState(false)
  // The state for the input where the user types a tag. Will change as the user types.
  const [tagField, setTagField] = useState('')
  // The state to contain the tags the user has created upon pressing enter.
  const [tags, setTags] = useState([])

  // I chose to push the tags here first so that I don't mutate state directly.
  let pushTagsHere = []

  // These are to calculate the averages of the grades.
  const getTotal = grades.reduce((a, b) => parseInt(a) + parseInt(b), 0)
  const getAvg = getTotal / grades.length

  // When the user presses enter. 
    // Prevent refresh. 
    // Push the tag into pushTagsHere. 
    // Set the local state for tags equal to pushTagsHere.
    // Go into a copy of studentData. Find the selected student and push the user's tag into the selected student's tags property.
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      pushTagsHere.push(tagField)
      setTags(pushTagsHere)
      // Change the tags in the copy of studentData
      mutableStudentData[index].tags.push(tagField.toLowerCase())
      // Update studentData so that it contains the new tags
      setStudentData(mutableStudentData)
      setFilteredStudents(mutableStudentData)
    }
  }

  return (
    <section className="Students">
      <section className="displayPicContainer">
        <figure>
          <img src={pic} alt="How the student avatar looks"/>
        </figure>
      </section>
      <section className="studentInfoContainer">
        <h2>{firstName + ' ' + lastName}</h2>
        <ul>
          <li><p>Email: {email}</p></li>
          <li><p>Company: {company}</p></li>
          <li><p>Skill: {skill}</p></li>
          <li><p>Average: {getAvg}%</p></li>
          {
            isClicked ?
            <li>
              {grades.map((grade, index) => (
                <p key={index}>Test {index +1}: {grade}%</p>
              ))}
            </li> :
            null
          }
          <li className='tags'>
            {/* If any tags have been created. Reference studentData which is named 'createdTags' in this component, to map through the tags*/}
            {
              createdTags ?
              createdTags.map((tag, index) => (
                <p key={index}>{tag}</p>
              )) :
              null
            }
          </li>
          <li>
            <input className='createTag' placeholder='Press enter to add tag' type="text" value={tagField} onChange={e => setTagField(e.target.value)} onKeyDown={handleKeyDown} />
          </li>
        </ul>
      </section>
      <IconButton onClick={() => setIsClicked(!isClicked)} className='icons'>
        {
          isClicked ? <RemoveIcon /> : <AddIcon />
        }
      </IconButton>
    </section>
  )
}

export default Students
