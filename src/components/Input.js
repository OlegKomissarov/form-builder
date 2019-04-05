import React, { Component } from 'react'

class Button extends Component {
  state = { value: this.props.value }
  inputHandler = e => this.setState({value: e.target.value})
  render() {
    const { id, placeholder, className } = this.props
    return (
      <input onChange={this.inputHandler}
             value={this.state.value}
             id={id}
             placeholder={placeholder}
             className={`input${className ? ' ' + className : ''}`}
      />
    )
  }
}

export default Button
