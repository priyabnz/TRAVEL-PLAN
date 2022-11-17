import React from 'react';
import GoogleMap from './Common/GoogleMap';
import { GoogleApiWrapper } from 'google-maps-react';
import { GOOGLE_API_KEY } from '../libs/constant';
/**
 * @param  {Objects} {location}
 */
const Results = ({ location }) => {
  const { state: { distances, destination } } = location;
  const Maps = GoogleApiWrapper({ apiKey: GOOGLE_API_KEY })(GoogleMap);

  const reformattedArray = Object.keys(distances).map(v => {
    return <div className='row'>
    <div className='col-md-12'>
    <h2>Travel Plan</h2>
    </div>
      <div className='col-md-3'>
       <p>Distances</p>
        {v} {`${distances[v]} km`}
      </div>
      <div className='col-md-8 google-map'>
        <Maps destination={destination} />
      </div>
    </div>
  })

  return (
    <div>{reformattedArray}</div>
  )
}
export default Results;