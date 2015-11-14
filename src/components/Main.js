require('normalize.css');
require('styles//App.scss');

import React from 'react';
import BoardComponent from './BoardComponent';
import GameEngine from '../engines/GameEngine';
import SkyLight from 'react-skylight';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'

class AppComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
                      board: [
                              [0, 0, 4, 0],
                              [0, 0, 0, 0],
                              [0, 0, 2, 0],
                              [0, 0, 0, 0],
                            ],
                      score: 0,
                      maxScore: window.localStorage.getItem('maxScore') || 0
                    };
      this.game = new GameEngine(this.state.board);
  }

  updateState() {
    var gameStatus = this.game.run();
    this.setState({ board: gameStatus.board, score: gameStatus.score });
    if(gameStatus.score >= this.state.maxScore) {
      this.setState({maxScore: gameStatus.score})
      window.localStorage.setItem('maxScore', gameStatus.score);
    }
  }

  handleEvent(e) {
    const UP = 38, DOWN=40, LEFT = 37, RIGHT = 39, ESC = 27;

    if(e.which === ESC) {
      this.game.reset();
      this.updateState();
    } else if(!this.game.isGameOver()) {
      switch (e.which) {
        case LEFT:
                  this.game.moveLeft();
                  this.updateState();
                  break;
        case UP:
                  this.game.moveUp();
                  this.updateState();
                  break;
        case RIGHT:
                  this.game.moveRight();
                  this.updateState();
                  break;
        case DOWN:
                  this.game.moveDown();
                  this.updateState();
                  break;
      }
    }
    setTimeout(() => {}, 500);
  }

  resetGame() {
    this.game.reset();
    this.updateState();
  }

  componentDidMount() {
    const UP = 38, DOWN=40, LEFT = 37, RIGHT = 39, ESC = 27;

    document.body.addEventListener('keydown', this.handleEvent.bind(this));
    $("body").touchwipe({
     wipeLeft: () => { this.handleEvent({which: LEFT}); },
     wipeRight: () => { this.handleEvent({which: RIGHT}); },
     wipeUp: () => { this.handleEvent({which: DOWN}); },
     wipeDown: () => { this.handleEvent({which: UP}); },
     min_move_x: 20,
     min_move_y: 20,
     preventDefaultEvents: true
   });

   $('.reset').touchwipe('touchend', this.resetGame.bind(this));
  }

  render() {
    const tooltip = (
                      <Tooltip id='info'>Use arrow keys or swipe screen to play. When two tiles with the same number touch, they merge into one!</Tooltip>
                    );
    var  GameOver = (
                  <Modal dialogClassName="game-over" bsSize="small" show={this.game.isGameOver()} onHide={() => {}}>
                    <Modal.Header>
                      <Modal.Title>Ooh, you are done</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Your Score is {this.state.score}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button bsStyle='danger' type='reset' onClick={this.resetGame.bind(this)}>Reset</Button>
                    </Modal.Footer>
                  </Modal>
                )
    return (
      <div className='index'>
        {GameOver}
        <div className=''>
          <div className='tab'>
            <span className='title left'> 2048 </span>
            <OverlayTrigger placement="bottom" overlay={tooltip}>
                <span className='info left action'>
                  <a href="#" target='_blank'>
                    <Glyphicon glyph="question-sign" />
                  </a>
                </span>
            </OverlayTrigger>
            <span className='score right'>
              Score: {this.state.score} Max: {this.state.maxScore}
            </span>
            <span className="reset right" onClick={this.resetGame.bind(this)}>
              <Glyphicon glyph="refresh action" />
            </span>
          </div>
        </div>
        <BoardComponent board={this.state.board} />
      </div>
    );
  }
}

AppComponent.displayName = 'App';

export default AppComponent;
