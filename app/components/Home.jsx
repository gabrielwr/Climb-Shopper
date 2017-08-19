import React from 'react'

import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

const carouselStyle = {
  display: 'block',
  height: '100%',
  maxWidth: '100%',
  lineHeight: '1',
  width: '100%',
}

const Home = (props) => (
  <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

    <ol className="carousel-indicators">
      <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
      <li data-target="#carousel-example-generic" data-slide-to="1"></li>
      <li data-target="#carousel-example-generic" data-slide-to="2"></li>
    </ol>


    <div className="carousel-inner" >
      <div className="item active d-block img-fluid" >
        <img src="http://www.lockedcog.com/uploads/2015/03/dylan-mash.jpg" alt="..." style={carouselStyle}/>
        <div className="carousel-caption">
        </div>
      </div>
      <div className="item d-block img-fluid">
        <img src="http://www.mashsf.com/wp-content/uploads/2013/06/2T1A1500.jpg" alt="..." style={carouselStyle} />
        <div className="carousel-caption">
        </div>
      </div>
      <div className="item d-block img-fluid">
        <img src="https://www.giant-bicycles.com/_generated/news/2013/Product/620/vos_kit.jpg" alt="..." style={carouselStyle}/>
        <div className="carousel-caption">
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

export default Home

