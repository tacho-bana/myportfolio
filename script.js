// スムーズスクロール：すべての .scroll-link およびヘッダー内リンク用
document.querySelectorAll('a.scroll-link, .site-header nav a, a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (!this.hash) return;
      e.preventDefault();
      const target = document.querySelector(this.hash);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,  // 固定ヘッダー分の調整
          behavior: 'smooth'
        });
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    // const modalTitle = document.getElementById('modal-title');
    const modalEmbed = document.getElementById('modal-embed');
    const posterBtn = document.getElementById('poster-btn');
    const paperBtn = document.getElementById('paper-btn');
    const githubBtn = document.getElementById('githubBtn');
    
    // 現在表示中のプロジェクトの各データ
    let currentPoster = '';
    let currentPaper = '';
    let currentGithub = '';
    
    // プロジェクトの「研究概要」ボタンをクリックした時の処理
    document.querySelectorAll('.project-item .modal-btn').forEach(button => {
      button.addEventListener('click', function() {
        const projectItem = this.parentElement;
        currentPoster = projectItem.getAttribute('data-poster');
        currentPaper = projectItem.getAttribute('data-paper');  // 存在しない場合は null となる
        currentGithub = projectItem.getAttribute('data-github');
        
        // modalTitle.textContent = projectItem.getAttribute('data-title');
        // 前回のPDF埋め込みやリンクが残らないように初期化
        modalEmbed.innerHTML = '';
        
        // 論文が存在するかどうかで「論文」ボタンの表示を制御
        if (currentPaper) {
          paperBtn.style.display = 'inline-block';
        } else {
          paperBtn.style.display = 'none';
        }
        
        // GitHubが存在するかによる表示
        if (currentGithub) {
          githubBtn.style.display = 'inline-block';
        } else {
          githubBtn.style.display = 'none';
        }
        
        // モーダルを表示
        modal.style.display = 'block';
  
        // モーダルを開いたときはデフォルトでポスターを表示
        if (currentPoster) {
          modalEmbed.innerHTML = `
            <object data="${currentPoster}" type="application/pdf" width="100%" height="500px">
              <p>ポスターを表示できません。<a href="${currentPoster}" target="_blank">こちら</a>からご確認ください。</p>
            </object>
            <p style="text-align:center; margin-top:10px;">
              <a href="${currentPoster}" target="_blank">別ウィンドウで閲覧する</a>
            </p>
          `;
        }
      });
    });
    
    // ポスターを表示するボタンの処理
    posterBtn.addEventListener('click', function() {
      if (currentPoster) {
        modalEmbed.innerHTML = `
          <object data="${currentPoster}" type="application/pdf" width="100%" height="500px">
            <p>ポスターを表示できません。<a href="${currentPoster}" target="_blank">こちら</a>からご確認ください。</p>
          </object>
          <p style="text-align:center; margin-top:10px;">
            <a href="${currentPoster}" target="_blank">別ウィンドウで閲覧する</a>
          </p>
        `;
      }
    });
    
    // 論文を表示するボタンの処理
    paperBtn.addEventListener('click', function() {
      if (currentPaper) {
        modalEmbed.innerHTML = `
          <object data="${currentPaper}" type="application/pdf" width="100%" height="500px">
            <p>論文を表示できません。<a href="${currentPaper}" target="_blank">こちら</a>からご確認ください。</p>
          </object>
          <p style="text-align:center; margin-top:10px;">
            <a href="${currentPaper}" target="_blank">別ウィンドウで閲覧する</a>
          </p>
        `;
      }
    });
    
    // GitHub ボタンの処理
    githubBtn.addEventListener('click', function() {
      if (currentGithub) {
        window.open(currentGithub, '_blank');
      }
    });
    
    // モーダルを閉じる処理
    document.querySelector('.modal-close').addEventListener('click', function() {
      modal.style.display = 'none';
      // 表示内容をリセット
      modalEmbed.innerHTML = '';
    });
    
    // 画面外クリックでモーダルを閉じる（任意）
    window.addEventListener('click', function(e) {
      if(e.target === modal) {
        modal.style.display = 'none';
        modalEmbed.innerHTML = '';
      }
    });
  });


  document.addEventListener('DOMContentLoaded', () => {
    const beerFill = document.querySelector('.beer-fill');
    const progressText = document.querySelector('.progress-text');
  
    // シミュレーション用の進捗値（実際の進捗情報に合わせて変更してください）
    let simulatedProgress = 0;
  
    // 進捗（%）に合わせてジョッキ内のビールの高さとパーセンテージ表示を更新
    function setProgress(percent) {
      if (progressText && beerFill) {
        progressText.textContent = `${percent}%`;
        beerFill.style.height = `${percent}%`;
      }
    }
  
    // 読み込み前はゆっくりと90%まで注がれるシミュレーション
    const progressInterval = setInterval(() => {
      if (simulatedProgress < 90) {
        simulatedProgress++;
        setProgress(simulatedProgress);
      }
    }, 30);
  
    // ページの完全読み込み後に、短時間で100%に到達させる
    window.addEventListener('load', () => {
      clearInterval(progressInterval);
      const progressUpdater = setInterval(() => {
        if (simulatedProgress < 100) {
          simulatedProgress++;
          setProgress(simulatedProgress);
        } else {
          clearInterval(progressUpdater);
          // 100%到達後、フェードアウトしてローディング画面をDOMから削除
          const loading = document.getElementById('loading');
          loading.classList.add('hidden');
          setTimeout(() => {
            loading.remove();
            // ローディングが完了したのでタイプライターエフェクト開始
            startTypingEffect();
          }, 600);
        }
      }, 20);
    });
  });

// タイプライター風にテキストを1文字ずつ表示する関数
function typeText(element, text, delay, callback) {
  element.textContent = ''; // 初期化
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, delay);
    } else {
      if (callback) callback();
    }
  }
  type();
}

// ローディング完了後に呼ばれる関数
function startTypingEffect() {
  const heroText = document.querySelector('.hero-text');
  if (!heroText) return;

  const h1Elem = heroText.querySelector('h1');
  const pElem = heroText.querySelector('p');

  // 元のテキスト内容を変数に保存
  const h1Text = h1Elem.textContent;
  const pText  = pElem.textContent;

  // まずはテキストを空にする
  h1Elem.textContent = '';
  pElem.textContent  = '';
  heroText.style.visibility = 'visible';


  // h1を150ms間隔でタイプ表示し、完了後500ms後にpを表示
  typeText(h1Elem, h1Text, 100, function() {
    setTimeout(function() {
      typeText(pElem, pText, 100);
    }, 500);
  });
}

document.getElementById('mirai-project-link').addEventListener('click', function(e) {
  e.preventDefault(); // リンクのデフォルト動作をキャンセル

  const target = document.getElementById('project-mirai');
  if (target) {
    // 対象のプロジェクトまでスムーズスクロール
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 一旦ハイライトクラスを付与して再生
    target.classList.add('highlight');
    
    // アニメーション終了後にハイライトクラスを削除（1秒の場合）
    setTimeout(() => {
      target.classList.remove('highlight');
    }, 1000);
  }
});

document.getElementById('deim-project-link').addEventListener('click', function(e) {
  e.preventDefault(); // リンクのデフォルト動作をキャンセル

  const target = document.getElementById('project-deim');
  if (target) {
    // 対象のプロジェクトまでスムーズスクロール
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // 一旦ハイライトクラスを付与して再生
    target.classList.add('highlight');
    
    // アニメーション終了後にハイライトクラスを削除（1秒の場合）
    setTimeout(() => {
      target.classList.remove('highlight');
    }, 1000);
  }
});