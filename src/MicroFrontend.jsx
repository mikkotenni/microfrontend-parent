import React from 'react'

/* eslint-disable */
/* eslint react/prop-types: 0 */
class MicroFrontend extends React.Component {
  componentDidMount() {
    const { name, host, document } = this.props
    const scriptId = `micro-frontend-script-${name}`

    if (document.getElementById(scriptId)) {
      this.renderMicroFrontend()
      return
    }

    fetch(`${host}/asset-manifest.json`)
      .then((res) => {
        return res.json()
      })
      .then((manifest) => {
        console.log('Child application manifest', manifest)
        const script = document.createElement('script')
        script.id = scriptId
        script.crossOrigin = ''
        script.src = `${host}${manifest.files['main.js']}`
        script.onload = this.renderMicroFrontend
        document.head.appendChild(script)
      })
  }

  componentWillUnmount() {
    const { name, window } = this.props

    window[`unmount${name}`](`${name}-container`)
  }

  renderMicroFrontend = () => {
    const { name, window, history } = this.props

    window[`render${name}`](`${name}-container`, history)
  }

  render() {
    return <div id={`${this.props.name}-container`} />
  }
}

MicroFrontend.defaultProps = {
  document,
  window,
}

export default MicroFrontend
