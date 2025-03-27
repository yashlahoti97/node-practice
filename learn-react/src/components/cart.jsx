import React, { Fragment, useState } from 'react';
import Counter from './counter';
const Cart = () => {

    const [items, setItems] = useState([{name:"Orange", count:1},
    {name:"Apple", count:4},
    {name:"Banana", count:2},
    {name:"Papaya", count:4},
    {name:"Jackfruit", count:6},
    ]);

    const handleIncrement = (idx) => {
        let newitems = [...items];
        newitems[idx].count = newitems[idx].count+1;
        setItems(newitems);
    }

    const handleDecrement = (idx) => {
        let newitems = [...items];
        newitems[idx].count = newitems[idx].count-1;
        if(newitems[idx].count === 0) {
            newitems.splice(idx,1)
        }
        setItems(newitems);
    }

    return (  
        <Fragment>
            {items.map( (item,idx) => 
                <Counter
                    key={idx}
                    name={item.name} 
                    count={item.count} 
                    onIncrement={()=>handleIncrement(idx)} 
                    onDecrement={()=>handleDecrement(idx)} 
                />
                // console.log(item)
                )}
        </Fragment>
    );
}
 
export default Cart;