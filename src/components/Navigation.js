// src/components/Navigation.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../actions/user/sing-out.js'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

class Navigation extends PureComponent {
  signIn() {
    this.props.push('/sign-in')
  }

  goHome() {
    this.props.push('/')
  }

  signedOut() {
    this.props.signOut()
    this.props.push('/sign-in')
  }


  render() {
    const { signedIn } = this.props
    const styles = { title: { cursor: 'pointer' }}
    return (
      <AppBar
        title={<span style={styles.title}>Student Evaluations</span>}
        showMenuIconButton={false}
        onTitleTouchTap={this.goHome.bind(this)}
        iconElementRight={signedIn ?
          <FlatButton label="Sign Out" onClick={this.signedOut.bind(this)} /> :
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
