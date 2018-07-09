import React, { Component, Fragment } from "react";
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
      latitude: "",
      longitude: "",
      zoom: ""
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
        height: window.innerHeight,
        latitude: -29.688,
        longitude: -51.1333,
        zoom: 10
      }
    });
  };

  //const [latitude, longitude];
  handleMapClick = e => {
    const [longitude, latitude] = e.lngLat;

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
    this.setState({
      open: false,
      newUserInput: this.state.newUserInput,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    });

    if (!this.state.newUserInput) return;
    console.log(this.state.newUserInput);
    console.log(
      `Latitude: ${this.state.latitude} \nLongitude: ${this.state.longitude}`
    );

    this.props.addUserRequest(
      this.state.newUserInput,
      this.state.latitude,
      this.state.longitude
    );
    this.setState({
      newUserInput: ""
    });
  };

  _onKeyPress = event => {
    if (event.charCode === 13) {
      event.preventDefault();
      this.handleSave();
    }
  };

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
              onKeyPress={this._onKeyPress}
              autoFocus
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
            >
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
        {this.props.user.map(user => (
          <Fragment key={user.id}>
            <Marker
              latitude={user.latitude}
              longitude={user.longitude}
              onClick={this.handleMapClick}
              captureClick={true}
            >
              <img
                style={{
                  borderRadius: 100,
                  width: 48,
                  height: 48
                }}
                src={user.avatar}
                alt="Avatar"
              />
            </Marker>
          </Fragment>
        ))}
        {!!this.props.count && <SideBar />}
      </MapGL>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.data,
  count: state.users.data.length
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
