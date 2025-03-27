import React, { Fragment } from 'react';

const Counter = (props) => {

    return (  
        <Fragment>
            <div className="row mx-0">
                <span className="col-2">{props.name}</span>
                <button className="btn btn-danger" onClick={props.onDecrement}>-</button>
                <span className="col-1 text-center">{props.count}</span>
                <button className="btn btn-primary" onClick={props.onIncrement}>+</button>
            </div>
        </Fragment>
    );
}
 
export default Counter;