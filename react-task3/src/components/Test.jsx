import { Component } from "react";

class TimerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().toLocaleTimeString(),
      countdown: 0,
      countdownInput: "",
      isCountingDown: false,
    };
    this.timerID = null;
    this.countdownInterval = null;
  }

  componentDidMount() {
    console.log("componentDidMount +");
    this.timerID = setInterval(() => this.updateCurrentTime(), 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate +");
    if (this.state.countdown === 0 && prevState.countdown !== 0) {
      clearInterval(this.countdownInterval);
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount +");
    clearInterval(this.timerID);
    clearInterval(this.countdownInterval);
  }

  updateCurrentTime = () => {
    this.setState({
      currentTime: new Date().toLocaleTimeString(),
    });
  };

  handleInputChange = (event) => {
    this.setState({
      countdownInput: event.target.value,
    });
  };

  startCountdown = () => {
    const countdown = parseInt(this.state.countdownInput, 10);
    if (!isNaN(countdown) && countdown > 0) {
      this.setState({ countdown, isCountingDown: true }, () => {
        this.countdownInterval = setInterval(() => {
          this.setState(
            (prevState) => ({
              countdown: prevState.countdown - 1,
            }),
            () => {
              if (this.state.countdown === 0) {
                clearInterval(this.countdownInterval);
                this.setState({ isCountingDown: false });
              }
            }
          );
        }, 1000);
      });
    }
  };

  resetCountdown = () => {
    clearInterval(this.countdownInterval);
    this.setState({
      countdown: 0,
      countdownInput: "",
      isCountingDown: false,
    });
  };

  render() {
    return (
      <div>
        <h1>Current Time: {this.state.currentTime}</h1>
        <div>
          <input
            type="number"
            value={this.state.countdownInput}
            onChange={this.handleInputChange}
            placeholder="Write the countdown second"
          />
          <button onClick={this.startCountdown}>Başlat</button>
          <button onClick={this.resetCountdown}>Sıfırla</button>
        </div>
        <h2>
          Countdown:{" "}
          {this.state.countdown > 0 ? this.state.countdown : "Time is over!"}
        </h2>
      </div>
    );
  }
}

export default TimerApp;
