class UserManager {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('ai_core_user')) || null;
    }

    register(username) {
        const id = 'ID-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        this.currentUser = {
            id,
            username: username || `Explorer_${id.slice(-4)}`,
            joinedAt: new Date().toISOString(),
            history: []
        };
        this.save();
        return this.currentUser;
    }

    save() {
        localStorage.setItem('ai_core_user', JSON.stringify(this.currentUser));
    }

    addScore(score, track, rank) {
        if (!this.currentUser) return;
        
        const entry = {
            score,
            track,
            rank,
            date: new Date().toISOString()
        };
        
        this.currentUser.history.unshift(entry);

        if (this.currentUser.history.length > 20) {
            this.currentUser.history.pop();
        }
        this.save();
    }

    getHistory() {
        return this.currentUser ? this.currentUser.history : [];
    }

    isLoggedIn() {
        return !!this.currentUser;
    }

    logout() {
        localStorage.removeItem('ai_core_user');
        this.currentUser = null;
        location.reload();
    }
}

export const userManager = new UserManager();
