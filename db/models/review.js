module.exports = db => db.define('reviews', {
  title: STRING,
  content: TEXT,
  num_stars: {
    type: INTEGER,
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