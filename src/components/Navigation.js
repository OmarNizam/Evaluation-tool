// src/components/Navigation.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../actions/user/sing-out'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import MemoryIcon from 'material-ui/svg-icons/hardware/memory'
import FlatButton from 'material-ui/FlatButton'

class Navigation extends PureComponent {
  signIn() {
    this.props.push('/sign-in')
  }

  goHome() {
    this.props.push('/')
  }

  render() {
    const { signedIn } = this.props
    return (
      <AppBar
        title="Evaluations tool"
        iconElementLeft={<IconButton onClick={this.goHome.bind(this)}><MemoryIcon /></IconButton>}
        iconElementRight={signedIn ?
          <FlatButton label="Sign Out" onClick={this.props.signOut} /> :
          <FlatButton label="Sign In" onClick={this.signIn.bind(this)} />
        }
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, signOut })(Navigation)
