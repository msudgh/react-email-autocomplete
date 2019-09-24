import React, { Component } from 'react'
import { emailServicesDomains, protectedKeyCodes } from './constants'

export default class Email extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      suggestion: '',
      valid: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.getSuggest = this.getSuggest.bind(this)
  }
  replaceLast(value, what, replacement) {
    let pieces = value.split(what)
    let lastPiece = pieces.pop()
    return pieces.join(what) + replacement + lastPiece
  }
  handleChange(event) {
    const { value: emailAddress } = event.target
    const { onChange } = this.props
    const suggest = this.suggest(emailAddress)

    if (typeof suggest === 'undefined' || suggest.length < 1) {
      this.setState({ value: emailAddress, suggestion: suggest }, () =>
        this.selectText()
      )
    } else {
      this.setState(
        { value: `${emailAddress}${suggest}`, suggestion: suggest },
        () => this.selectText()
      )
    }

    if (onChange) {
      onChange(event)
    }
  }
  selectText() {
    const { suggestion, value } = this.state

    if (typeof suggestion !== 'undefined' && suggestion.length > 0) {
      let startPos = value.lastIndexOf(suggestion)
      let endPos = startPos + suggestion.length
      this.textHandler.setSelectionRange(startPos, endPos)
    }
  }
  getSuggest(event) {
    if (protectedKeyCodes.indexOf(event.keyCode) >= 0) return
    const { suggestion } = this.state
    const { value } = event.target

    if (event.keyCode === 8) {
      this.setState({
        value: this.replaceLast(value, suggestion, '')
      })
    }
  }
  suggest(string) {
    let strArr = string.split('@')
    if (strArr.length - 1 !== 0) {
      string = strArr.pop()
    } else return

    const { domains } = this.props

    let match =
      domains
        .filter(domain => {
          return domain.indexOf(string) === 0
        })
        .shift() || ''

    return match.replace(string, '')
  }

  componentDidMount() {
    const { domains, value } = this.props
    if (typeof domains === 'string') {
      console.error('domains props should be array not string!')
      this.setState({
        valid: false
      })
    }

    this.setState({
      value
    })
  }
  render() {
    const props = this.props
    const { value, valid } = this.state

    return valid ? (
      <div className="rea-wrapper">
        <input
          {...props}
          autoCapitalize="none"
          type="text"
          inputMode="email"
          value={value || ''}
          onChange={this.handleChange}
          onKeyUp={this.getSuggest}
          ref={input => {
            this.textHandler = input
          }}
        />
      </div>
    ) : (
        'Unable to render component! Please, Check out developer tools of your browser.'
      )
  }
}

Email.defaultProps = {
  domains: emailServicesDomains
}
