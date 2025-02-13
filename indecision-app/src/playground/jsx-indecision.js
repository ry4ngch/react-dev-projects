console.log("App.js is running");

const app = {
  title: "Indecision App",
  subtitle: "Put your life in the hands of a computer",
  options: []
}

const onFormSubmit = (e) => {
  e.preventDefault();
  const option = e.target.elements.option.value;

  if(option){
    app.options.push(option);
    e.target.elements.option.value = "";
  }

  render();
}

const removeAll = () => {
  app.options = [];
  render();
}

const onMakeDecision = () => {
  const randNum = Math.floor(Math.random()*app.options.length);
  alert(app.options[randNum]);
}

const render = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? "Here are your options" : "No Options"}</p>
      <button onClick={onMakeDecision} disabled={app.options.length === 0}>What should I do?</button>
      <button onClick={removeAll}>Remove All</button>


      <ol>
        {app.options.map((option) => {
          return <li key={option}>{option}</li>
        })}
      </ol>

      <form onSubmit={onFormSubmit}>
        <input type="text" name="option"/>
        <button>Add Option</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
}


const appRoot = document.getElementById('app');
render();
