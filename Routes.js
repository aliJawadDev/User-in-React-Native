import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Main from './Main.js'
import Signup from './Signup.js'

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "main" component = {Main} hideNavBar={true} title = "Main" initial = {true}/>
         <Scene key = "sign" component = {Signup} hideNavBar={true} title = "SignUp" />
      </Scene>
   </Router>
)
export default Routes