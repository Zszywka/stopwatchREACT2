class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      results: []
    }
  }

  reset() {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }

  format() {
     return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
  }

  start() {
    if (!this.state.running) {
      this.setState({
        running: true
      });
      // this.state.running = true;
      this.watch = setInterval( () => this.step(), 10);
    }
  }

  step() {
    if (!this.state.running) return;
    this.calculate();
  }

  calculate() {
    this.state.times.miliseconds += 1;
    if (this.state.times.miliseconds >= 100) {
        this.state.times.seconds += 1;
        this.state.times.miliseconds = 0;
    }
    if (this.state.times.seconds >= 60) {
        this.state.times.minutes += 1;
        this.state.times.seconds = 0;
    }
    this.setState({
      times: this.state.times
    });
  }

  stop() {
    if (this.state.running){this.add()};
    this.state.running = false;
    clearInterval(this.watch);
  }

  add() {
    this.state.results.push(this.format());
    this.setState({});
  }

  resetList() {
    this.setState({
      results: []
    });
  }

  remove(index) {
    const newResults = this.state.results.filter(time => this.state.results.indexOf(time) !== index);
    this.setState({results: newResults});
  }

  render() {
    return (
      <div className={'app'}>
        <nav className={'controls'}>
          <a href={'#'} className={'button'} id={'start'} onClick={() => this.start()}>Start</a>
          <a href={'#'} className={'button'} id={'stop'} onClick={() => this.stop()}>Stop</a>
        </nav>
        <div className={'stopwatch'}>
          {this.format(this.state.times)}
        </div>
        <a href={'#'} className={'button'} id={'reset'} onClick={() => this.reset()}>Reset</a>
        <div className={'list'}>
          <a href={'#'} className={'button'} id={'reset-list'} onClick={() => this.resetList()}>Reset list</a>
          <ul className={'results'}>
            {this.state.results.map((element, index) => <li key={index}> {element} <a href={'#'} id={'delete-x'} onClick={() => this.remove(index)}> X </a></li> )}
          </ul>
        </div>
      </div>
    );
  }
}

var element = React.createElement(StopWatch);
ReactDOM.render(element, document.getElementById('app'));

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
