import React from 'react';
import styled from 'styled-components';
import { Component as Icon } from '@styled-icons/boxicons-solid';
import { PropTypes, EditorTypes } from 'sitecloud-components';

const Container = styled.div`
  color: ${(props) => props.color || 'black'};
`;

const Starter = ({ ...props }) => (
  <Container {...props}>This is your first component</Container>
);

Starter.props = {
  aspect: {
    color: {
      type: PropTypes.Color,
      default: 'blue',
      editor: EditorTypes.Color,
      required: false,
      enabled: false
    }
  }
};

Starter.icon = <Icon size="1.2rem" />;

export default Starter;
