require('normalize.css');
require('styles/App.css');

import React from 'react';
import BoardComponent from './BoardComponent';
import GameEngine from '../engines/GameEngine';


var game;

class AppComponent extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
                      board: [
                              [0, 0, 4, 0],
                              [0, 0, 0, 0],
                              [0, 0, 2, 0],
                              [0, 0, 0, 0]
                            ]
                    };
      game = new GameEngine(this.state.board);
  }

  updateState() {
    var nextBoard = game.run();
    this.setState({ board: nextBoard });
  }

  handleKeyPress(e) {
    const UP = 38, DOWN=40, LEFT = 37, RIGHT = 39, ESC = 27;
    e.preventDefault();


    if(!game.isGameOver()){
      switch (e.which) {
        case LEFT:
                  game.moveLeft();
                  this.updateState();
                  break;
        case UP:
                  game.moveUp();
                  this.updateState();
                  break;
        case RIGHT:
                  game.moveRight();
                  this.updateState();
                  break;
        case DOWN:
                  game.moveDown();
                  this.updateState();
                  break;
        case ESC:
                  game.reset();
                  this.updateState();
                  break;
      }
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyPress.bind(this));
  }

  render() {
    return (
      <div className='index'>
        <BoardComponent board={this.state.board} />
      </div>
    );
  }
}

AppComponent.displayName = 'App';

AppComponent.defaultProps = {
};

export default AppComponent;
