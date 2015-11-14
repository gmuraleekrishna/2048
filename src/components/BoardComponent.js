'use strict';

import React from 'react';
import TileComponent from './TileComponent'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'

require('styles//Board.scss');

class BoardComponent extends React.Component {
  render() {
    var rows = this.props.board.map((row, rowIndex) => {
                  return (
                    <Row key={rowIndex} className={' a-row row' + rowIndex}>
                      {
                        row.map((value, colIndex) => {
                          return (<TileComponent key={colIndex} rowIndex={rowIndex} colIndex={colIndex} value={value} />);
                        })
                      }
                    </Row>
                  )
              })
    return (
        <Grid className='board'>
          {rows}
        </Grid>
      )
    }
}

BoardComponent.displayName = 'Board';

// Uncomment properties you need
// BoardComponent.propTypes = {};
// BoardComponent.defaultProps = {};

export default BoardComponent;
