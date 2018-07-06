import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-initial;

  max-height: 760px;
  width: 320px;
  margin: 20px 0px 20px 20px;
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

  /*border: 1px solid;*/
`;

export const User = styled.div`
  width: 280px;
  height: 59px;
  display: flex;
  flex-direction: row;
`;

export const DivImagem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    width: 60px;
    height: 60px;
  }
`;

export const DivNames = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
  padding-left: 2px;

  strong {
    font-size: 16px;
    color: #333;
  }

  small {
    font-size: 14px;
    color: #999;
  }
`;

export const DivIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: flex-end;
  flex: 1 0;
`;
