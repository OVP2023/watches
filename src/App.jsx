import { Component } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

const jsonData = [{
  date: "Moscow",
  km: "Europe/Moscow", //временная зона
  }
]


class ListView extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitx = this.handleSubmitx.bind(this);
    this.state = {flag:'',date: new Date()};
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


  handleSubmitx(event) {
    for (let i = jsonData.length; i--; ) {
      if (jsonData[i].date === event.target.getElementsByTagName('input')[0].value){
        jsonData.splice(i, 1)
      }
    }
    this.setState({flag: 5});
    event.preventDefault();      
  }

  render() {
    return (
      <> 
        {jsonData.map(product => ( 
          <form className="out"  onSubmit={this.handleSubmitx}> 
            <input type="text" value={product.date}  />
            <div>{this.state.date.toLocaleTimeString('en-US',{timeZone:`${product.km}`})} </div>
            <input  className="buttonx" type="submit" value="X" />
         </form>
        ))}
      </>
    );
  }
} 

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {valfirst: '',valsecond: '',flag:'',date:new Date()};
    this.handleChangeFirst = this.handleChangeFirst.bind(this);
    this.handleChangeSecond = this.handleChangeSecond.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFirst(event) {
    this.setState({valfirst: event.target.value});
  }
  handleChangeSecond(event) {
    this.setState({valsecond: event.target.value});
  }

  handleSubmit(event) {
    const dat= new Date()
      try {
        console.log(dat.toLocaleTimeString('en-US',{timeZone:this.state.valsecond}));
        jsonData.push({date:this.state.valfirst,km:this.state.valsecond});
      } catch (err) {
        console.log('неправильная timeZone')
      }
      this.setState({flag: 5});
      console.log(this.state)
      event.preventDefault();
  }
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label className="first">
            Название:
            <br />
            <br></br>
            <input type="text" value={this.state.valfirst} onChange={this.handleChangeFirst} />
          </label>
            <br />
          <label className="second">
            Временная зона (Europe/Moscow,America/Toronto,Africa/Tunis,Asia/Seoul):
            <br />
            <br></br>
            <input type="text" value={this.state.valsecond} onChange={this.handleChangeSecond} />
          </label>
            <br />  
            <input className="button" type="submit" value="OK" />
        </form>
        <ListView />
      </>
    );
  }
}


export default NameForm
