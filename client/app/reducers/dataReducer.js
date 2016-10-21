const init = {
  data: []
};

export const UPDATE = 'UPDATE';
export const CLEAR = 'CLEAR';

const updateWith = (data) => {
  return {
    type: UPDATE,
    data: data
  };
}
const thenClear = () => ({type:CLEAR});


const updateData = () => {
  return dispatch => (
    fetch('/api/data', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(data => data.json())
    .then(resp => dispatch(updateWith(resp)))
    )
  };

const clearData = () => {
  return dispatch => (
    fetch('/api/clear', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(data => data.text())
    .then(resp => dispatch(thenClear()))
  );
}

export function dataReducer (state = init, action) {
  if(action.type === UPDATE) {
    return Object.assign({}, {data:action.data});
  } else if(action.type === CLEAR) {
    return Object.assign({}, {data:[]});
  }
  return state;
}

export function mapDispatchToProps(dispatch) {
  return {
    updateData: () => dispatch(updateData()),
    clearData: () => dispatch(clearData())
  };
};

export function mapStateToProps(state) {
  return {
    data: state.data
  };
};