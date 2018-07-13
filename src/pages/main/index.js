import React, { Component, Fragment } from "react";
import MapGL, { Marker } from "react-map-gl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    idUser: "",
    error: null,
    latitude: 0,
    longitude: 0,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: 0,
      longitude: 0,
      zoom: 0
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  handlePosition() {
    const options = {
      enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(
      pos => {
        const center = [pos.coords.longitude, pos.coords.latitude];
        this.setState({
          center: center
        });
      },
      err => {
        console.log(err);
      },
      options
    );
  }

  _resize = () => {
    const options = {
      enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lngLat = pos.coords;
        this.setState({
          viewport: {
            ...this.state.viewport,
            width: window.innerWidth,
            height: window.innerHeight,
            latitude: lngLat.latitude,
            longitude: lngLat.longitude,
            zoom: 10
          }
        });
      },
      err => {
        console.log(err);
      },
      options
    );
  };

  handleMapClick = e => {
    if (e.target.id !== "remove") {
      const [longitude, latitude] = e.lngLat;

      this.setState({
        open: true,
        newUserInput: "",
        latitude: latitude,
        longitude: longitude
      });
    }
  };

  handleClose = () => {
    this.setState({ open: false, newUserInput: "" });
  };

  addUserRequest = () => {
    return new Promise(resolve => {
      this.props.addUserRequest(
        this.state.newUserInput,
        this.state.latitude,
        this.state.longitude
      );

      resolve();
    });
  };

  handleSave = async () => {
    this.setState({
      open: false,
      newUserInput: this.state.newUserInput,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    });

    if (!this.state.newUserInput) return;

    console.log("maiko");

    await this.addUserRequest();

    console.log(this.props.error);

    this.setState({
      newUserInput: ""
    });

    //!!this.props.error && toast(this.props.error);

    //console.log(this.props.error);
    //console.log(this.state.error);
    /*if (this.props.error === null) {
      toast("Usuário adicionado com sucesso!");
    } else {
      toast.warn("Erro ao adicionar usuário!");
    }*/
  };

  _onKeyPress = event => {
    if (event.charCode === 13) {
      event.preventDefault();
      this.handleSave();
    }
  };

  handleRemoveUser = id => {
    //console.log(id);
    //this.props.removeUserRequest(this.props.id);
    //this.setState({
    //idUser: ""
    //});
  };

  render() {
    return (
      <div>
        <MapGL
          id="mapBox"
          {...this.state.viewport}
          onClick={this.handleMapClick}
          animate={true}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxApiAccessToken={
            "pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"
          }
          onViewportChange={viewport => this.setState({ viewport })}
        >
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
                    height: 48,
                    border: "5px solid #7159C1"
                  }}
                  src={user.avatar}
                  alt="Avatar"
                />
              </Marker>
            </Fragment>
          ))}
          {!!this.props.count && (
            <SideBar removeUser={this.handleRemoveUser(this.props.user.id)} />
          )}

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

          <ToastContainer />
        </MapGL>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.users.data,
  count: state.users.data.length,
  error: state.users.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
