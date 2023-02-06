import React from 'react';
import styled from 'styled-components';
import { Component as Icon } from '@styled-icons/boxicons-solid';
import { Component, PropTypes, EditorTypes } from '@sitecloud/components';

const Container = styled.div`
  color: ${(props) => props.color || 'black'};
  border: 10px solid red;
  margin-top: 1rem;
`;

const Starter: Component = (props) => (
  <Container {...props}>
    <div>This is your first component</div>
  </Container>
);

Starter.props = {
  aspect: {
    color: {
      type: PropTypes.Color,
      default: 'black',
      editor: EditorTypes.Color,
      required: false,
      enabled: false
    }
  }
};

Starter.icon = <Icon size="1.2rem" />;

export default Starter;
