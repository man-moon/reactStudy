import React from 'react';

function TabPanel(props){
  const {children, value, index} = props;
  return( 
  <div>
    {
      value === index && (
        <h1>{children}</h1>
      )
    }
  </div>
  ) 
}

export default TabPanel;