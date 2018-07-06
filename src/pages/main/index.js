import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

import "mapbox-gl/dist/mapbox-gl.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as UsersActions } from "../../store/ducks/users";

import SideBar from "../../components/SideBar";

class Main extends Component {
  state = {
    open: false,
    newUserInput: "",
    latitude: "",
    longitude: "",
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -29.688,
      longitude: -51.1333,
      zoom: 10
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  //const [latitude, longitude];
  handleMapClick = e => {
    const [latitude, longitude] = e.lngLat;

    this.setState({
      open: true,
      newUserInput: "",
      latitude: latitude,
      longitude: longitude
    });

    //console.log(`Latitude: ${latitude} \nLongitude: ${longitude}`);
  };

  handleClose = () => {
    this.setState({ open: false, newUserInput: "" });

    //console.log(`Latitude: ${latitude} \nLongitude: ${longitude}`);
  };

  handleSave = () => {
    this.setState({ open: false, newUserInput: this.state.newUserInput });

    if (!this.state.newUserInput) return;
    console.log(this.state.newUserInput);
    console.log(
      `Latitude: ${this.state.latitude} \nLongitude: ${this.state.longitude}`
    );

    this.props.addUserRequest(this.state.newUserInput);
    this.setState({ newUserInput: "" });
  };

  //handleAddRepository = event => {
  //event.preventDefault();
  //this.props.addFavoriteRequest(this.state.repositoryInput);
  //this.setState({ repositoryInput: "" });
  //};

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={
          "pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"
        }
        onViewportChange={viewport => this.setState({ viewport })}
      >
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Adicionar novo usuário"}
          </DialogTitle>
          <DialogContent>
            <TextField
              id="newUserInput"
              label="Usuário no Github"
              placeholder="Ex: maikosantos"
              margin="normal"
              value={this.state.newUserInput}
              onChange={e => this.setState({ newUserInput: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={this.handleClose}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              onClick={this.handleSave}
              color="primary"
              autoFocus
            >
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
        <Marker
          latitude={-29.688}
          longitude={-51.1333}
          onClick={this.handleMapClick}
          captureClick={true}
        >
          <img
            style={{
              borderRadius: 100,
              width: 48,
              height: 48
            }}
            src="https://avatars0.githubusercontent.com/u/3418695?v=4"
          />
        </Marker>
        <SideBar />
      </MapGL>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
