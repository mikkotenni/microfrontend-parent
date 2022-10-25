import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

/**
 * General note on ReactDOM.render(): it's no longer supported in React 18,
 * so you need to update this when upgrading from React 17.
 * https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
 */

/**
 * The usual application rendering for ordinary React projects. As soon as this file is
 * loaded, the rendering begins.
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

/**
 * Global render and unmount functions for JS run-time integration of micro frontend
 * application. These are called by the parent with proper arguments and it is supposed to
 * replace the usual way of application rendering introduced above.
 * https://martinfowler.com/articles/micro-frontends.html#TheMicroFrontends
 * 
 * @param { string } containerId identifying the element for this application to mount
 * @param { object } history instantieted in parent and eventually handed over to Router
/*
window.renderMfe = (containerId, history) => {
  ReactDOM.render(
    <React.StrictMode>
      <App history={history} />
    </React.StrictMode>,
    document.getElementById(containerId)
  )
}
window.unmountMfe = (containerId) => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId))
}
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
