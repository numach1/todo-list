// ToDoクラスを定義
class ToDo{
  constructor(detail,deadLine){
    this.detail = detail;
    this.deadLine = new Date(deadLine);
  }

  /*--------------------------------
    タスク表示エリアの生成
  ----------------------------------*/
  // 入力エリアに値があるときのみ生成
  createElem(){
    const todoList = document.querySelector('.todoList'); // 生成箇所の親要素ul
    const listItem = document.createElement('li'); // liタグの作成
  
    listItem.innerHTML = `
      <div class="listInner">
        <div class="listItem">
          <input type="checkbox" class="check">
          <p class="taskElem">${this.detail}</p>
        </div>

        <button class="removeBtn" date-id="${this.id}" disabled><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="dateArea">
        <p class="date">作成日:${new Date().toLocaleDateString('ja-JP')}</p>
        <p>期日:${this.deadLine.toLocaleDateString('ja-JP')}</p>
      </div>
    `; // 生成したliタグに設置

    todoList.appendChild(listItem); // 生成したliタグをulの子要素として追加

    /*-------------------------------
      チェックボックスの判定
    ---------------------------------*/
    const checkbox = listItem.querySelector('.check'); // listItem内のチェックボックスを取得
    checkbox.addEventListener('change', () => {
      if(checkbox.checked){
        removeBtn.disabled = false;
        removeBtn.style.backgroundColor = '#a30404';
      } else {
        removeBtn.disabled = true;
        removeBtn.style.backgroundColor = '#a75151';
      }
    });

    /*----------------------------
      削除ボタンの処理
    ----------------------------*/
    const removeBtn = listItem.querySelector('.removeBtn'); // listItem内の削除ボタンを取得
    removeBtn.addEventListener('click', (event)=> {
      event.target.closest('li').remove();
    });
  }

  /*-------------------------------
    ToDoリストとして出力
  ---------------------------------*/
  addList(){
    if(this.detail.trim() !== ''){
      this.createElem(); // 空じゃなければcreateElem処理
    } else{
      alert('タスクを入力してください。');
    }
  }

  /*----------------------------------
    ローカルストレージへの保存
  // ----------------------------------*/
  // データを追加していく場合
  // 1.ローカルへ保存
  // 2.既にあるデータを取得
  // 3.新しい内容を追加

}

const deadLine = document.querySelector('.deadLine'); // 期日の取得
const task = document.querySelector('.textArea'); // タスク入力エリアの取得
const addBtn = document.querySelector('.addBtn'); // タスク登録ボタンの取得

/*--------------------------
  登録ボタンクリック時の動作
---------------------------*/
addBtn.addEventListener('click', (event) => {
  event.preventDefault(); // クリック時の読み込みリセット

  const toDoItem = new ToDo(task.value,deadLine.value);
  toDoItem.addList(); // addListメソッド実行

  task.value = ''; // タスク入力エリアのリセット
});