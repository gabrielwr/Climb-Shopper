import React from 'react'

import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

const Home = (props) => (
  <div>
    <div className = "col-md-6">
      <div className="carousel carousel-slider">
        <a className="carousel-item" href="#one!">
          <img src='hardcode here' />
          <img src='hardcode here' />
          <img src='hardcode here' />
          <img src='hardcode here' />
        </a>
      </div>
    </div>
  </div>
)

// export default connect(
//   state => (),
//   {}
// )()
