
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../searchbar/SearchBar';



class DateTime extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
     formatDate(date) {
      return date.toLocaleDateString();
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }

    render() {
      return (
        <div>
          <center>
          <td>{this.state.date.toLocaleDateString()}{" "}{this.state.date.toLocaleTimeString()}<SearchBar/></td> 
          </center>
        
        </div>
      );
    }
  }
  ReactDOM.render(
    <DateTime />,
    document.getElementById('root')
  );

  export default DateTime;