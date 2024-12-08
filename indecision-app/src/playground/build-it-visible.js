const appRoot = document.getElementById('app');

let visibility = false;

const toggleVisible = () => {
  visibility = !visibility
  render();
}

const render = () => {
  const template = (
    <div>
      <h1>Toggle Visible</h1>
      <button onClick={toggleVisible}>
        {visibility ? 'Hide Details' : 'Show Details'}
      </button>

      {visibility && (
        <div>
          <p>Hidden Messages</p>
        </div>
      )}
    </div>
  );

  ReactDOM.render(template, appRoot);
}

render();
