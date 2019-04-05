import React, { Component } from 'react'

class Button extends Component {
  render() {
    const { id, text, white, className, onClick } = this.props
    return (
      <div onClick={onClick}
           id={id}
           className={`button${white ? ' button--white' : ''}${className ? ' ' + className : ''}`}
      >
        {text}
      </div>
    )
  }
}

export default Button
