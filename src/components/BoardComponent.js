'use strict';

import React from 'react';
import TileComponent from './TileComponent'
import Row from 'elemental/lib/components/Row.js'

require('styles//Board.scss');

class BoardComponent extends React.Component {
  render() {
    var rows = this.props.board.map((row, rowIndex) => {
                  return (
                    <div key={rowIndex} className={'row row' + rowIndex}>
                      {
                        row.map((value, colIndex) => {
                          return (<TileComponent key={colIndex} rowIndex={rowIndex} colIndex={colIndex} value={value} />);
                        })
                      }
                    </div>
                  )
              })
    return (
        <div className='container-fluid board'>
          {rows}
        </div>
      )
    }
}

BoardComponent.displayName = 'Board';

// Uncomment properties you need
// BoardComponent.propTypes = {};
// BoardComponent.defaultProps = {};

export default BoardComponent;
