# HabitFlow - Quick Installation Reference

## 🚀 Installation (Works for Both Gateway + Local)

**On your gateway machine (or local machine if running gateway locally):**

```bash
# 1. Clone the skill
mkdir -p ~/.clawdbot/skills
cd ~/.clawdbot/skills
git clone https://github.com/tralves/habit-flow-skill.git habit-flow

# 2. Install dependencies
cd habit-flow
npm install

# 3. Activate
```

Then tell your agent: **"refresh skills"** (or restart gateway)

✅ Done! HabitFlow is now available.

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

```
~/.clawdbot/skills/habit-flow/

Install on:
  • Gateway machine (if remote gateway)
  • Local machine (if running gateway locally)
```

---

## 🔄 Update Later

```bash
cd ~/.clawdbot/skills/habit-flow
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
