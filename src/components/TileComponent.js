'use strict';

import React from 'react';
import Col from 'react-bootstrap/lib/Col'

require('styles//Tile.scss');

class TileComponent extends React.Component {
  render() {
    return (
      <Col md={3} lg={3} sm={3} xs={3}  className={'tile tile' + this.props.value} row={this.props.rowIndex} col={this.props.colIndex}>
        <span className='text'>{this.props.value}</span>
      </Col>
    );
  }
}

TileComponent.displayName = 'Tile';

// Uncomment properties you need
// TileComponent.propTypes = {};
// TileComponent.defaultProps = {};

export default TileComponent;
