import React, {useEffect} from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'; 
import { useAuthContext } from '../hooks/useAuthContext';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

function Home(props) {

    const {workouts, dispatch} = useWorkoutsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fectWorkouts = async () => {
            const response = await fetch('http://localhost:4000/api/workouts/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if(response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json});
            }
        }
        if(user) {
            fectWorkouts()
        }
    }, [dispatch, user])

    return (
        <div className='home'>
            <div className='workouts'>
                {
                    workouts && workouts.length > 0 ?
                    <>
                    {workouts && workouts.map((workout) => (
                            <WorkoutDetails key={workout._id} workout={workout} />
                    ))}
                    </>
                    : <div className="workout-details"><p className='no-data'>No Workouts Available</p></div>
                }
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home;