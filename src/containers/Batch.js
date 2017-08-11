// src/containers/Batch.js

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import fetchBatches from '../actions/batches/fetch'
import getBatch from '../actions/batches/get'
import subscribeToBatches from '../actions/batches/subscribe'
import StudentItem from './StudentItem'
import RaisedButton from 'material-ui/RaisedButton'
import Title from '../components/Title'
import { Link } from 'react-router'
import './Batch.css'

export class Batch extends PureComponent {
  static propTypes = {
    _id: PropTypes.string,
    title: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    students: PropTypes.array,
  }

  componentWillMount() {
    const { batch,
    fetchBatches,
    getBatch,
    subscribed,
    subscribeToBatches
  } = this.props
  const { batchId } = this.props.params
  if (!batch) fetchBatches()
  getBatch(batchId)
  if (!subscribed) subscribeToBatches()

 }
 renderStudent(student, index) {
    return <StudentItem key={index} { ...student } />
  }
 randomStudent(event) {
   const green = "#70C67A"
   const yellow = "#FBD40B"
   const red = "#DE5454"
   const {students} = this.props
   const {batchId} = this.props.params

   // get student randomly depending on alo
   // get the students that they have the same color using filter array in away to rech the the correct index for the evaluations
   const greenStudents = students.filter((student) => (student.evaluations[student.evaluations.length-1].color === green))
   const yellowStudents = students.filter((student) => (student.evaluations[student.evaluations.length-1].color === yellow))
   const redStudents = students.filter((student) => (student.evaluations[student.evaluations.length-1].color === red))

   // generate random array of 100 element
   const rando = function(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min
   }

   const generateSizedList = function(list, size) {
     // init value is an empty array
     let sized_list = []
     // Loop over size
     for (let i = 0; i < size.length; i++) {
       // make the size of the lis 100 elements
       let multiples = size[i] * 100
       // loop over the list
       for (let j = 0; j < multiples; j++) {
         // push the new element to the sized_list
         sized_list.push(list[i])
       }
     }
     return sized_list
   }
   // get all students by coller and put then in array
   const list = [...greenStudents, ...yellowStudents, ...redStudents]
   // give the array weight it is mean 17% Green & 33% yellow & 50% Red
   const size = [0.17, 0.33, 0.5]
   // generate the list using generateSizedList
   const sized_list = generateSizedList(list, size)
   // Random the sized_list using the rando func and min=0 , max=sized_list.length-1 as index
   const randomNum = rando(0, sized_list.length-1)
   // we will use the Random NUm as index for the student to find it in the sized_list array
   const randomStudentId = sized_list[randomNum]._id
   // push the random student path using randomStudentId
   this.props.push(`/batches/${batchId}/students/${randomStudentId}`)

 }
  //  const { batchId } = this.props.params
  //  const {students} = this.props
  //  // do random on students array * by the array length
  //  const randomStudent = students[Math.floor(Math.random() * students.length)]
  //  // and the id result of the random func give it as index for the next student
  //  const randomStudentIndex = randomStudent._id
  //  console.log(this.props.currentStudents)
  //  // this.props.push(`/batches/${batchId}/students/${randomStudentIndex}`)

  // after gave the array size a static percentage for evaluated students
  percentageStudents(event){
    const green = "#70C67A"
    const yellow = "#FBD40B"
    const red = "#DE5454"
    const {students} = this.props
    console.log(students)

    // Get all the students final evaluations
    //map the student array depending on students evaluations length
    const finalEvaluation = students.map(student => student.evaluations[student.evaluations.length-1])
    console.log(finalEvaluation)
    // filtering the final evaluation array to get the colored student + the students without evaluation too
    const grayStudents = finalEvaluation.filter((evaluation) => (evaluation.color === "gray"))
    const greenStudents = finalEvaluation.filter((evaluation) => (evaluation.color === green))
    const yellowStudents = finalEvaluation.filter((evaluation) => (evaluation.color === yellow))
    const redStudents = finalEvaluation.filter((evaluation) => (evaluation.color === red))
    // get the percentage = (coloredStudent / students)*100 = value %
    const grayPercentage = (grayStudents.length / students.length) * 100
    const greenPercentage = (greenStudents.length / students.length) * 100
    const yellowPercentage = (yellowStudents.length / students.length) * 100
    const redPercentage = (redStudents.length / students.length) * 100
    console.log(yellowPercentage, greenPercentage, redPercentage, grayPercentage)
  }





  render() {
    const {
      _id,
      title,
      //startDate,
      //endDate,
      students,
    } = this.props


    if (!_id) return null


    const green = "#70C67A"
    const yellow = "#FBD40B"
    const red = "#DE5454"
    const { batchId } = this.props.params
    // same as before I will refactor it later
    const finalEvaluation = students.map(student => student.evaluations[student.evaluations.length-1])
    // console.log(finalEvaluation)
    // get the colored students including dtudents without evaluation
    const grayStudents = finalEvaluation.filter((evaluation) => (evaluation.color === "gray"))
    const greenStudents = finalEvaluation.filter((evaluation) => (evaluation.color === green))
    const yellowStudents = finalEvaluation.filter((evaluation) => (evaluation.color === yellow))
    const redStudents = finalEvaluation.filter((evaluation) => (evaluation.color === red))
    // get the percentage of each color students
    const greenPercentage = (greenStudents.length / students.length) * 100
    const yellowPercentage = (yellowStudents.length / students.length) * 100
    const redPercentage = (redStudents.length / students.length) * 100
    return(
      <article className="batch">
        <header>
          <Link to={'/batches/' + batchId + '/create-student'}>
            <RaisedButton
              label="Create Student"
              secondary={true}
              fullWidth={true} />
          </Link>
          <Title content={ title } />
          <div style={{margin: "5px"}}>
            <RaisedButton
                label="Random Student"
                primary={true}
                onClick={()=>this.randomStudent()} />
              <div className="percentage">
                <div className="percentage-students" style={{ backgroundColor: "#DE5454" }}>{redPercentage}%</div>
                <div className="percentage-students" style={{ backgroundColor: "#FBD40B" }}>{yellowPercentage}%</div>
                <div className="percentage-students" style={{ backgroundColor: "#70C67A" }}>{greenPercentage}%</div>
              </div>
          </div>
        </header>
        <main>
          <div className="students">
            {students.map(this.renderStudent)}
          </div>
        </main>

      </article>
    )
  }
}
const mapStateToProps = ({ batches, subscriptions, currentStudents }, {params }) => {
  const batch = batches.reduce((prev, next) => {
    if (next._id === params.batchId) {
      return next
    }
    return prev
  }, {})

  return {
    ...batch,
    batches,
    currentStudents,
    subscribed: subscriptions.includes('batches'),
  }
}

export default connect(mapStateToProps, {
  fetchBatches,
  subscribeToBatches,
  push,
  getBatch,
})(Batch)
