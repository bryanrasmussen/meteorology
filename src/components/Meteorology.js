import React from 'react';

class Meteorology extends React.Component {

  constructor(props) {
    super(props);

    // using this binding due to the same react code running on both client and server
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onSubmit(event) {
    event.preventDefault();
    const city = event.target.elements.city.value;
    
    this.props.onSubmit(city);
  }

  render() {
    //TODO difference in obj. structure between server side and client side rendering.
    const weatherData = (this.props.weatherData.weatherData) ? this.props.weatherData.weatherData : this.props.weatherData;
    const main = weatherData.main;
    const wind = weatherData.wind;
    const searchMarkup = <li className="list-group-item">
    <form className="form-inline" method="GET" action="/" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" id="city" name="city" placeholder="City" />
        </div>
        <button  type="submit" className="btn btn-default">Search</button>
      </form>
  </li>;

    if (!Boolean(main)) {
      //this is in case we come in with a malformed city name, or not found city name
      return <div className="widget" style={{margin: '10px', width: '300px'}}>
      <div className="panel panel-info">
        {this.props.errorMessage &&
          <p style={{color: 'red'}}><b>{this.props.errorMessage}</b></p>
        }
        {weatherData.message &&
          <p style={{color: 'red'}}><b>{weatherData.message}</b></p>
        }
        <ul className="list-group">
          {searchMarkup}
        </ul>
      </div>
    </div>;
    }

    const direction = () => {
      /*Following taken from 
      https://stackoverflow.com/questions/36475255/i-have-wind-direction-data-coming-from-openweathermap-api-and-the-data-is-repre
      with some changes
      */
      let deg = wind.deg;
      const sectors = ['Nord','Nord-Øst','Øst','Syd-Øst','Syd','Syd-Vest',
      'Vest','Nord-Vest'];
      
      deg += 22.5;
      deg = (deg < 0) ? 360 - Math.abs(deg) % 360 : deg % 360;
      
      const which = parseInt(deg / 45);
      return sectors[which];
    }
    return <div className="widget" style={{margin: '10px', width: '300px'}}>
    <div className="panel panel-info">
      <div className="panel-heading">Weather in <b>{weatherData.name}</b></div>
      {this.props.errorMessage &&
        <p style={{color: 'red'}}><b>{this.props.errorMessage}</b></p>
      }
      <ul className="list-group">
        <li className="list-group-item">Temperature: <b>{main.temp}°C</b></li>
        <li className="list-group-item">Humidity: <b>{main.humidity}</b></li>
        <li className="list-group-item">Wind: <b>{wind.speed} m/s {direction()}</b></li>
        {searchMarkup}
      </ul>
    </div>
</div>;
  }
}

export default Meteorology;
