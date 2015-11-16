'use strict';

import React from 'react';
import { Tooltip, OverlayTrigger, Glyphicon } from 'react-bootstrap'

require('styles//Header.scss');

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tooltip = (
                      <Tooltip id='info'>Use arrow keys or swipe screen to play. When two tiles with the same number touch, they merge into one!</Tooltip>
                    );
    return (
      <div className="header-component">
        <div className='tab'>
          <span className='title text left'> 2048 </span>
          <OverlayTrigger placement="bottom" overlay={tooltip}>
              <span className='info left action'>
                <Glyphicon glyph="question-sign" />
              </span>
          </OverlayTrigger>
          <span className='score text right'>
            Score: {this.props.score} Max: {this.props.maxScore}
          </span>
          <span className="reset action right" onClick={this.props.resetGame}>
            <Glyphicon glyph="refresh" />
          </span>
        </div>
      </div>
    );
  }
}

HeaderComponent.displayName = 'Header';

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
