import React from "react";

import { connect } from "react-redux";

import { Container, User, DivImagem, DivNames, DivIcon } from "./styles";

const SideBar = ({ user }) => (
  <Container>
    {user.map(user => (
      <User>
        <DivImagem>
          <img src={user.avatar} alt="Avatar" />
        </DivImagem>
        <DivNames>
          <strong>{user.name}</strong>
          <small>{user.login}</small>
        </DivNames>
        <DivIcon>
          <i className="fa fa-angle-right" />
        </DivIcon>
      </User>
    ))}
  </Container>
);

const mapStateToProps = state => ({
  user: state.users.data
});

export default connect(mapStateToProps)(SideBar);
