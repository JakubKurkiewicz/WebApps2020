document.addEventListener('DOMContentLoaded', function () { return StartGame(); });
function StartGame() {
    var board = new Board(5, 5);
}
var Board = /** @class */ (function () {
    function Board(size, sizeWin) {
        this.gameBoard = document.querySelector('#gameBoard');
        this.winner = document.querySelector('#winner');
        this.currSign = 'X';
        this.size = size;
        this.sizeWin = sizeWin;
        if (this.sizeWin <= this.size && this.size >= 3) {
            this.createBoard();
            this.clickHandler();
        }
        else {
            this.gameBoard.innerHTML = 'Złe parametry gry, proszę je zmienić!!!';
        }
    }
    Board.prototype.createBoard = function () {
        var table = document.createElement('table');
        this.boardTable = table;
        this.createCells();
        this.gameBoard.appendChild(this.boardTable);
    };
    Board.prototype.createCells = function () {
        var cellsArray = [];
        for (var i = 0; i < this.size; i++) {
            var row = document.createElement('tr');
            var rowArray = [];
            for (var j = 0; j < this.size; j++) {
                var cell = this.createCell(i, j);
                rowArray.push(cell);
                row.appendChild(cell.element);
            }
            cellsArray.push(rowArray);
            this.boardTable.appendChild(row);
        }
        this.cells = cellsArray;
    };
    Board.prototype.createCell = function (x, y) {
        var cellElement = document.createElement('td');
        var cell = new Cell(x, y, cellElement);
        return cell;
    };
    Board.prototype.Horizontal = function (row) {
        var count = 0;
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cells[row][i].cellValue === this.currSign) {
                count++;
            }
        }
        var isWin = false;
        if (count === this.sizeWin) {
            isWin = true;
        }
        return isWin;
    };
    Board.prototype.Vertical = function (col) {
        var count = 0;
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cells[i][col].cellValue === this.currSign) {
                count++;
            }
        }
        var isWin = false;
        if (count === this.sizeWin) {
            isWin = true;
        }
        return isWin;
    };
    Board.prototype.Diag_first = function () {
        var count = 0;
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cells[i][i].cellValue === this.currSign) {
                count++;
            }
        }
        var isWin = false;
        if (count === this.sizeWin) {
            isWin = true;
        }
        return isWin;
    };
    Board.prototype.Diag_second = function () {
        var count = 0;
        for (var i = (this.size - 1), j = 0; i >= 0; i--, j++) {
            if (this.cells[i][j].cellValue === this.currSign) {
                count++;
            }
        }
        var isWin = false;
        if (count === this.sizeWin) {
            isWin = true;
        }
        return isWin;
    };
    Board.prototype.checkWin = function (col, row) {
        var isWin = this.Vertical(col);
        if (!isWin) {
            isWin = this.Horizontal(row);
        }
        if (!isWin) {
            isWin = this.Diag_first();
        }
        if (!isWin) {
            isWin = this.Diag_second();
        }
        return isWin;
    };
    Board.prototype.clickHandler = function () {
        var _this = this;
        this.cells.forEach(function (row) {
            row.forEach(function (cell) {
                cell.element.addEventListener('click', function () { return _this.writeToCell(cell); });
            });
        });
    };
    Board.prototype.switchSign = function () {
        this.currSign = this.currSign === 'X' ? 'O' : 'X';
    };
    Board.prototype.writeToCell = function (cell) {
        if (cell.element.innerHTML === '') {
            cell.element.innerHTML = this.currSign;
            cell.cellValue = this.currSign;
            var row = cell.posY;
            var column = cell.posX;
            var isWin = this.checkWin(column, row);
            if (isWin) {
                this.winner.innerHTML = 'Zwyciestwo : ' + this.currSign;
                this.cells.forEach(function (row) {
                    row.forEach(function (cell) {
                        var newCell = cell.element.cloneNode(true);
                        cell.element.parentNode.replaceChild(newCell, cell.element);
                    });
                });
            }
            else {
                this.switchSign();
            }
        }
    };
    return Board;
}());
var Cell = /** @class */ (function () {
    function Cell(x, y, element) {
        this.posY = x;
        this.posX = y;
        this.element = element;
    }
    return Cell;
}());
