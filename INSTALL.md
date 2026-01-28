# Installation Guide for HabitFlow Skill

## Quick Install (TL;DR)

**On your gateway machine:**
```bash
cd ~/.clawdbot/skills
git clone https://github.com/tralves/habit-flow-skill.git habit-flow
cd habit-flow
npm install
```

Then tell your agent: **"refresh skills"** or restart the gateway.

---

## Detailed Setup

### Understanding Your Architecture

**Gateway + Node Setup (Most Common):**
- Gateway runs on one machine (serves skills to all agents)
- Nodes connect to gateway from other machines
- **Install skills on the gateway machine only**

**Local Setup:**
- Gateway and node run on same machine
- Install skills locally

---

## Installation Options

### Option 1: Install on Gateway (Recommended for Gateway + Node)

**If your gateway is on a different machine:**

1. SSH into your gateway machine or access it directly

2. Install the skill globally (shared across all agents):
   ```bash
   mkdir -p ~/.clawdbot/skills
   cd ~/.clawdbot/skills
   git clone https://github.com/tralves/habit-flow-skill.git habit-flow
   cd habit-flow
   npm install
   ```

3. Restart your gateway or tell your agent: **"refresh skills"**

4. The skill is now available to all agents connecting to this gateway!

### Option 2: Install Locally (If Running Gateway + Node Locally)

**If your gateway and node are on the same machine:**

**Per-workspace (specific agent only):**
```bash
cd ~/clawd/skills
git clone https://github.com/tralves/habit-flow-skill.git habit-flow
cd habit-flow
npm install
```

**Or globally (all agents on this machine):**
```bash
mkdir -p ~/.clawdbot/skills
cd ~/.clawdbot/skills
git clone https://github.com/tralves/habit-flow-skill.git habit-flow
cd habit-flow
npm install
```

---

## Verifying Installation

### Method 1: Ask Your Agent

Simply chat with your agent:
```
You: "Do you have the habit-flow skill available?"
Agent: "Yes! I have access to HabitFlow..."
```

Or trigger it directly:
```
You: "I want to start tracking meditation"
Agent: [HabitFlow skill activates]
```

### Method 2: Check Skill Directory

On the machine where you installed:
```bash
# If installed globally
ls -la ~/.clawdbot/skills/habit-flow/

# If installed in workspace
ls -la ~/clawd/skills/habit-flow/

# Both should show:
# - SKILL.md
# - scripts/
# - src/
# - package.json
# - node_modules/ (after npm install)
```

### Method 3: Check Data Directory

After first use, verify the data directory was created:
```bash
ls -la ~/clawd/habit-flow-data/
# Should show:
# - habits.json
# - config.json
# - logs/
```

---

## Troubleshooting Installation

### Skill Not Found After Installation

**Issue:** Agent says "I don't have access to HabitFlow"

**Solutions:**
1. Verify installation location:
   ```bash
   # Gateway machine (if using gateway)
   ls ~/.clawdbot/skills/habit-flow/SKILL.md

   # Or local machine
   ls ~/clawd/skills/habit-flow/SKILL.md
   ```

2. Refresh skills:
   ```
   User: "refresh skills"
   ```

3. Restart gateway (if applicable)

4. Check that dependencies installed:
   ```bash
   cd ~/.clawdbot/skills/habit-flow  # or ~/clawd/skills/habit-flow
   ls node_modules/
   # Should show: chrono-node, string-similarity, commander, etc.
   ```

### Node Modules Missing

**Issue:** Scripts fail with "Cannot find module"

**Solution:**
```bash
cd ~/.clawdbot/skills/habit-flow  # or ~/clawd/skills/habit-flow
rm -rf node_modules package-lock.json
npm install
```

### Permission Issues

**Issue:** Cannot write to data directory

**Solution:**
```bash
mkdir -p ~/clawd/habit-flow-data
chmod 755 ~/clawd/habit-flow-data
```

### Wrong Machine

**Issue:** Installed on node instead of gateway

**Solution:**
1. Delete from node machine:
   ```bash
   rm -rf ~/clawd/skills/habit-flow
   ```

2. Install on gateway machine (see Option 1 above)

---

## Updating the Skill

To update to the latest version:

```bash
cd ~/.clawdbot/skills/habit-flow  # or ~/clawd/skills/habit-flow

# Pull latest changes
git pull origin main

# Update dependencies
npm install

# Restart gateway or refresh skills
```

Your habit data (`~/clawd/habit-flow-data/`) will be preserved during updates.

---

## Uninstalling

### Remove the Skill

```bash
# If installed globally
rm -rf ~/.clawdbot/skills/habit-flow

# If installed in workspace
rm -rf ~/clawd/skills/habit-flow
```

### Keep or Remove Data

**Keep your habit data** (recommended if you might reinstall):
```bash
# Data stays at ~/clawd/habit-flow-data/
# You can reinstall the skill later and keep your history
```

**Remove all data** (complete removal):
```bash
rm -rf ~/clawd/habit-flow-data
```

---

## Next Steps

After installation:

1. **Read Quick Start**: `QUICKSTART.md` (5 minutes)
2. **Try First Habit**: Create and log your first habit
3. **Explore Features**: Check `SKILL.md` for full capabilities
4. **Set Up Reminders**: Configure WhatsApp notifications (optional)

---

## System Requirements

- **Node.js**: 18+ (already installed if you're running clawdbot)
- **Clawdbot**: Any recent version
- **Storage**: ~5MB for code + ~1MB per 10,000 habit logs
- **OS**: macOS, Linux, or Windows (WSL)

---

## Architecture Summary

```
┌─────────────────┐
│   Gateway       │  ← Install HabitFlow here (if remote)
│   (serves AI)   │
└────────┬────────┘
         │
         ├─────────┐
         │         │
    ┌────▼───┐ ┌──▼─────┐
    │ Node 1 │ │ Node 2 │  ← No installation needed
    │        │ │        │
    └────────┘ └────────┘
```

Or for local setup:
```
┌──────────────────────┐
│  Gateway + Node      │  ← Install HabitFlow here
│  (same machine)      │
└──────────────────────┘
```

---

## Getting Help

- **Quick Start**: `QUICKSTART.md`
- **Full Documentation**: `SKILL.md`
- **Issues**: https://github.com/tralves/habit-flow-skill/issues
- **Discussions**: https://github.com/tralves/habit-flow-skill/discussions

Happy habit building! 🎯
