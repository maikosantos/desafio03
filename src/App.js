import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";

import "mapbox-gl/dist/mapbox-gl.css";

export default class Map extends Component {
  state = {
    open: false,
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

  handleMapClick = e => {
    const [latitude, longitude] = e.lngLat;

    this.setState({ open: true });

    console.log(`Latitude: ${latitude} \nLongitude: ${longitude}`);
  };

  handleClose = () => {
    this.setState({ open: false });
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
              id="novoUsuario"
              label="Usuário no Github"
              placeholder="Ex: maikosantos"
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={this.handleClose}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              onClick={this.handleClose}
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
      </MapGL>
    );
  }
}
