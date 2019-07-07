import React from 'react';

const Error = () => {
  return (
    <div className="bounds">
      {/* Add button to go home */}
      <h1>Error</h1>
      <p>Sorry! We just encountered an unexpected error.</p>
      <iframe
        src="https://giphy.com/embed/bi6RQ5x3tqoSI"
        title="error"
        width="480"
        height="349"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      />
    </div>
  );
};

export default Error;
