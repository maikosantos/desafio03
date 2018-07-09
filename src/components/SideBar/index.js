import React from "react";

import { connect } from "react-redux";

import {
  Container,
  User,
  DivImagem,
  DivNames,
  DivLeft,
  DivRight
} from "./styles";

this.handleRemov = () => {
  alert("Ok");
};

const SideBar = ({ user }) => (
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
          <a onClick={this.handleRemove}>
            <i
              style={{ color: "#D45454", paddingRight: "20px" }}
              className="fa fa-times-circle"
              aria-hidden="true"
            />
          </a>
          <i style={{ color: "#999999" }} className="fa fa-angle-right" />
        </DivRight>
      </User>
    ))}
  </Container>
);

const mapStateToProps = state => ({
  user: state.users.data
});

export default connect(mapStateToProps)(SideBar);
