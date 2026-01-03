document.addEventListener('DOMContentLoaded', () => {
    // 요소들 가져오기
    const input = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const list = document.getElementById('todoList');
    const clearBtn = document.getElementById('clearBtn');
    const themeBtn = document.getElementById('themeBtn');
    const lottoBtn = document.getElementById('lottoBtn');
    const lottoDisplay = document.getElementById('lottoNumbers');

    // --- [1] 할 일 목록 기능 ---
    
    // 초기 로딩 시 저장된 데이터 불러오기
    loadTodos();

    addBtn.addEventListener('click', () => {
        const text = input.value;
        if (text === "") return alert("내용을 입력하세요!");
        
        createTodoItem(text);
        saveTodos();
        input.value = "";
    });

    function createTodoItem(text) {
        const li = document.createElement('li');
        li.innerText = text;
        li.addEventListener('click', () => {
            li.remove();
            saveTodos();
        });
        list.appendChild(li);
    }

    function saveTodos() {
        const todos = [];
        list.querySelectorAll('li').forEach(li => todos.push(li.innerText));
        localStorage.setItem('myTodos', JSON.stringify(todos));
    }

    function loadTodos() {
        const saved = localStorage.getItem('myTodos');
        if (saved) {
            JSON.parse(saved).forEach(text => createTodoItem(text));
        }
    }

    clearBtn.addEventListener('click', () => {
        if (confirm("전체 삭제하시겠습니까?")) {
            list.innerHTML = "";
            saveTodos();
        }
    });

    // --- [2] 로또 생성기 기능 ---
    lottoBtn.addEventListener('click', () => {
        lottoDisplay.innerHTML = "";
        let nums = [];
        while (nums.length < 6) {
            let n = Math.floor(Math.random() * 45) + 1;
            if (!nums.includes(n)) nums.push(n);
        }
        nums.sort((a, b) => a - b).forEach(n => {
            const ball = document.createElement('div');
            ball.className = 'ball';
            ball.innerText = n;
            lottoDisplay.appendChild(ball);
        });
    });

    // --- [3] 다크 모드 기능 ---
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});