// src/components/Navigation.js
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../actions/user/sing-out'
import AppBar from 'material-ui/AppBar'
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
    const styles = { title: { cursor: 'pointer' }}
    return (
      <AppBar
        title={<span style={styles.title}>Evaluations Tool</span>}
        showMenuIconButton={false}
        onTitleTouchTap={this.goHome.bind(this)}
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
