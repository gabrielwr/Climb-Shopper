import axios from 'axios';

const initialState = {
    students: [],
    selectedStudent: {}
  }


/* -----------------    ACTION TYPES     ------------------ */
const UPDATE_STUDENT = 'UPDATE_STUDENT';


/* ------------   ACTION CREATORS     ------------------ */

export const createStudent = (student) => ({
  type: CREATE_STUDENT,
  student: student
})
/* ------------       REDUCERS     ------------------ */

/* ------------       DISPATCHERS     ------------------ */

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
       .then(res => dispatch(init(res.data)));
};

export const removeUser = id => dispatch => {
  dispatch(remove(id));
  axios.delete(`/api/users/`)
       .catch(err => console.error(`Removing user:  unsuccesful`, err));
};
