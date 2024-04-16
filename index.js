// import './style.css';

const onClickAdd = () => {
  // テキストボックスに入力されている内容を変数に格納
  const inputText = document.getElementById('add-text').value;
  // テキストボックス初期化
  document.getElementById('add-text').value = '';
  // 未完了リストに追加
  createIncompleteTodo(inputText);
};

// 渡された引数をもとに未完了のTodoを作成する関数
const createIncompleteTodo = (todo) => {
  // liタグを生成
  const li = document.createElement('li');

  // divタグ生成
  const div = document.createElement('div');
  div.className = 'list-row';

  // pタグ生成
  const p = document.createElement('p');
  p.className = 'todo-item';
  p.innerText = todo;

  // button（完了）タグ生成
  const completeButton = document.createElement('button');
  completeButton.innerText = '完了';
  completeButton.addEventListener('click', () => {
    // 押された完了ボタンの親にあるliタグを持っていく
    const moveTarget = completeButton.closest('li');
    // 削除ボタンを消す
    completeButton.nextElementSibling.remove();
    // 完了ボタンも削除する
    completeButton.remove();

    // 戻すボタンをliタグ内に入れる
    const backButton = document.createElement('button');
    backButton.innerText = '戻す';
    backButton.addEventListener('click', () => {
      const todoText = backButton.previousElementSibling.innerText;
      createIncompleteTodo(todoText);
      backButton.closest('li').remove();
    });

    moveTarget.firstElementChild.appendChild(backButton);

    // 完了リストに移動する（アドレスを持っているからliごとちゃんとappendChildされる）ので
    // そのままappendChildでも移動するから大丈夫
    document.getElementById('complete-list').appendChild(moveTarget);
  });

  // button（削除）タグ生成
  const deleteButton = document.createElement('button');
  deleteButton.innerText = '削除';
  deleteButton.addEventListener('click', () => {
    // 親タグのliを見つける
    const deleteTarget = deleteButton.closest('li');
    document.getElementById('incomplete-list').removeChild(deleteTarget);
  });

  // 階層構造
  document.getElementById('incomplete-list').appendChild(li);

  li.appendChild(div);

  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  console.log(completeButton);
  console.log(deleteButton);
};

// add-buttonの反応（click）を検知したときに、処理(onClickAdd関数)を実行する
document.getElementById('add-button').addEventListener('click', onClickAdd);
