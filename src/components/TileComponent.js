'use strict';

import React from 'react';

require('styles//Tile.scss');

class TileComponent extends React.Component {
  render() {
    return (
      <div className={'tile tile' + this.props.value} row={this.props.rowIndex} col={this.props.colIndex}>
        <span className='text'>{this.props.value}</span>
      </div>
    );
  }
}

TileComponent.displayName = 'Tile';

// Uncomment properties you need
// TileComponent.propTypes = {};
// TileComponent.defaultProps = {};

export default TileComponent;
