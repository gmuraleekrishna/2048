require('normalize.css');
require('styles/App.scss');

import React from 'react';
import BoardComponent from './BoardComponent';
import GameEngine from '../engines/GameEngine';
import SkyLight from 'react-skylight';

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
                      score: 0
                    };
      this.game = new GameEngine(this.state.board);
  }

  showPopup() {
    this.refs.simpleDialog.show();
  }

  updateState() {
    var gameStatus = this.game.run();
    this.setState({ board: gameStatus.board, score: gameStatus.score });
  }

  handleKeyPress(e) {
    const UP = 38, DOWN=40, LEFT = 37, RIGHT = 39, ESC = 27;
    e.preventDefault();

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
    } else {
      this.showPopup();
    }
  }

  resetGame() {
    this.game.reset();
    this.updateState();
  }

  componentDidMount() {

    document.body.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  render() {
    var dialogStyles =  {
                        width: '30%',
                        height: '100px',
                        position: 'fixed',
                        top: '46%',
                        left: '34%',
                        marginLeft: '0',
                        marginTop: '0',
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        zIndex: 100,
                        padding: '10px 25px',
                        boxShadow: '0'
                      };
    var closeButtonStyle = {
                    cursor: 'pointer',
                    float: 'right',
                    fontSize: '1.6em',
                    margin: '-6px -4px'
                }
    return (
      <div className='index'>
        <SkyLight ref="simpleDialog" title="Game over!!" closeButtonStyle={closeButtonStyle} dialogStyles={dialogStyles}>
          No more moves, your score is {this.state.score}
        </SkyLight>
        <div className='tab'>
          <span className='title'> 2048 </span>
          <span className='reset' onClick={this.resetGame.bind(this)}></span>
          <span className='score'>
            Score: {this.state.score}
          </span>
        </div>
      </div>
    )
  }
}

AppComponent.displayName = 'App';

export default AppComponent;
