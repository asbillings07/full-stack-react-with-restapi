import React from 'react';

const NotFound = () => {
  return (
    <div className="bounds">
      {/* Add button to go home */}
      <a href="/">Home</a>
      <h1>Not Found</h1>
      <p>Sorry! We couldn't find the page you're looking for.</p>

      <iframe
        src="https://giphy.com/embed/NTXqH1bUCfHBS"
        title="not found"
        width="480"
        height="322"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      />
    </div>
  );
};

export default NotFound;
