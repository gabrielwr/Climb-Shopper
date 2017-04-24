import React from 'react'

import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'


const Home = (props) => (
  <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

    <ol className="carousel-indicators">
      <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
      <li data-target="#carousel-example-generic" data-slide-to="1"></li>
      <li data-target="#carousel-example-generic" data-slide-to="2"></li>
    </ol>


    <div className="carousel-inner">
      <div className="item active d-block img-fluid">
        <img src="http://www.lockedcog.com/uploads/2015/03/dylan-mash.jpg" alt="..." />
        <div className="carousel-caption">
          <h3>Caption Text</h3>
        </div>
      </div>
      <div className="item d-block img-fluid">
        <img src="http://www.mashsf.com/wp-content/uploads/2013/06/2T1A1500.jpg" alt="..." />
        <div className="carousel-caption">
          <h3>Caption Text</h3>
        </div>
      </div>
      <div className="item d-block img-fluid">
        <img src="http://www.mashsf.com/wp-content/uploads/2013/06/2T1A1500.jpg" alt="..." />
        <div className="carousel-caption">
          <h3>Caption Text</h3>
        </div>
      </div>
    </div>

    <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
      <span className="glyphicon glyphicon-chevron-right"></span>
    </a>
  </div>

)



// <div id="carouselExampleSlidesOnly" classNameName="carousel slide" data-ride="carousel">
//       <div classNameName="carousel-inner" role="listbox">
//         <div className="carousel-item active">
//           <img className="d-block img-fluid" src="http://www.lockedcog.com/uploads/2015/03/dylan-mash.jpg" alt="First slide" />
//         </div>
//         <div className="carousel-item">
//           <img className="d-block img-fluid" src="http://www.lockedcog.com/uploads/2015/03/dylan-mash.jpg" alt="Second slide" />
//         </div>
//         <div className="carousel-item">
//           <img className="d-block img-fluid" src="http://www.mashsf.com/wp-content/uploads/2013/06/2T1A1500.jpg" alt="Third slide" />
//         </div>
//       </div>
//     </div>


//  <!-- Carousel -->
export default Home
// export default connect(
//   state => (),
//   {}
// )()
