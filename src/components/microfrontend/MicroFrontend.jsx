import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function getManifest(host) {
  return new Promise((resolve) => {
    const response = fetch(`${host}/asset-manifest.json`).then((res) =>
      res.json()
    )
    resolve(response)
  })
}

function createScriptTag(scriptId, scriptSrc, renderMicroFrontend) {
  const script = document.createElement('script')
  script.id = scriptId
  script.crossOrigin = ''
  script.src = scriptSrc
  script.onload = renderMicroFrontend
  document.head.appendChild(script)
}

export default function MicroFrontend({ name, host, history }) {
  const scriptId = `micro-frontend-script-${name}`
  const [scriptSrc, setScriptSrc] = useState(null)

  useEffect(() => {
    // Some helpers.
    async function getScriptSrc() {
      const manifest = await getManifest(host)
      setScriptSrc(`${host}${manifest.files['main.js']}`)
    }

    function renderMicroFrontend() {
      if (window[`render${name}`]) {
        window[`render${name}`](`${name}-container`, history)
      }
    }

    // Routine for rendering.
    if (!scriptSrc) {
      getScriptSrc()
    } else {
      createScriptTag(scriptId, scriptSrc, renderMicroFrontend)
    }

    // Cleanup when unmounting.
    return () => {
      if (window[`unmount${name}`]) {
        window[`unmount${name}`](`${name}-container`)
      }
    }
  })
  return <div id={`${name}-container`} />
}

MicroFrontend.propTypes = {
  name: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
}
