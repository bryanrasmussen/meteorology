import React from 'react';
import ReactDOM from 'react-dom';
import Meteorology from './components/Meteorology';
import 'whatwg-fetch'

class Client extends React.Component {
    //Not enough state required here to load redux
    constructor(props) {
        super(props);
        this.state = {
            weatherData: this.props.weatherData,
            errorMessage: null,
            city: this.props.weatherData.name
        }
        // using this binding due to the same react code running on both client and server
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        window.onpopstate = (event) => {
            if (event.state && event.state.name) {
                this.setState({weatherData: event.state});
            }
            if (window.location.href.search("[?&]city=") === -1) {
                document.location = window.location.href;
            }
        };     
    }

    onSubmit(city) {
        
        window.fetch('/api?city=' + city)
            .then(response => {
                return response.json()
            }).then(json => {
                if (json.main) {
                  this.setState({weatherData: json, errorMessage: null, city});
                  //it worked to get the data, therefore pushstate if found
                  if (window.history.pushState) {
                      window.history.pushState(this.state.weatherData, 'Meteorology: ' + city, '/?city=' + city);
                  }
                } else {
                  this.setState({errorMessage: 'city ' + city + ' returned ' + json.message});
                }
            }).catch(err => {
                this.setState({errorMessage: err});
        });

    }

    render() {
        return <Meteorology errorMessage={this.state.errorMessage} weatherData={this.state.weatherData} onSubmit={this.onSubmit}/>
    }

}


document.addEventListener("DOMContentLoaded", function() {
    ReactDOM.render(
        <Client weatherData={window.weatherData}/>,
        document.getElementById('clientSideApp')
      );
 });
