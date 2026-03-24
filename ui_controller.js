import { game } from './game_logic.js';
import { userManager } from './user_manager.js';
import { glossary, faqData } from './glossary_data.js';

const els = {
    screens: {
        start: document.getElementById('start-screen'),
        identity: document.getElementById('identity-screen'),
        game: document.getElementById('game-screen'),
        result: document.getElementById('result-screen'),
        unlock: document.getElementById('unlock-overlay')
    },
    questionText: document.getElementById('question-text'),
    optionsGrid: document.getElementById('options-grid'),
    scoreText: document.getElementById('current-score'),
    timerBar: document.getElementById('timer-bar'),
    tierLabel: document.getElementById('tier-label'),
    dots: document.getElementById('progression-dots'),
    badgeDisplay: document.getElementById('badge-display'),
    rankText: document.getElementById('final-rank-text'),
    finalScore: document.getElementById('final-score'),
    leaderboard: document.getElementById('leaderboard-list'),
    trackName: document.getElementById('track-name'),
    progressText: document.getElementById('current-progress'),
    feedbackOverlay: document.getElementById('feedback-overlay'),
    search: document.getElementById('assistant-search'),
    sidebar: document.getElementById('assistant-sidebar'),
    auth: {
        modal: document.getElementById('auth-modal'),
        input: document.getElementById('username-input'),
        submit: document.getElementById('auth-submit')
    },
    userTag: {
        container: document.getElementById('user-tag'),
        name: document.getElementById('user-display-name'),
        best: document.getElementById('user-best-score'),
        avatar: document.getElementById('user-avatar'),
        logout: document.getElementById('user-logout')
    },
    share: {
        overlay: document.getElementById('share-overlay'),
        rank: document.getElementById('share-rank'),
        score: document.getElementById('share-score'),
        user: document.getElementById('share-username'),
        close: document.getElementById('close-share'),
        copy: document.getElementById('copy-link-btn')
    },
    historyList: document.getElementById('history-mini-list')
};

const audio = {
    click: document.getElementById('sfx-click'),
    correct: document.getElementById('sfx-correct'),
    wrong: document.getElementById('sfx-wrong'),
    unlock: document.getElementById('sfx-unlock'),
    bgm: document.getElementById('bgm')
};

let audioOn = false;
let currentCat = 'all';

function init() {
    lucide.createIcons();
    setupEvents();
    renderFAQ();
    refreshUserProfile();
}

function setupEvents() {
    document.getElementById('to-identity-btn').onclick = () => {
        if (!userManager.isLoggedIn()) {
            els.auth.modal.classList.remove('hidden');
        } else {
            playSFX('click');
            showScreen('identity');
        }
    };

    els.auth.submit.onclick = () => {
        const val = els.auth.input.value.trim();
        if (val) {
            userManager.register(val);
            els.auth.modal.classList.add('hidden');
            refreshUserProfile();
            showScreen('identity');
        }
    };

    document.querySelectorAll('.identity-card').forEach(card => {
        card.onclick = () => {
            game.setIdentity(card.dataset.identity);
            playSFX('click');
            startGame();
        };
    });

    document.getElementById('continue-to-advanced').onclick = () => {
        els.screens.unlock.classList.add('hidden');
        renderQuestion();
    };

    document.getElementById('restart-btn').onclick = () => {
        showScreen('identity');
    };

    document.getElementById('share-btn').onclick = openShare;
    els.share.close.onclick = () => els.share.overlay.classList.add('hidden');
    els.share.copy.onclick = () => {
        navigator.clipboard.writeText(window.location.href);
        els.share.copy.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> 已复制';
        lucide.createIcons();
        setTimeout(() => {
            els.share.copy.innerHTML = '<i data-lucide="link" class="w-4 h-4"></i> 复制链接';
            lucide.createIcons();
        }, 2000);
    };

    els.userTag.logout.onclick = () => userManager.logout();
    
    document.getElementById('toggle-audio').onclick = () => {
        audioOn = !audioOn;
        const icon = audioOn ? 'volume-2' : 'volume-x';
        document.getElementById('audio-icon').outerHTML = `<i data-lucide="${icon}" id="audio-icon" class="w-5 h-5"></i>`;
        lucide.createIcons();
        if(audioOn) { audio.bgm.volume = 0.4; audio.bgm.play(); } else { audio.bgm.pause(); }
    };

    document.getElementById('toggle-assistant').onclick = () => els.sidebar.classList.add('open');
    document.getElementById('close-assistant').onclick = () => els.sidebar.classList.remove('open');

    els.search.oninput = renderFAQ;
}

