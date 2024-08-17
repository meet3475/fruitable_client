import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/slice/counter.slice';


function Counter(props) {

    const dispatch = useDispatch()

    const CounterVal = useSelector(state => state.counter_slice);
    console.log(CounterVal);

    const handleIncre = () => {
        dispatch(increment())
    }

    const handleDecre = () => {
        dispatch(decrement())
    }

    return (
        <div>
            <button onClick={handleIncre}>+</button>
            {CounterVal.count}
            <button onClick={handleDecre}>-</button>
        </div>
    );
}

export default Counter;