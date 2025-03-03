import React, { useEffect, useState } from 'react';
import { getAll, removeOne } from '../utils/flightApi';
import FlightForm from './flightForm';
import Background from "./Background";
import UserButton from './UserButton';

function FlightRow(props) {
  const {_id,source,destination,price,passengers,time,editClick,deleteClick} = props;
  return (
    <tr>
      <td>{source}</td>
      <td>{destination}</td>
      <td>{price}</td>
      <td>{passengers}</td>
      <td>{time.slice(0,16).replace('T',' ')}</td>
      <td><button className='edit' onClick={()=>editClick(_id)}>edit</button></td>
      <td ><button className='delete' onClick={()=>deleteClick(_id)}>delete</button></td>
    </tr>
  )
}
  function FlightTable(props) {
    const {flights,onError,updateFlights} = props
    const [editId,setEditId] = useState();
    const onSuccess = () => {
      setEditId();
      updateFlights();
    }
    const deleteFunction = (id) => {
      removeOne(id).then(()=>updateFlights()).catch(onError)
    }
  return (
    <table>
     <thead>
      <tr>
        <th>source</th>
        <th>destination</th>
        <th>price</th>
        <th>passengers</th>
        <th>time</th>
        <th></th>
        <th></th>
      </tr>
      </thead> 
      <tbody>
        {flights.length 
      ? flights.map(flight=><>
      <FlightRow
       key ={flight._id}
       {...flight} 
       editClick={setEditId}
       deleteClick={deleteFunction}/>
      {editId===flight._id && (<tr key={flight._id + '_edit'}>
        <td colSpan={7}>
          <FlightForm 
          flightId={flight._id} 
          onSuccess={onSuccess} 
          onError={onError} 
          cancelClick={()=>setEditId()}/>
          </td>
      </tr>)}
      </>)
      :<tr>
        <td className='tableError' colSpan="7">No Flights</td></tr>}
      </tbody>
    </table>
  )
}
export default function FlightPage(){
  const [flights,setFlights]=useState([]);
  const [error,setError] = useState('');
  const [displayForm,setDisplayForm] = useState(false);
  const onError = (err) => setError(err.toString());
  const updateFlights = () => getAll().then(arr=>setFlights(arr)).catch(err=>{
 onError(err);
 setFlights([]);
  });
  useEffect(()=>{
   updateFlights();
  },[])
  return <div>
      <Background/>
      <UserButton updateFlights={updateFlights} onError={onError}/>
      <span className='error'>{error}</span>
    <h1>✈️Welcone to Fly Emirates🌴:</h1>
    <FlightTable flights={flights} updateFlights={updateFlights} onError={onError}/>
    <button className='add' onClick={()=>setDisplayForm(true)}>add Flight</button>
    {displayForm && <table><tbody><tr><td> 
      <FlightForm 
        onSuccess={()=>{updateFlights(); setDisplayForm(false)}} 
        onError={onError} 
        cancelClick={()=>setDisplayForm(false)}/>
      </td></tr></tbody></table>}
  </div>
}