function refreshUserProfile() {
    if (userManager.isLoggedIn()) {
        const user = userManager.currentUser;
        els.userTag.container.classList.remove('hidden');
        els.userTag.name.innerText = user.username;
        els.userTag.avatar.innerText = user.username[0].toUpperCase();
        
        const best = user.history.reduce((max, h) => Math.max(max, h.score), 0);
        els.userTag.best.innerText = `BEST: ${best}`;
    }
}

function showScreen(id) {
    Object.values(els.screens).forEach(s => s.classList.add('hidden'));
    els.screens[id].classList.remove('hidden');
    gsap.from(els.screens[id], { opacity: 0, scale: 0.95, duration: 0.6, ease: "power4.out" });
}

function startGame() {
    showScreen('game');
    game.onTick = (time, total) => {
        const pct = (time/total) * 100;
        els.timerBar.style.width = `${pct}%`;
        if (time < 5) els.timerBar.classList.add('timer-critical');
        else els.timerBar.classList.remove('timer-critical');
    };
    game.onScoreChange = (score) => {
        gsap.to(els.scoreText, { innerText: score, snap: { innerText: 1 }, duration: 0.5 });
    };
    game.onTierUnlocked = handleTierUnlock;
    game.onGameOver = (score) => {
        const rank = getRankInfo(score).title;
        userManager.addScore(score, game.track, rank);
        refreshUserProfile();
        showFinalResults(score);
    };
    renderQuestion();
}

function renderQuestion() {
    const q = game.nextQuestion();
    if (!q) return;

    els.tierLabel.innerText = game.tier === 'foundational' ? '基础级' : '进阶级';
    els.progressText.innerText = `${game.currentIdx + 1}/${game.activeQuestions.length}`;
    els.dots.innerHTML = game.activeQuestions.map((_, i) => 
        `<div class="prog-dot ${i <= game.currentIdx ? 'active' : ''}"></div>`
    ).join('');

    els.questionText.innerHTML = wrapGlossary(q.question);
    els.optionsGrid.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-index">${String.fromCharCode(65+i)}</span><span>${wrapGlossary(opt)}</span>`;
        btn.onclick = () => handleChoice(i, btn);
        els.optionsGrid.appendChild(btn);
    });

    setupGlossaryTooltips();
}

function handleChoice(idx, btn) {
    const res = game.handleAnswer(idx);
    const all = els.optionsGrid.querySelectorAll('.option-btn');
    all.forEach(b => b.disabled = true);

    if (res.isCorrect) {
        btn.classList.add('correct');
        playSFX('correct');
        spawnParticles(btn);
    } else {
        btn.classList.add('wrong');
        playSFX('wrong');
        els.screens.game.classList.add('shake');
        setTimeout(() => els.screens.game.classList.remove('shake'), 400);
        all[res.correctAnswer].classList.add('correct');
    }

    setTimeout(() => {
        renderQuestion();
    }, 1200);
}

function spawnParticles(originEl) {
    const rect = originEl.getBoundingClientRect();
    confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: (rect.left + rect.width/2) / window.innerWidth, y: rect.top / window.innerHeight },
        colors: ['#00f2ff', '#7000ff']
    });
}

function handleTierUnlock() {
    playSFX('unlock');
    els.screens.unlock.classList.remove('hidden');
    gsap.from("#unlock-badge-container", { scale: 0, rotation: -45, duration: 1, ease: "back.out(1.7)" });
}

function getRankInfo(score) {
    let badge = 'award';
    let title = '初级节点';
    
    if (game.tier === 'advanced' || score > 400) {
        if (game.track === 'pro') { badge = 'binary'; title = '算法主宰者'; }
        else { badge = 'landmark'; title = '数字治理先驱'; }
    } else if (score > 200) {
        title = '认知觉醒者';
        badge = 'zap';
    }
    return { badge, title };
}

