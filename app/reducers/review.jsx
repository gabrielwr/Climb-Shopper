import axios from 'axios'

const initialState = {
  reviews: [],
  selectedReview: {}
}

/* -----------------    ACTION TYPES     ------------------ */
const SET_REVIEWS = 'SET_REVIEWS'
const SET_SELECTED_REVIEW = 'SET_SELECTED_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'
const UPDATE_REVIEW = 'UPDATE_REVIEW'
//do we need a create_review?
const CREATE_REVIEW = 'CREATE_REVIEW'
const ADD_REVIEW_TO_PRODUCT = 'ADD_REVIEW_TO_PRODUCT'
  // Below might not be needed
  // I am leaving here till we have the order reducer built out.
const UPDATE_REVIEW_IN_PRODUCT = 'UPDATE_REVIEW_IN_PRODUCT'
const REMOVE_REVIEW_FROM_PRODUCT = 'REMOVE_REVIEW_FROM_PRODUCT'

/* ------------   ACTION CREATORS     ------------------ */

export const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  reviews: reviews
})

export const setReview = (review) => ({
  type: SET_SELECTED_REVIEW,
  selectedReview: review
})

export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review: review
})

export const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review: review
})

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId: reviewId
})

export const addReviewToOrder = (review) => ({
  type: ADD_REVIEW_TO_PRODUCT,
  review: review
})

export const removeReviewFromOrder = (review) => ({
  type: REMOVE_REVIEW_FROM_PRODUCT,
  review: review
})

export const updateReviewInOrder = (review) => ({
  type: UPDATE_REVIEW_IN_PRODUCT,
  review: review
})


/* ------------       REDUCERS     ------------------ */
export default function(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case SET_REVIEWS:
      newState.reviews = action.reviews
      break

    case SET_SELECTED_REVIEW:
      newState.selectedReview = action.selectedReview
      break

    case CREATE_REVIEW:
      newState.reviews = newState.reviews.concat([action.reviews])
      break

    case UPDATE_REVIEW:
      newState.reviews = newState.reviews.map((review) => (
        (review.id === action.review.id) ? action.review : review
      ))
      break

    case DELETE_REVIEW:
      newState.reviews = newState.reviews.filter((currentReview) => (
        (currentReview.id !== action.reviewId)
      ))
      break

    case ADD_REVIEW_TO_PRODUCT:
      newState.selectedReview.students = newState.selectedReview.students.concat([action.student])
      break

    case REMOVE_REVIEW_FROM_PRODUCT:
      newState.selectedReview.students =
        newState.selectedReview.students.filter((student) => (student.id !== action.student.id))
      break

    default:
      return state
  }

  return newState
}
/* ------------       DISPATCHERS     ------------------ */

export const fetchReviews = () => dispatch => {
  axios.get('/api/reviews')
    .then(res => dispatch(setReviews(res.data)))
}

export const removeReview = id => dispatch => {
  dispatch(deleteReview(id))
  axios.delete(`/api/reviews/:id`) // OB/LP: similar bug
    .catch(err => console.error(`Removing review:  unsuccesful`, err))
}
