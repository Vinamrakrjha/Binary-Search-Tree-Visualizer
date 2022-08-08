import React, {useContext, useState} from 'react';
import './tree.component.css';
import treeContext from '../Context/treecontext.js';

const Node = (props) => {

    const [key, setkey] = useState(props.id);
    let TreeContext = useContext(treeContext);

  return (
    <div className={`node ${TreeContext.curr_node_idx === key ? 'visited' : ''}`}>

        <h3 style={{ fontSize : `${(6/Number(String(key).length))*10}px`}}>

            {key}
            
        </h3>

    </div>
  )
}

export default Node