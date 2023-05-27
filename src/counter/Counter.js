import {useSelector , useDispatch} from 'react-redux';
import {increment , decrement , reset , incrementByAmount} from './counterSlice';
import {useState} from 'react';

const Counter = () =>{
    const count = useSelector(state => state.counter.count);
    const dispatch = useDispatch();

    const [incrementAmount , setIncrementAmount] = useState(0);

    const addValue = Number(incrementAmount) || 0;

    const resetAll = () =>{
        setIncrementAmount(0);
        dispatch(reset());
    }

    return(
        <section className='Counter'>
            <p>
                {count}
            </p>
            <div className='Buttons'>
                <button onClick = {() => dispatch(increment())}>+</button>

                <button onClick = {() => dispatch(decrement())}>-</button>
            </div>


                <input 
                    placeholder='Enter the value'
                    onChange = {(event) => setIncrementAmount(event.target.value)}
                    value = {incrementAmount}
                />

            <div className='Buttons'>
                <button onClick = {resetAll}>Reset</button>

                <button onClick={() => dispatch(incrementByAmount(addValue))}>Add value</button>
            </div>
        </section>
    )
}
export default Counter;