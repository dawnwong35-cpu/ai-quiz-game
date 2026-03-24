import { tieredQuestions } from './questions.js';
import { userManager } from './user_manager.js';

class GameEngine {
    constructor() {
        this.track = 'non-pro'; 
        this.tier = 'foundational'; 
        this.currentIdx = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = 15;
        this.isGameOver = false;
        
        this.onTick = null;
        this.onGameOver = null;
        this.onScoreChange = null;
        this.onTierUnlocked = null;
    }

    setIdentity(track) {
        this.track = track;
    }

    get activeQuestions() {
        if (this.tier === 'foundational') return tieredQuestions.foundational;
        return this.track === 'pro' ? tieredQuestions.advanced_pro : tieredQuestions.advanced_nonpro;
    }

    start() {
        this.currentIdx = 0;
        this.score = 0;
        this.tier = 'foundational';
        this.isGameOver = false;
    }

    nextQuestion() {
        if (this.currentIdx >= this.activeQuestions.length) {
            this.handleTierCompletion();
            return null;
        }
        this.startTimer();
        return this.activeQuestions[this.currentIdx];
    }

    handleTierCompletion() {
        if (this.tier === 'foundational') {
            const threshold = tieredQuestions.foundational.length * 15; 
            if (this.score >= threshold) {
                this.tier = 'advanced';
                this.currentIdx = 0;
                if (this.onTierUnlocked) this.onTierUnlocked();
            } else {
                this.endGame();
            }
        } else {
            this.endGame();
        }
    }

    startTimer() {
        clearInterval(this.timer);
        this.timeLeft = 15;
        this.timer = setInterval(() => {
            this.timeLeft -= 0.05;
            if (this.onTick) this.onTick(this.timeLeft, 15);
            if (this.timeLeft <= 0) this.handleAnswer(-1);
        }, 50);
    }

    handleAnswer(choice) {
        clearInterval(this.timer);
        const q = this.activeQuestions[this.currentIdx];
        const isCorrect = choice === q.answer;
        
        const oldScore = this.score;
        if (isCorrect) {
            const base = 25;
            const bonus = Math.max(0, Math.floor(this.timeLeft * 3));
            this.score += (base + bonus);
        }

        if (this.onScoreChange) this.onScoreChange(this.score, oldScore);
        this.currentIdx++;
        return { isCorrect, correctAnswer: q.answer, explanation: q.explanation };
    }

    endGame() {
        clearInterval(this.timer);
        this.isGameOver = true;
        this.saveScore();
        if (this.onGameOver) this.onGameOver(this.score);
    }

    saveScore() {
        const key = `ai_quiz_2026_${this.track}`;
        const board = JSON.parse(localStorage.getItem(key)) || [];
        const user = userManager.currentUser;
        
        board.push({
            score: this.score,
            date: new Date().toISOString(),
            id: user ? user.id : 'GUEST-' + Math.random().toString(36).substr(2, 4).toUpperCase(),
            username: user ? user.username : 'Guest'
        });
        
        board.sort((a, b) => b.score - a.score);
        localStorage.setItem(key, JSON.stringify(board.slice(0, 10)));
    }
}

export const game = new GameEngine();
