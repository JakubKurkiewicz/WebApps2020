document.addEventListener('DOMContentLoaded', function () { return StartGame(); });

function StartGame() {
    let board = new Board(5,5)
}

class Board{
    size: number;
    sizeWin: number;
    cells: Array<Array<Cell>>;
    boardTable: HTMLTableElement;
    gameBoard: HTMLDivElement = document.querySelector('#gameBoard');
    winner: HTMLDivElement = document.querySelector('#winner')
    currSign: string = 'X'

    constructor(size: number, sizeWin: number){
        this.size = size;
        this.sizeWin = sizeWin;
        if(this.sizeWin <= this.size && this.size >= 3){
            this.createBoard()
            this.clickHandler();
        }else{
            this.gameBoard.innerHTML = 'Złe parametry gry, proszę je zmienić!!!';
        }
    }

    createBoard(){
        let table = document.createElement('table');
        this.boardTable = table;
        this.createCells();
        this.gameBoard.appendChild(this.boardTable)
    }

    createCells(){
        let cellsArray = [];
        for(let i = 0; i < this.size; i++){
            let row = document.createElement('tr');
            let rowArray = [];
            for(let j = 0; j < this.size; j++){
                let cell = this.createCell(i, j);
                rowArray.push(cell);
                row.appendChild(cell.element);
            }
            cellsArray.push(rowArray);
            this.boardTable.appendChild(row);
        }
        this.cells = cellsArray;
    }

    createCell(x: number, y: number){
        let cellElement = document.createElement('td');
        let cell = new Cell(x, y , cellElement);
        return cell;
    }
    
    Horizontal(row: number){
        let count = 0;
        for(let i = 0 ; i < this.cells.length ; i++){
            if(this.cells[row][i].cellValue === this.currSign){
                count++
            }
        }
        let isWin = false;
        if(count === this.sizeWin){
            isWin = true;
        }
        return isWin;
    }

    Vertical(col: number){
        let count = 0;
        for(let i = 0 ; i < this.cells.length ; i++){
            if(this.cells[i][col].cellValue === this.currSign){
                count++
            }
        }
        let isWin = false;
        if(count === this.sizeWin){
            isWin = true;
        }
        return isWin;
    }

    Diag_first(){
        let count = 0;
        for(let i = 0; i < this.cells.length; i++){
            if(this.cells[i][i].cellValue === this.currSign){
                count++
            }
        }
        let isWin = false;
        if(count === this.sizeWin){
            isWin = true;
        }
        return isWin;
    }

    Diag_second(){
        let count = 0;
        for (let i = (this.size - 1), j = 0; i >= 0; i--, j++) {
            if (this.cells[i][j].cellValue === this.currSign) {
                count++;
            }
        }
        let isWin = false;
        if (count === this.sizeWin) {
            isWin = true;
        }
        return isWin;
    }

    checkWin(col: number, row: number){

        let isWin = this.Vertical(col);

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
    }

    clickHandler(){
        this.cells.forEach(row =>{
            row.forEach(cell =>{
                cell.element.addEventListener('click', () => this.writeToCell(cell))
            })
        })
    }

    switchSign(){
        this.currSign = this.currSign === 'X' ? 'O' : 'X';
    }

    writeToCell(cell: Cell){
        if(cell.element.innerHTML === ''){
            cell.element.innerHTML = this.currSign;
            cell.cellValue = this.currSign;
            let row = cell.posY;
            let column = cell.posX;

            let isWin = this.checkWin(column, row);
            
            if(isWin){
                this.winner.innerHTML = 'Zwyciestwo : ' + this.currSign;

                this.cells.forEach(row =>{
                    row.forEach(cell =>{
                        var newCell = cell.element.cloneNode(true);
                        cell.element.parentNode.replaceChild(newCell, cell.element);
                    })
                })
            }else{
                this.switchSign();
            }
        }
    }    
}

class Cell{
    posX: number;
    posY: number;
    element : HTMLElement;
    cellValue: string;
    constructor(x: number, y: number, element: HTMLElement){
        this.posY = x;
        this.posX = y;
        this.element = element;
    }
}






