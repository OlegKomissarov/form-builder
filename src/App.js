import React, { Component } from 'react'
import './style/main.scss'

import Button from './components/Button'
import Input from './components/Input'

class App extends Component {
  state = {
    formArray: [],
    druggingElementName: null
  }
  elements = {
    button: <Button text="Button"/>,
    input: <Input value="Input" placeholder="input text..."/>
  }
  getElement(name) {
    return this.elements[name]
  }
  componentDidMount() {
    let templates = document.getElementById('templates')
    for (let key in templates.children) {
      templates.children.item(key).onmousedown = e => this.startDruggingElement(e, templates.children.item(key))
    }
  }
  addElementToForm = () => {
    if (this.state.druggingElementName) {
      this.setState({ formArray: this.state.formArray.concat(this.state.druggingElementName)})
    }
    this.setState({ druggingElementName: null })
  }
  resetDrugEvents = (e) => {
    document.onmousemove = null
    e.target.onmouseup = null
    this.setState({ druggingElementName: null })
  }
  resetNativeDrugging = () => false
  startDruggingElement = (e, button) => {
    let drug = document.getElementById('drug')
    this.setState({ druggingElementName: e.target.id })
    let coordinates = getCoordinates(button)
    let shiftX = e.pageX - coordinates.left
    let shiftY = e.pageY - coordinates.top
    moveDrug(e)
    document.onmousemove = e => moveDrug(e)
    function moveDrug(e) {
      drug.style.left = e.pageX - shiftX + 'px'
      drug.style.top = e.pageY - shiftY + 'px'
    }
    function getCoordinates(elem) {
      let box = elem.getBoundingClientRect()
      return {
        top: box.top + window.pageYOffset,
        left: box.left + window.pageXOffset
      }
    }
  }
  render() {
    const { formArray, druggingElementName } = this.state
    return (
      <div className="app">
        <div id="drug"
             onMouseUp={this.resetDrugEvents}
             onDragStart={this.resetNativeDrugging}
             className={`drug-modal${druggingElementName ? ' drug-modal--active' : ''}`}
        >
          {this.getElement(druggingElementName)}
        </div>
        <div id="templates" className="templates">
          <Button id="button" text="Button"/>
          <Input id="input" value="Input" placeholder="input text..."/>
        </div>
        <div id="form"
             onMouseUp={this.addElementToForm}
             className="form"
        >
          {formArray.map(element => this.getElement(element))}
        </div>
      </div>
    )
  }
}

export default App