function showFinalResults(score) {
    showScreen('result');
    els.finalScore.innerText = score;
    els.trackName.innerText = game.track === 'pro' ? '技术架构师' : '认知探索者';
    
    const info = getRankInfo(score);
    els.badgeDisplay.innerHTML = `<div class="w-32 h-32 mx-auto bg-gradient-to-br from-[#00f2ff] to-[#7000ff] rounded-full flex items-center justify-center border-4 border-white/20 shadow-[0_0_50px_rgba(0,242,255,0.4)]"><i data-lucide="${info.badge}" class="w-16 h-16 text-white"></i></div>`;
    els.rankText.innerText = info.title;
    
    renderLeaderboard();
    renderUserHistory();
    lucide.createIcons();
}

function renderUserHistory() {
    const history = userManager.getHistory();
    els.historyList.innerHTML = history.map(h => `
        <div class="flex justify-between items-center text-[10px] bg-white/5 p-2 rounded-lg border border-white/5">
            <span class="text-gray-400">${new Date(h.date).toLocaleDateString()}</span>
            <span class="font-bold text-[#00f2ff]">${h.score} Pts</span>
        </div>
    `).join('') || '<p class="text-[8px] text-gray-600">尚无进化记录</p>';
}

function renderLeaderboard() {
    const key = `ai_quiz_2026_${game.track}`;
    const board = JSON.parse(localStorage.getItem(key)) || [];
    els.leaderboard.innerHTML = board.map((item, i) => `
        <div class="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-[#00f2ff]/30 transition-all">
            <div class="flex items-center gap-4">
                <span class="text-xs font-black ${i < 3 ? 'text-yellow-400' : 'text-gray-600'}">#${(i+1).toString().padStart(2, '0')}</span>
                <span class="text-[10px] font-mono text-gray-400 group-hover:text-white transition-colors">${item.username || item.id}</span>
            </div>
            <span class="font-black text-[#00f2ff] tabular-nums text-sm">${item.score}</span>
        </div>
    `).join('') || '<p class="text-center text-gray-700 py-4 text-xs">无序历史记录</p>';
}

function openShare() {
    els.share.overlay.classList.remove('hidden');
    els.share.rank.innerText = els.rankText.innerText;
    els.share.score.innerText = els.finalScore.innerText;
    els.share.user.innerText = `@${userManager.currentUser.username} • 2026_EVOL_CERT`;
    lucide.createIcons();
}

function renderFAQ() {
    const query = els.search.value.toLowerCase();
    const filtered = faqData.filter(f => f.q.toLowerCase().includes(query) || f.a.toLowerCase().includes(query));
    document.getElementById('faq-list').innerHTML = filtered.map(f => `
        <div class="p-4 bg-white/5 rounded-xl border border-white/10">
            <h5 class="text-[#00f2ff] text-sm font-black mb-1">${f.q}</h5>
            <p class="text-gray-400 text-xs leading-relaxed">${f.a}</p>
        </div>
    `).join('') || '<p class="text-center text-gray-600 text-xs mt-10">未找到记忆片段</p>';
}

function wrapGlossary(text) {
    let html = text;
    Object.keys(glossary).forEach(term => {
        const regex = new RegExp(`(${term})`, 'g');
        html = html.replace(regex, `<span class="glossary-term" data-term="$1">$1</span>`);
    });
    return html;
}

function setupGlossaryTooltips() {
    const tip = document.getElementById('glossary-tooltip');
    document.querySelectorAll('.glossary-term').forEach(el => {
        el.onmouseenter = (e) => {
            const term = e.target.dataset.term;
            if (!glossary[term]) return;
            document.getElementById('tooltip-title').innerText = term;
            document.getElementById('tooltip-content').innerText = glossary[term].desc;
            tip.classList.remove('hidden');
            const rect = e.target.getBoundingClientRect();
            tip.style.left = `${rect.left + rect.width/2}px`;
            tip.style.top = `${rect.top}px`;
        };
        el.onmouseleave = () => tip.classList.add('hidden');
    });
}

function playSFX(key) {
    if (audioOn && audio[key]) {
        audio[key].currentTime = 0;
        audio[key].play().catch(() => {});
    }
}

init();
