module.exports = db => db.define('reviews', {
  title: STRING,
  content: TEXT,
  num_stars: {
    type: FLOAT,
    validate: {
      min: 1, max: 5
    }
  }
},{
  //  getterMethods: {
  //    type: () => {
  //
  //    }
  //  }
  //
  //
  // }
)