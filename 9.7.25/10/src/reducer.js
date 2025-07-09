export const initialState = {
  name: '',
  establishment_year: '',
  address: {
    building: '',
    street: '',
    city: {
      name: '',
      locality: {
        pinCode: '',
        landmark: ''
      }
    },
    state: '',
    coordinates: {
      latitude: '',
      longitude: ''
    }
  },
  courses_offered: [],
  error: ''
};

export const collegeReducer = (state, action) => {
  try {
    switch (action.type) {
      case 'name':
      case 'establishment_year':
        return { ...state, [action.type]: action.payload, error: '' };

      case 'building':
      case 'street':
      case 'state':
        return {
          ...state,
          address: { ...state.address, [action.type]: action.payload },
          error: ''
        };

      case 'city_name':
        return {
          ...state,
          address: {
            ...state.address,
            city: { ...state.address.city, name: action.payload }
          },
          error: ''
        };

      case 'pincode':
      case 'landmark':
        return {
          ...state,
          address: {
            ...state.address,
            city: {
              ...state.address.city,
              locality: {
                ...state.address.city.locality,
                [action.type === 'pincode' ? 'pinCode' : 'landmark']: action.payload
              }
            }
          },
          error: ''
        };

      case 'latitude':
      case 'longitude':
        return {
          ...state,
          address: {
            ...state.address,
            coordinates: {
              ...state.address.coordinates,
              [action.type]: action.payload
            }
          },
          error: ''
        };

      case 'courses_offered':
        return {
          ...state,
          courses_offered: action.payload.split(',').map(course => course.trim()),
          error: ''
        };

      case 'reset':
        return initialState;

      default:
        throw new Error('invalid action type');
    }
  } catch (err) {
    return { ...state, error: err.message };
  }
};
