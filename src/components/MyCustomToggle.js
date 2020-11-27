import React, {useContext} from 'react';
import AccordionContext from 'react-bootstrap/AccordionContext';
import {useAccordionToggle} from 'react-bootstrap/AccordionToggle';
import classNames from 'classnames';

export default function MyCustomToggle({eventKey, callback}) {
  const currentEventKey = useContext(AccordionContext); // <-- Will update every time the eventKey changes.
  const toggleOnClick = useAccordionToggle(eventKey, () => {
    // callback(eventKey);
    console.log("eventKey", eventKey);
  });
  const isCurrentEventKey = currentEventKey === eventKey;

  return (
    <button
      type="button"
      className={classNames('myDefaultStyling', {'myCollapsedStyling': isCurrentEventKey})}
      onClick={toggleOnClick}
    >
      {isCurrentEventKey ? 'Collapse me' : 'Expand me'}
    </button>
  );
}