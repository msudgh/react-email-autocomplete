'use strict'

import React, { Component } from 'react'
import { emailServicesDomains, protectedKeyCodes } from './constants'

export default class Email extends Component {
  constructor (props) {
    super(props)
    let updatedEmailServicesList = emailServicesDomains
    Array.prototype.push.apply(updatedEmailServicesList, props.domains && Array.isArray(props.domains) ? props.domains : [])

    this.state = {
      placeholder: props.placeholder,
      class: props.className,
      value: '',
      domains: updatedEmailServicesList,
      suggestion: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.getSuggest = this.getSuggest.bind(this)
  }
  handleChange (event) {
    // Catch value of the input box by every change
    let emailAddress = event.target.value
    let suggest = this.suggest(emailAddress)

    if (typeof suggest === 'undefined' || suggest.length < 1) {
      // Set value and suggestion state by every change
      this.setState({ value: emailAddress, suggestion: suggest }, () => this.selectText())
      event.target.value = emailAddress
    } else {
      const updatedEmailAddr = `${emailAddress}${suggest}`

      // Update value state plus suggested text
      this.setState({ value: updatedEmailAddr, suggestion: suggest }, () => this.selectText())
      event.target.value = emailAddress + suggest
    }

    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }
  selectText () {
    if (typeof this.state.suggestion !== 'undefined' || this.state.suggestion.length > 1) {
      let startPos = this.state.value.indexOf(this.state.suggestion)
      let endPos = startPos + this.state.suggestion.length
      this.textHandler.setSelectionRange(startPos, endPos)
    }
  }
  getSuggest (event) {
    if (protectedKeyCodes.indexOf(event.keyCode) >= 0) return
    if (event.keyCode === 8) {
      this.setState({ value: event.target.value.replace(this.state.suggestion, '') })
    }
  }
  suggest (string) {
    let strArr = string.split('@')
    if (strArr.length > 1) {
      string = strArr.pop()
      if (!string.length) return
    } else return

    let match = this.state.domains.filter((domain) => {
      return domain.indexOf(string) === 0
    }).shift() || ''

    return match.replace(string, '')
  }
  render () {
    return (
      <div className='rea-wrapper'>
        <input autoCapitalize='none' type='text' inputMode='email' id='rea-input' name={this.props.name} placeholder={this.state.placeholder} onBlur={this.props.onBlur} className={this.state.class} value={this.state.value} onChange={this.handleChange} onKeyUp={this.getSuggest} ref={(input) => { this.textHandler = input }} />
      </div>
    )
  }
}
