/*
 * @Description: 
 * @Autor: YuBiao
 * @Date: 2019-09-05 14:55:57
 */
var row = 16;
var col = 16;
var gameover = false;

//棋盘
var Checkerboard;
var game = document.querySelector('.game');
var button = document.querySelector('button');
button.ClassList
//  0为空 1为黑 2为白
var chessstate = 1;

/**
 * 初始化 创建一个和棋盘相对应的二维数组
 */
function initCheckerboard() {
    Checkerboard = new Array(row);
    for (let i = 0; i < Checkerboard.length; i++) {
        Checkerboard[i] = new Array(col);

        //填充
        Checkerboard[i].fill(0);
    };
    // console.log(Checkerboard);
}
initCheckerboard();

/**
 * 根据坐标在数组上面显示状态 并在页面中显示棋子
 * @param {*} row 
 * @param {*} col 
 */
function playchess(row, col) {
    if (row < 0 || row > 15 || col < 0 || col > 15) {
        //当超出范围时
        return
    }
    if (Checkerboard[row][col]) {
        //当有已经有棋子时 
        return
    }
    Checkerboard[row][col] = chessstate;
    var chess = document.createElement('div');

    chess.className = 'chess ' + (chessstate === 1 ? "black" : "white");
    // console.log(chess.className);
    //40是两个棋子之前的距离
    chess.style.top = `${row * 40}px`;
    chess.style.left = `${col * 40}px`;
    game.appendChild(chess);

    if (chessstate === 1) {
        //之前是黑子
        chessstate = 2;
    }
    else {
        //之前是白棋
        chessstate = 1;
    }
    if (win(row, col)) {
        gameover = true;
        alert('恭喜你赢了!');
        init();
    }

}

/**
 * 点击棋盘，根据玩家点击的位置判断棋子生成位置
 */
function getplace() {

    game.addEventListener('click', function (e) {
        //如果已经有棋子了，返回
        if (e.target.classList.contains("chess")) {
            return;
        }
        var disX = e.offsetX - 20;
        var disY = e.offsetY - 20;
        // console.log(disX, disY);

        //40是两个棋子之前的距离
        // Math.round 四舍五入
        var row = Math.round(disY / 40);
        var col = Math.round(disX / 40);

        console.log(row, col);
        playchess(row, col);
    }, false)
}
getplace();


/**
 * 判断是否有这个棋子 返回棋子在的坐标
 * @param {*} row 
 * @param {*} col 
 */
function getchess(row, col) {
    if (Checkerboard[row] == undefined) {
        return
    }
    if (Checkerboard[row][col] == undefined) {
        return
    }
    return Checkerboard[row][col];

}


/**
 * 判断是否胜利
 * @param {*} row 
 * @param {*} col 
 */
function win(row, col) {
    var len = 1;
    var chess = getchess(row, col);
    //横向五子
    for (let i = col - 1; getchess(row, i) === chess; i--) {
        len++;
    }
    for (let i = col + 1; getchess(row, i) === chess; i++) {
        len++;
    }
    //胜利
    if (len >= 5) {
        return true;
    }


    //纵向五子
    for (let i = row - 1; getchess(i, col) === chess; i--) {
        len++;
    }
    for (let i = row + 1; getchess(i, col) === chess; i++) {
        len++;
    }
    //胜利
    if (len >= 5) {
        return true;
    }


    //正斜线五子
    for (let i = col - 1, j = row + 1; getchess(j, i) === chess; i-- , j++) {
        len++;
    }
    for (let i = col + 1, j = row - 1; getchess(j, i) === chess; i++ , j--) {
        len++;
    }
    //胜利
    if (len >= 5) {
        return true;
    }

    //反斜线五子
    for (let i = col - 1, j = row - 1; getchess(j, i) === chess; i-- , j--) {
        len++;
    }
    for (let i = col + 1, j = row + 1; getchess(j, i) === chess; i++ , j++) {
        len++;
    }
    //胜利
    if (len >= 5) {
        return true;
    }
}

//初始化界面
function init() {
    initCheckerboard();
    chessstate = 1;
    gameover = false;
    game.innerHTML = '';
}

//按钮点击重新开始游戏
button.onclick = function () {
    init();
}

