import React,{Component} from 'react';
import './App.css';
import TopBar from './Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,CardGroup} from 'react-bootstrap'
import FooBar from './Foobar/FooBar'

class App extends Component {
  state = {
    temp: "",
    place: "",
    humidity: "",
    pressure: "",
    wind: "",
    image: "",
    feels: "",
    min: "",
    max: "",
    desc: "",
    cloud: "",
    rise: "",
    dawn: "",
    date: "",
    condition: "",
    fte: [],
    fmi: [],
    fm: [],
    ft: [],
    fi: []
  }
  
  imgHandle = function(ae) {
    if (ae ==='01d')
    {
      return 'https://www.flaticon.com/svg/static/icons/svg/2917/2917249.svg'
    }
    if ( ae ==='01n'){
      return 'https://www.flaticon.com/svg/static/icons/svg/3662/3662525.svg'
    }
    if ( ae ==='02d'){
      return 'https://www.flaticon.com/svg/static/icons/svg/1146/1146808.svg'
    }
    if ( ae ==='02n'){
      return 'https://www.flaticon.com/svg/static/icons/svg/1582/1582760.svg'
    }
    if (ae === '03d' || ae === '03n'){
      return 'https://www.flaticon.com/svg/static/icons/svg/414/414825.svg'
    }
    if (ae === '04d' || ae === '04n'){
      return 'https://www.flaticon.com/svg/static/icons/svg/414/414825.svg'
    }
    if (ae === '09d' || ae === '09n'){
      return 'https://www.flaticon.com/svg/static/icons/svg/899/899690.svg'
    }
    if (ae === '10d'){
      return 'https://www.flaticon.com/svg/static/icons/svg/1332/1332316.svg'
    }    
    if (ae === '10n'){
      return 'https://www.flaticon.com/svg/static/icons/svg/414/414863.svg'
    }     
    if (ae === '11d'){
      return 'https://www.flaticon.com/svg/static/icons/svg/1163/1163734.svg'
    }
    if (ae === '11n'){
      return 'https://www.flaticon.com/svg/static/icons/svg/1200/1200442.svg'
    }
    if (ae === '13d' || ae === '13n'){
      return 'https://www.flaticon.com/svg/static/icons/svg/642/642102.svg'
    }
    if (ae === '50d' || ae === '50n'){
      return 'https://www.flaticon.com/svg/static/icons/svg/2675/2675986.svg'
    }
  }

  fetchForecast = async(e) =>{
    e.preventDefault()
    var i = 0
    var fmin,fmax,ftemp,ftime,fimg,fdes = []
    for(i=2;i<10;i++){
      fmin.push((e.list[i].main.temp_min - 273).toFixed(2))
      fmax.push((e.list[i].main.temp_max - 273).toFixed(2))
      ftemp.push((e.list[i].main.temp - 273).toFixed(2))
      ftime.push(this.timeConverter(e.list[i].dt))
      fimg.push(this.imgHandle(e.list[i].weather[0].icon))
      fdes.push(e.list[i].weather[0].description)
    }
    return ftime
  }

