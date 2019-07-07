import React from 'react';

const Forbidden = () => {
  return (
    <div className="bounds">
      <h1>Forbidden</h1>
      {/* Add button to go home */}
      <p>
        You can't update courses that you don't own. Create a course then try
        again or navigate to a course you own and try again.
      </p>
      <iframe
        src="https://giphy.com/embed/l41ofhO7rXV9WFECQ"
        title="forbidden"
        width="480"
        height="385"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      />
    </div>
  );
};

export default Forbidden;
