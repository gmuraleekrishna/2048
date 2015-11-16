require('normalize.css');
require('styles//App.scss');

import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import Hammer from 'react-hammerjs';
import BoardComponent from './BoardComponent';
import GameEngine from '../engines/GameEngine';
import Header from './HeaderComponent'


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
                      maxScore: window.localStorage.getItem('maxScore') || 0,
                      allowedMoves: { left: true, up: true, down: true, right: true }
                    };
      this.game = new GameEngine(this.state.board);
  }

  updateState() {
    var gameStatus = this.game.run();
    this.setState({ board: gameStatus.board, score: gameStatus.score, allowedMoves: gameStatus.allowedMoves });
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
                  if(this.state.allowedMoves.left) {
                    this.game.moveLeft();
                    this.updateState();
                  }
                  break;
        case UP:
                  if(this.state.allowedMoves.up) {
                    this.game.moveUp();
                    this.updateState();
                  }
                  break;
        case RIGHT:
                  if(this.state.allowedMoves.right) {
                    this.game.moveRight();
                    this.updateState();
                  }
                  break;
        case DOWN:
                  if(this.state.allowedMoves.down) {
                    this.game.moveDown();
                    this.updateState();
                  }
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
  }

  render() {
    var  GameOver = (
                  <Modal dialogClassName="game-over" bsSize="small" show={this.game.isGameOver()} onHide={() => {}}>
                    <Modal.Header>
                      <Modal.Title>Ooh, you are done</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Your Score is {this.state.score}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button bsStyle='danger' type='reset' onTouchEnd={this.resetGame.bind(this)}>Reset</Button>
                    </Modal.Footer>
                  </Modal>
                )
    return (
      <div className='index'>
        {GameOver}
        <BoardComponent board={this.state.board} />
      </div>
    );
  }
}

AppComponent.displayName = 'App';

export default AppComponent;