  handleClick = async(e) => {
    try{
      e.preventDefault();
      const city = e.target.elements.city.value
      const api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OWM_API}`)
      const rtr = await api.json()
      const fcast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_OWM_API}`)
      const fcst = await fcast.json()
      const fmax = []
      const fmin = []
      const ftemp = []
      const fimg = []
      const ftime = []
      for(var i=2;i<10;i++){
        fmax.push((fcst.list[i].main.temp_max - 273).toFixed(2))
        fmin.push((fcst.list[i].main.temp_min - 273).toFixed(2))
        ftemp.push((fcst.list[i].main.temp - 273).toFixed(2))
        fimg.push(this.imgHandle(fcst.list[i].weather[0].icon))
        ftime.push((fcst.list[i].dt_txt).slice(11,16))
      }
      const c = (rtr.main.temp - 273).toFixed(2)
      const f = (rtr.main.feels_like - 273).toFixed(2)
      const mi = (rtr.main.temp_min - 273).toFixed(2)
      const ma = (rtr.main.temp_max - 273).toFixed(2)
      const wc = rtr.weather[0].icon
      const img = this.imgHandle(wc)
      const description = rtr.weather[0].description
      const cnes = rtr.clouds.all
      const sr = this.timeConverter(rtr.sys.sunrise)
      const ss = this.timeConverter(rtr.sys.sunset)
      const hum = (rtr.main.humidity)
      const cnd = rtr.weather[0].main
      const ct = rtr.name + ", " + rtr.sys.country
      const hPa = rtr.main.pressure
      const ws = rtr.wind.speed
      const dtBuild = new Date()
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const dt = dtBuild.getDate() + "  " + months[dtBuild.getMonth()] + "  " + dtBuild.getFullYear()
      this.setState({
        temp:c,
        feels: f,
        place: ct,
        wind: ws,
        min: mi,
        humidity: hum,
        pressure: hPa,
        max: ma,
        image: img,
        desc: description,
        cloud: cnes,
        rise: sr,
        dawn: ss,
        date: dt,
        condition: cnd,
        fte: ftemp,
        fmi: fmin,
        fm: fmax,
        ft: ftime,
        fi: fimg
      })
    }
    catch (e){
      this.setState({
        temp:'',
        feels: '',
        min: '',
        max: '',
        image: 'https://www.flaticon.com/svg/static/icons/svg/994/994148.svg',        
        desc: 'Place Not Found'
      })
    }
  }

  timeConverter = function(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ':' + min + ':' + sec ;
    return time;
  }

  render() {
    return (
      <div className="container-fluid">
        <TopBar></TopBar>
        <center>
          <div className="card" id="card1" style={{backgroundColor: 'black', color: 'white'}}>
            <h1 className="title-brand">Blue Sky Weather&emsp;<i className="fas fa-cloud-sun"></i></h1>
            <form onSubmit={this.handleClick}>
              <div className="form-row">
                <div className="p-2">
                  <input type="text" placeholder="Which City?" autoComplete="off" name="city" className="form-control txtbox"/><br/><br/>
                </div>
                <div className="mt-1 p-2">
                  <i className="fa fa-map-marker fa-2x"></i>
                </div>
                <div className="p-2">
                  <button className="btn btn-md" style={{color: 'white'}}>Search</button>
                </div>
              </div>
            </form>
          </div>
        </center>
        <CardGroup>
            <Card>
              <Card.Img style={{backgroundColor: 'black', color: 'white'}} variant="top" src={this.state.image} width="250px" height="250px"/>
              <Card.Body style={{backgroundColor: 'black', color: 'white'}}>
                <Card.Title>Basic Weather</Card.Title>
                <br></br>
                <Card.Text  className="spaceMe">
                  <span className="obj"><b>Temperature&nbsp; <i className="fa fa-thermometer"></i> : </b></span>
                  <span className="val">{this.state.temp !==""?`${this.state.temp} °c`:''}</span>
                </Card.Text>
                <Card.Text className="spaceMe">
                  <span className="obj"><b>Feels Like:</b></span>
                  <span className="val">{this.state.feels !==""?`${this.state.feels} °c`:""}</span>
                </Card.Text>
                <Card.Text className="spaceMe">
                  <span className="obj"><b>Min / Max :</b></span> 
                  <span className="val">{this.state.min !=="" && this.state.max !==""?`${this.state.min} °c / ${this.state.max} °c`:''}</span>
                </Card.Text>
                <Card.Text className="spaceMe">
                  <span className="obj"><b>Description&nbsp;<i className="fa fa-file-text"></i></b></span>
                  <span className="val">{this.state.desc !==""?`${this.state.desc}`:`${this.state.desc}`}</span>
                </Card.Text>
              </Card.Body> 
            </Card>
          <Card>
            <Card.Body style={{backgroundColor: 'black', color: 'white'}}>
              <Card.Title>Complete Details</Card.Title>
              <br></br>
                <Card.Text className="spaceMe">
                  <span className="obj"><b>Place&nbsp;<i className="fa fa-map-marker"></i></b></span>
                  <span className="val">{this.state.place !==""?`${this.state.place} `:''}</span>
                </Card.Text>              
                <Card.Text className="spaceMe">
                    <span className="obj"><b>Date&nbsp;<i className="fa fa-calendar"></i></b></span>
                    <span className="val">{this.state.date !==""?`${this.state.date}`:''}</span>
                </Card.Text>
                <Card.Text className="spaceMe">
                    <span className="obj"><b>Cloudliness&nbsp;<i className="fa fa-cloud"></i></b></span>
                    <span className="val">{this.state.temp !==""?`${this.state.cloud} %`:''}</span>
                </Card.Text>
                <Card.Text className="spaceMe">
                  <span className="obj"><b>Sunrise&nbsp;<i className="fa fa-sun-o"></i></b></span>
                  <span className="val">{this.state.feels !==""?`${this.state.rise}`:""}</span>
                </Card.Text>
                <Card.Text className="spaceMe">
                  <span className="obj"><b>Sunset&nbsp;<i className="fa fa-moon-o"></i></b></span>
                  <span className="val">{this.state.feels !==""?`${this.state.dawn}`:""}</span>
                </Card.Text>
                <Card.Text className="spaceMe">
                  <span className="obj"><b>Humidity&nbsp;<i className="fa fa-tint"></i></b></span>
                  <span className="val">{this.state.humidity !==""?`${this.state.humidity} %`:''}</span>
                </Card.Text>
                <Card.Text className="spaceMe">
                  <span className="obj"><b>Pressure&nbsp;<i className="fas fa-tachometer-alt"></i></b></span>
                  <span className="val">{this.state.pressure !==""?`${this.state.pressure} hPa`:''}</span>
                </Card.Text>
                <Card.Text className="spaceMe">
                  <span className="obj"><b>Wind Speed&nbsp;<i className="fas fa-wind"></i></b></span>
                  <span className="val">{this.state.wind !==""?`${this.state.wind} m/s`:''}</span>
                </Card.Text>
                <Card.Text className="spaceMe">
                  <span className="obj"><b>Condition&nbsp;</b></span>
                  <span className="val">{this.state.condition !==""?`${this.state.condition}`:''}</span>
                </Card.Text>                
            </Card.Body>
          </Card>
        </CardGroup>
        <Card>
        <h1 className="subText text-center" style={{backgroundColor: 'black', color: 'white'}}>Forecast for Next 24Hrs&emsp;<i className="fa fa-clock-o" aria-hidden="true"></i></h1>
          <div className="row oflo flex-row flex-nowrap">
          <div className="col-3">
            <div className="card card-block" style={{backgroundColor: 'black', color: 'white'}}>
            <Card.Img style={{backgroundColor: 'white', color: 'black'}} src={this.state.fi[0]} variant="top" width="150px" height="150px"></Card.Img>
            <Card.Text className="spaceMe">
              <span className="obj">Time: </span>
              <span className="val">{this.state.ft !==''?this.state.ft[0]:''}</span><br></br>
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Min: </span>
              <span className="val">{this.state.fmi !==''?this.state.fmi[0]:''}</span><br></br> 
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Max:</span> 
              <span className="val">{this.state.fm !==''?this.state.fm[0]:''}</span> <br></br> 
            </Card.Text> 
            <Card.Text className="spaceMe"> 
              <span className="obj">Temp: </span> 
              <span className="val">{this.state.fte !==''?this.state.fte[0]:''}</span> <br></br>
            </Card.Text>
            </div>
            </div>

            <div className="col-3">
            <div className="card card-block" style={{backgroundColor: 'black', color: 'white'}}>
            <Card.Img style={{backgroundColor: 'white', color: 'black'}} src={this.state.fi[1]} variant="top" width="150px" height="150px"></Card.Img>
            <Card.Text className="spaceMe">
              <span className="obj">Time: </span>
              <span className="val">{this.state.ft !==''?this.state.ft[1]:''}</span><br></br>
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Min: </span>
              <span className="val">{this.state.fmi !==''?this.state.fmi[1]:''}</span><br></br> 
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Max:</span> 
              <span className="val">{this.state.fm !==''?this.state.fm[1]:''}</span> <br></br> 
            </Card.Text> 
            <Card.Text className="spaceMe"> 
              <span className="obj">Temp: </span> 
              <span className="val">{this.state.fte !==''?this.state.fte[1]:''}</span> <br></br>
            </Card.Text>
            </div>
            </div>

            <div className="col-3">
            <div className="card card-block" style={{backgroundColor: 'black', color: 'white'}}>
            <Card.Img style={{backgroundColor: 'white', color: 'black'}} src={this.state.fi[2]} variant="top" width="150px" height="150px"></Card.Img>
            <Card.Text className="spaceMe">
              <span className="obj">Time: </span>
              <span className="val">{this.state.ft !==''?this.state.ft[2]:''}</span><br></br>
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Min: </span>
              <span className="val">{this.state.fmi !==''?this.state.fmi[2]:''}</span><br></br> 
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Max:</span> 
              <span className="val">{this.state.fm !==''?this.state.fm[2]:''}</span> <br></br> 
            </Card.Text> 
            <Card.Text className="spaceMe"> 
              <span className="obj">Temp: </span> 
              <span className="val">{this.state.fte !==''?this.state.fte[2]:''}</span> <br></br>
            </Card.Text>
            </div>
            </div>

            <div className="col-3">
            <div className="card card-block" style={{backgroundColor: 'black', color: 'white'}}>
            <Card.Img style={{backgroundColor: 'white', color: 'black'}} src={this.state.fi[3]} variant="top" width="150px" height="150px"></Card.Img>
            <Card.Text className="spaceMe">
              <span className="obj">Time: </span>
              <span className="val">{this.state.ft !==''?this.state.ft[3]:''}</span><br></br>
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Min: </span>
              <span className="val">{this.state.fmi !==''?this.state.fmi[3]:''}</span><br></br> 
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Max:</span> 
              <span className="val">{this.state.fm !==''?this.state.fm[3]:''}</span> <br></br> 
            </Card.Text> 
            <Card.Text className="spaceMe"> 
              <span className="obj">Temp: </span> 
              <span className="val">{this.state.fte !==''?this.state.fte[3]:''}</span> <br></br>
            </Card.Text>
            </div>
            </div>

            <div className="col-3">
            <div className="card card-block" style={{backgroundColor: 'black', color: 'white'}}>
            <Card.Img style={{backgroundColor: 'white', color: 'black'}} src={this.state.fi[4]} variant="top" width="150px" height="150px"></Card.Img>
            <Card.Text className="spaceMe">
              <span className="obj">Time: </span>
              <span className="val">{this.state.ft !==''?this.state.ft[4]:''}</span><br></br>
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Min: </span>
              <span className="val">{this.state.fmi !==''?this.state.fmi[4]:''}</span><br></br> 
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Max:</span> 
              <span className="val">{this.state.fm !==''?this.state.fm[4]:''}</span> <br></br> 
            </Card.Text> 
            <Card.Text className="spaceMe"> 
              <span className="obj">Temp: </span> 
              <span className="val">{this.state.fte !==''?this.state.fte[4]:''}</span> <br></br>
            </Card.Text>
            </div>
            </div>

            <div className="col-3">
            <div className="card card-block" style={{backgroundColor: 'black', color: 'white'}}>
            <Card.Img style={{backgroundColor: 'white', color: 'black'}} src={this.state.fi[5]} variant="top" width="150px" height="150px"></Card.Img>
            <Card.Text className="spaceMe">
              <span className="obj">Time: </span>
              <span className="val">{this.state.ft !==''?this.state.ft[5]:''}</span><br></br>
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Min: </span>
              <span className="val">{this.state.fmi !==''?this.state.fmi[5]:''}</span><br></br> 
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Max:</span> 
              <span className="val">{this.state.fm !==''?this.state.fm[5]:''}</span> <br></br> 
            </Card.Text> 
            <Card.Text className="spaceMe"> 
              <span className="obj">Temp: </span> 
              <span className="val">{this.state.fte !==''?this.state.fte[5]:''}</span> <br></br>
            </Card.Text>
            </div>
            </div>

            <div className="col-3">
            <div className="card card-block" style={{backgroundColor: 'black', color: 'white'}}>
            <Card.Img style={{backgroundColor: 'white', color: 'black'}} src={this.state.fi[6]} variant="top" width="150px" height="150px"></Card.Img>
            <Card.Text className="spaceMe">
              <span className="obj">Time: </span>
              <span className="val">{this.state.ft !==''?this.state.ft[6]:''}</span><br></br>
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Min: </span>
              <span className="val">{this.state.fmi !==''?this.state.fmi[6]:''}</span><br></br> 
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Max:</span> 
              <span className="val">{this.state.fm !==''?this.state.fm[6]:''}</span> <br></br> 
            </Card.Text> 
            <Card.Text className="spaceMe"> 
              <span className="obj">Temp: </span> 
              <span className="val">{this.state.fte !==''?this.state.fte[6]:''}</span> <br></br>
            </Card.Text>
            </div>
            </div>

            <div className="col-3">
            <div className="card card-block" style={{backgroundColor: 'black', color: 'white'}}>
            <Card.Img style={{backgroundColor: 'white', color: 'black'}} src={this.state.fi[7]} variant="top" width="150px" height="150px"></Card.Img>
            <Card.Text className="spaceMe">
              <span className="obj">Time: </span>
              <span className="val">{this.state.ft !==''?this.state.ft[7]:''}</span><br></br>
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Min: </span>
              <span className="val">{this.state.fmi !==''?this.state.fmi[7]:''}</span><br></br> 
            </Card.Text>
            <Card.Text className="spaceMe">
              <span className="obj">Max:</span> 
              <span className="val">{this.state.fm !==''?this.state.fm[7]:''}</span> <br></br> 
            </Card.Text> 
            <Card.Text className="spaceMe"> 
              <span className="obj">Temp: </span> 
              <span className="val">{this.state.fte !==''?this.state.fte[7]:''}</span> <br></br>
            </Card.Text>
            </div>
            </div>

          </div>
        </Card>
        <FooBar></FooBar>
    </div>
    );
  }
}

export default App;
