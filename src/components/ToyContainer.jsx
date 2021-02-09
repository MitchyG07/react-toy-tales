import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy => <ToyCard addLikes={props.addLikes} donateToy={props.donateToy} toy={toy}/> )}
    </div>
  );
}

export default ToyContainer;
