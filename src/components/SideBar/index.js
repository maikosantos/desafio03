import React from "react";

import { connect } from "react-redux";

import "font-awesome/css/font-awesome.css";

import {
  Container,
  User,
  DivImagem,
  DivNames,
  DivLeft,
  DivRight
} from "./styles";

const SideBar = ({ user }) => (
  <Container>
    {user.map(user => (
      <User>
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
            style={{ color: "#D45454", paddingRight: "20px" }}
            className="fa fa-times-circle"
            aria-hidden="true"
          />
          <i className="fa fa-angle-right" />
        </DivRight>
      </User>
    ))}
  </Container>
);

const mapStateToProps = state => ({
  user: state.users.data
});

export default connect(mapStateToProps)(SideBar);
