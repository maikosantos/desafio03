import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as UsersActions } from "../../store/ducks/users";

import {
  Container,
  User,
  DivImagem,
  DivNames,
  DivLeft,
  DivRight
} from "./styles";

const SideBar = ({ user, removeUser }) => (
  <Container>
    {user.map(user => (
      <User key={user.id}>
        <DivLeft>
          <DivImagem>
            <img src={user.avatar} alt="Avatar" />
          </DivImagem>
          <DivNames>
            <strong>{user.name}</strong>
            <small>{user.login}</small>
          </DivNames>
        </DivLeft>
        <DivRight>
          <i
            id="remove"
            onClick={() => removeUser(user.id)}
            style={{ color: "#D45454", paddingRight: "20px" }}
            className="fa fa-times-circle"
            aria-hidden="true"
          />

          <i style={{ color: "#999999" }} className="fa fa-angle-right" />
        </DivRight>
      </User>
    ))}
  </Container>
);

const mapStateToProps = state => ({
  user: state.users.data
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
