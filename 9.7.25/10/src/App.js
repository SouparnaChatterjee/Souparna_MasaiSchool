import React, { useReducer } from 'react';
import { collegeReducer, initialState } from './reducer';

function App() {
  const [state, dispatch] = useReducer(collegeReducer, initialState);
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (type) => (e) => {
    dispatch({ type, payload: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    dispatch({ type: 'reset' });
    setSubmitted(false);
  };

  return (
    <div className="form-container">
      <h2>College Details Form</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="College Name" onChange={handleChange('name')} value={state.name} />
        <input type="text" placeholder="Establishment Year" onChange={handleChange('establishment_year')} value={state.establishment_year} />
        
        <input type="text" placeholder="Building" onChange={handleChange('building')} value={state.address.building} />
        <input type="text" placeholder="Street" onChange={handleChange('street')} value={state.address.street} />
        <input type="text" placeholder="City" onChange={handleChange('city_name')} value={state.address.city.name} />
        <input type="text" placeholder="Pincode" onChange={handleChange('pincode')} value={state.address.city.locality.pinCode} />
        <input type="text" placeholder="Landmark" onChange={handleChange('landmark')} value={state.address.city.locality.landmark} />
        <input type="text" placeholder="State" onChange={handleChange('state')} value={state.address.state} />
        <input type="text" placeholder="Latitude" onChange={handleChange('latitude')} value={state.address.coordinates.latitude} />
        <input type="text" placeholder="Longitude" onChange={handleChange('longitude')} value={state.address.coordinates.longitude} />
        <input type="text" placeholder="Courses Offered (comma separated)" onChange={handleChange('courses_offered')} value={state.courses_offered.join(', ')} />

        <div className="buttons">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>

        {state.error && <div className="error">{state.error}</div>}
      </form>

      {submitted && !state.error && (
        <div className="output">
          <h3>College Data</h3>
          <p><strong>Name:</strong> {state.name}</p>
          <p><strong>Established:</strong> {state.establishment_year}</p>
          <p><strong>Address:</strong> {`${state.address.building}, ${state.address.street}, ${state.address.city.name}, ${state.address.state}`}</p>
          <p><strong>Pincode:</strong> {state.address.city.locality.pinCode}</p>
          <p><strong>Landmark:</strong> {state.address.city.locality.landmark}</p>
          <p><strong>Coordinates:</strong> Lat {state.address.coordinates.latitude}, Long {state.address.coordinates.longitude}</p>
          <p><strong>Courses:</strong> {state.courses_offered.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
