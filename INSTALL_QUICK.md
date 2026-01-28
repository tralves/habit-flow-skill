# HabitFlow - Quick Installation Reference

## 🚀 Installation

**Workspace** (recommended - highest precedence):
```bash
cd ~/clawd/skills  # or your workspace path
git clone https://github.com/tralves/habit-flow-skill.git habit-flow
cd habit-flow
npm install
```

**Or Shared** (for multiple agents):
```bash
mkdir -p ~/.clawdbot/skills
cd ~/.clawdbot/skills
git clone https://github.com/tralves/habit-flow-skill.git habit-flow
cd habit-flow
npm install
```

Then: **"refresh skills"** or restart gateway

✅ Done!

---

## ✓ Verify Installation

Ask your agent:
```
You: "I want to start tracking meditation"
```

The HabitFlow skill should activate automatically!

Or check manually:
```
You: "Do you have the habit-flow skill?"
```

---

## 📍 Where to Install

**Two options:**

1. **Workspace** (highest precedence):
   ```
   ~/clawd/skills/habit-flow/
   ```
   Best for dedicated gateway

2. **Shared** (all agents):
   ```
   ~/.clawdbot/skills/habit-flow/
   ```
   Best for multiple agents

---

## 🔄 Update Later

```bash
cd ~/clawd/skills/habit-flow  # or ~/.clawdbot/skills/habit-flow
git pull
npm install
```

Then: **"refresh skills"** or restart gateway

---

## 📚 Full Documentation

- **Complete Install Guide**: `INSTALL.md`
- **Quick Start Guide**: `QUICKSTART.md` (5 minutes)
- **Full Documentation**: `SKILL.md`

---

## 🎯 First Steps After Install

1. Create your first habit:
   ```
   You: "I want to meditate every morning"
   ```

2. Log completions naturally:
   ```
   You: "I meditated today"
   ```

3. Check your progress:
   ```
   You: "Show my meditation streak"
   ```

That's it! 🔥
