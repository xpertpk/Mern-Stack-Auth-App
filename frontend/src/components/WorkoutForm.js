import React, {useState} from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'; 
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {

    const {dispatch} = useWorkoutsContext();
    const {user} = useAuthContext();

    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            setError("You must be logged in")
            return
        }

        setSuccess(null);
        setError(null);
        const workout = {title, load, reps}

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setSuccess(null)
            // setTimeout(() => {
            //     setError('')  
            // }, 3000);
        }

        if(response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null)
            setTimeout(() => {
                setSuccess('');  
            }, 3000);
            setSuccess("New workout added successfully!")
            // console.log(json)
            setEmptyFields([]);
            dispatch({type: 'CREATE_WORKOUT', payload: json});
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>

            <h3>Add a new Workout</h3>

            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            
            <label>Load (in kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            
            <label>Reps:</label>
            <input 
                type="text"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>

            {error && <div className='error'>{error}</div>}
            {success && <div className='success'>{success}</div>}
            
        </form>
    );
}

export default WorkoutForm;