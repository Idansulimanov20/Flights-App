import {useEffect,useState}from 'react'
import { addOne, editOne, getById } from '../utils/flightApi';
function FlightForm({flightId, onError,onSuccess, cancelClick}) {
const [form, setForm] = useState({})
useEffect(()=>{
    if(!flightId){
        return;
    }
    getById(flightId).then(data => {
        console.log(data); // Log the data to debug
        setForm(data);
    })
    .catch(onError)
},[flightId])
;
const formChange = (e) => {
    let value = e.target.value;
    let key = e.target.name;
    if(key === 'time'){
        value = value.replace('T',' ');
    }
    setForm({...form,[key]:value})
}
const saveClick = () => {
    if(flightId){
        editOne(flightId,form).then(onSuccess)
        .catch(onError)
    }else{
        addOne(form).then(onSuccess)
        .catch(onError)
    }
}
const formNotFilled = ['source','destination','price','passengers','time'].some(key=>!form[key]); 
return (
    <div >
        <div className='form'>
            <div>
                <span>Source:</span>
                <input type="text" value={form.source} name="source" onChange={formChange} />
            </div>
            <div>
                <span>Destination:</span>
                <input type="text" value={form.destination} name="destination" onChange={formChange} />
            </div>
            <div>
                <span>Price:</span>
                <input type="number" value={form.price} name="price"  onChange={formChange} />
            </div>
            <div>
                <span>Passengers:</span>
                <input type="number" value={form.passengers} name="passengers"  onChange={formChange} />
            </div>
            <div>
                <span>Time:</span>
                <input type="dateTime-local" value={form.time} name="time"  onChange={formChange} />
            </div>
            <div className='buttons'> 
                <button className='edit' disabled={formNotFilled} onClick={saveClick}>Save</button>
                <button className='delete' onClick={cancelClick}>cancel
                </button></div>
           
        </div>
    </div>
)
}

export default FlightForm
