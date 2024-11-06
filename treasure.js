// 模拟宝藏地图API
class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("在古老的图书馆里找到了第一个线索,猜对数字即可解开谜题...");
      }, 1000);
    });
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码!");
        }
        resolve("解码成功!宝藏在一座古老的神庙中...");
      }, 1000);
    });
  }

  static searchTemple(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
        if (random < 0.5) {
          reject("糟糕!遇到了神庙守卫!");
        }
        resolve("找到了一个神秘的箱子...");
      }, 2000);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("恭喜!你找到了传说中的宝藏!");
      }, 1000);
    });
  }

  // 增加数字谜题方法，用于猜数字
  static solveNumberPuzzle(puzzle) {
    // 如果输入的数字是29，则解开谜题，否则谜题错误
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (puzzle === 29) {
            resolve("数字谜题已解开！");
        } else {
            reject("数字谜题错误！");
            }
      }, 1000);
    });
  }

  // 增加走迷宫的方法，假设成功走出迷宫
  static navigateThroughRooms(rooms) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve("成功通过迷宫！");
          }, 1500);
      });
  }

  // 增加避开陷阱的方法，根据用户的反应时间决定是否能够避开陷阱
  static avoidTraps(reactionTime) {
      // 如果反应时间小于500毫秒，则避开陷阱，否则触发陷阱
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              if (reactionTime < 500) { 
                  resolve("成功避开陷阱！");
              } else {
                  reject("触发了陷阱！");
              }
          }, 1000);
      });
  }
  
}

// 使用async/await函数来模拟寻宝过程
async function findTreasureWithAsyncAwait() {
try {
  
    // 清空状态信息并显示提示和输入容器
    document.getElementById('status').innerText = ""; 
    document.getElementById('prompt-container').style.display = 'block';

    // 获取初始线索并显示在页面上
    const clue = await TreasureMap.getInitialClue();
    document.getElementById('result').innerText = clue;
    document.getElementById('prompt-text').innerText = "请输入数字谜题的答案（假设答案是29）：";

    // 等待用户输入数字谜题的答案
    const userInput = await getUserInput();
    const puzzleResult = await TreasureMap.solveNumberPuzzle(parseInt(userInput, 10));
    document.getElementById('result').innerText = puzzleResult;

    await sleep(2000);

    const decodedClue = await TreasureMap.decodeAncientScript("decoded clue"); 
    document.getElementById('result').innerText += "\n" + decodedClue;

    // 隐藏输入框和按钮
    document.getElementById('prompt-container').style.display = 'none';

    // 通过迷宫并显示结果
    const roomsPassed = await TreasureMap.navigateThroughRooms([]); 
    document.getElementById('result').innerText += "\n" + roomsPassed;

    // 根据用户反应时间并判断是否能够避开陷阱并显示结果
    const reactionTime = await getUserReactionTime();
    let trapAvoidance;
    if (reactionTime < 500) {
        trapAvoidance = await TreasureMap.avoidTraps(reactionTime);
    } else {
        trapAvoidance = "触发陷阱！"; 
    }
    document.getElementById('result').innerText += "\n" + trapAvoidance;

    // 后续寻宝步骤：在神庙中搜索，并显示结果
    const templeSearch = await TreasureMap.searchTemple("temple location"); 
    document.getElementById('result').innerText += "\n" + templeSearch;

    // 打开宝藏箱并显示结果
    const box = await TreasureMap.openTreasureBox();
    document.getElementById('result').innerText += "\n" + box;

} catch (error) {
    // 如果在寻宝过程中遇到错误，则显示错误信息
    document.getElementById('result').innerText = "任务失败: " + error;
}
}

// 获取用户输入
async function getUserInput() {
// 创建Promise对象，等待用户点击提交按钮
return new Promise(resolve => {
    document.getElementById('submit-button').addEventListener('click', () => {
        // 获取用户输入的值
        const input = document.getElementById('user-input').value;
        resolve(input);
        // 移除事件监听器，防止多次点击
        document.getElementById('submit-button').removeEventListener('click', arguments.callee);
    }, { once: true }); // 使用 { once: true } 确保事件监听器只触发一次
});
}

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

// 假设用户反应时间为300ms
async function getUserReactionTime() {
return 300;
}

// 点击开始游戏，开始寻宝游戏
document.getElementById('start-game').addEventListener('click', findTreasureWithAsyncAwait);