const dataInit = {
  data: []
};

const verifyInit = {
  data: []
}

export const UPDATE = 'UPDATE';
export const CLEAR = 'CLEAR';
export const VERIFY = 'VERIFY';

const updateWith = (data) => {
  return {
    type: UPDATE,
    data: data
  };
}
const thenClear = () => ({type:CLEAR});

const updateVerifiedWith = (data) => {
  return {
    type: VERIFY,
    data: data
  };
}

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
};

const fetchVerified = () => {
  return dispatch => (
    fetch('/api/verified', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
    .then(data => data.json())
    .then(resp => dispatch(updateVerifiedWith(resp)))
  );
}


export function dataReducer (state = dataInit, action) {
  if(action.type === UPDATE) {
    return Object.assign({}, {data:action.data});
  } else if (action.type === CLEAR) {
    return Object.assign({}, {data:[]});
  } else if (action.type === VERIFY) {
    return Object.assign({}, {verified: action.data});
  }
  return state;
};

export function verifyReducer(state = verifyInit, action) {
  if (action.type === VERIFY) {
    return Object.assign({}, {data:action.data});
  } else if (action.type === CLEAR) {
    return Object.assign({}, {data:[]});
  }
  return state;
};

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

export function mapDispatchToPropsV(dispatch) {
  return {
    updateVerified: () => dispatch(fetchVerified())
  }
}

export function mapStateToPropsV(state) {
  return {
    data: state.verified
  };
};