/* eslint-disable no-useless-constructor */
import React from 'react'
import UserClass from './UserClass';


class About extends React.Component {
  
  constructor(props){
    super(props);
  // console.log("Parent Constructor");
  }

  componentDidMount() {
    // console.log("Parent Component DidMount");
}

  render () {
    // console.log("Parent Render");
    return (
      <div>
          <h1>About</h1>
          <h2>This is Namaste React Web Series.</h2>
          <UserClass  name = {"Tina Murmu (class)"} location={"Gwalior(class)"}/>
      </div>
  
    )
  }
}
export default About;



// const About = () => {
//   return (
//     <div>
//         <h1>About</h1>
//         <h2>This is Namaste React Web Series.</h2>
//         <UserClass  name = {"Tina Murmu (class)"} location={"Gwalior(class)"}/>
//     </div>

//   )
// }