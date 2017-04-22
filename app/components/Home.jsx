import React from 'react'

import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

const Home = (props) => (
    <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner" role="listbox">
        <div className="carousel-item active">
          <img className="d-block img-fluid" src="http://www.lockedcog.com/uploads/2015/03/dylan-mash.jpg" alt="First slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block img-fluid" src="http://www.lockedcog.com/uploads/2015/03/dylan-mash.jpg" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img className="d-block img-fluid" src="http://www.mashsf.com/wp-content/uploads/2013/06/2T1A1500.jpg" alt="Third slide" />
        </div>
      </div>
    </div>
)

export default Home
// export default connect(
//   state => (),
//   {}
// )()
