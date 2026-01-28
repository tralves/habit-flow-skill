# HabitFlow Quick Start Guide

Get started with HabitFlow in 5 minutes!

## Installation

**Workspace** (recommended):
```bash
cd ~/clawd/skills  # or your workspace path
git clone https://github.com/tralves/habit-flow-skill.git habit-flow
cd habit-flow
npm install
```

**Or shared** (multiple agents):
```bash
mkdir -p ~/.clawdbot/skills
cd ~/.clawdbot/skills
git clone https://github.com/tralves/habit-flow-skill.git habit-flow
cd habit-flow
npm install
```

**Activate:** Tell your agent **"refresh skills"** or restart your gateway

## Create Your First Habit

```bash
npx tsx scripts/manage_habit.ts create \
  --name "Morning meditation" \
  --category mindfulness \
  --frequency daily \
  --target-count 10 \
  --target-unit minutes
```

Expected output:
```json
{
  "success": true,
  "habit": {
    "id": "h_abc123...",
    "name": "Morning meditation",
    ...
  }
}
```

💡 **Save the habit ID** - you'll need it for logging!

## Log Your First Completion

```bash
cd ~/clawd/skills/habit-flow  # or ~/.clawdbot/skills/habit-flow
# Replace h_abc123 with your habit ID
npx tsx scripts/log_habit.ts \
  --habit-id h_abc123 \
  --status completed
```

Expected output:
```json
{
  "success": true,
  "logsCreated": 1,
  "streakUpdate": {
    "currentStreak": 1,
    "longestStreak": 1
  }
}
```

🔥 You've started your first streak!

## View Your Habits

```bash
cd ~/clawd/skills/habit-flow  # or ~/.clawdbot/skills/habit-flow
npx tsx scripts/view_habits.ts --active --format markdown
```

Expected output:
```
# Habits

| Name | Category | Frequency | Target | Streak | Status |
|------|----------|-----------|--------|--------|--------|
| Morning meditation | mindfulness | daily | 10 minutes | 🔥 1 | ✅ Active |
```

## Natural Language Logging

The real power of HabitFlow is natural language:

```bash
cd ~/clawd/skills/habit-flow  # or ~/.clawdbot/skills/habit-flow
npx tsx scripts/parse_natural_language.ts --text "I meditated today"
```

This will identify your habit and suggest logging it. In the skill, this happens automatically!

## Check Your Progress

```bash
cd ~/clawd/skills/habit-flow  # or ~/.clawdbot/skills/habit-flow
npx tsx scripts/get_stats.ts --habit-id h_abc123 --period 7
```

See completion rates, trends, and your best days!

## Common Commands

### Create Different Types of Habits

**Fitness:**
```bash
npx tsx scripts/manage_habit.ts create \
  --name "Morning run" \
  --category fitness \
  --frequency daily \
  --target-count 3 \
  --target-unit miles
```

**Productivity:**
```bash
npx tsx scripts/manage_habit.ts create \
  --name "Deep work session" \
  --category productivity \
  --frequency daily \
  --target-count 2 \
  --target-unit hours
```

**Health:**
```bash
npx tsx scripts/manage_habit.ts create \
  --name "Drink water" \
  --category health \
  --frequency daily \
  --target-count 8 \
  --target-unit glasses
```

### Log Different Statuses

**Completed:**
```bash
npx tsx scripts/log_habit.ts --habit-id h_abc123 --status completed
```

**Partial:**
```bash
npx tsx scripts/log_habit.ts --habit-id h_abc123 --status partial --count 5
```

**Missed:**
```bash
npx tsx scripts/log_habit.ts --habit-id h_abc123 --status missed
```

**Skipped (intentionally):**
```bash
npx tsx scripts/log_habit.ts --habit-id h_abc123 --status skipped --notes "Rest day"
```

### Bulk Logging

Log multiple days at once:
```bash
npx tsx scripts/log_habit.ts \
  --habit-id h_abc123 \
  --dates "2026-01-20,2026-01-21,2026-01-22" \
  --status completed
```

### View Statistics

**Single habit (last 30 days):**
```bash
npx tsx scripts/get_stats.ts --habit-id h_abc123 --period 30 --format text
```

**All habits (last 7 days):**
```bash
npx tsx scripts/get_stats.ts --all --period 7
```

### Update a Habit

```bash
npx tsx scripts/manage_habit.ts update \
  --habit-id h_abc123 \
  --target-count 15 \
  --target-unit minutes
```

### Archive a Habit

```bash
npx tsx scripts/manage_habit.ts archive --habit-id h_abc123
```

## Understanding Streaks

HabitFlow uses **1-day forgiveness**:

✅ **Perfect Streak (7 days):**
- Mon: ✅, Tue: ✅, Wed: ✅, Thu: ✅, Fri: ✅, Sat: ✅, Sun: ✅
- Quality: Perfect

✅ **Excellent Streak (7 days with forgiveness):**
- Mon: ✅, Tue: ✅, Wed: ❌, Thu: ✅, Fri: ✅, Sat: ✅, Sun: ✅
- Quality: Excellent (1 forgiveness day used)

❌ **Broken Streak:**
- Mon: ✅, Tue: ✅, Wed: ❌, Thu: ❌, Fri: ✅
- Streak breaks after 2 consecutive missed days

## Pro Tips

### 1. Use Habit IDs Efficiently

Save habit IDs in shell variables:
```bash
MEDITATION=$(npx tsx scripts/view_habits.ts --search "meditation" | jq -r '.habits[0].id')
npx tsx scripts/log_habit.ts --habit-id $MEDITATION --status completed
```

### 2. Create a Daily Logging Alias

Add to your `~/.bashrc` or `~/.zshrc`:
```bash
alias hlog='cd ~/clawd/skills/habit-flow && npx tsx scripts/log_habit.ts'
alias hview='cd ~/clawd/skills/habit-flow && npx tsx scripts/view_habits.ts --active'
alias hstats='cd ~/clawd/skills/habit-flow && npx tsx scripts/get_stats.ts'
```

Then use:
```bash
hlog --habit-id h_abc123 --status completed
hview
hstats --all --period 7
```

### 3. Set Up Reminders

Add reminder times when creating habits:
```bash
npx tsx scripts/manage_habit.ts create \
  --name "Evening journal" \
  --category productivity \
  --frequency daily \
  --target-count 1 \
  --target-unit entry \
  --reminder "20:00" \
  --reminder-message "Time to reflect on your day 📔"
```

Then sync to clawdbot cron:
```bash
npx tsx scripts/sync_reminders.ts --sync-all
```

### 4. Backfill History

Log past completions to build your streak:
```bash
npx tsx scripts/log_habit.ts \
  --habit-id h_abc123 \
  --dates "2026-01-15,2026-01-16,2026-01-17,2026-01-18,2026-01-19" \
  --status completed
```

## Run the Demo

Want to see everything in action?

```bash
cd ~/clawd/skills/habit-flow
./examples/demo.sh
```

This creates sample habits, logs some completions, and demonstrates all features.

## Next Steps

1. **Read the full documentation:** `SKILL.md`
2. **Learn atomic habits coaching:** `references/atomic-habits-coaching.md`
3. **Explore personas:** `references/personas.md`
4. **Check data schema:** `references/data-schema.md`

## Troubleshooting

**"command not found: tsx"**
- Always use `npx tsx` not just `tsx`

**Low confidence in natural language parsing**
- Be more specific: "I meditated" → "I meditated today"
- Use full habit names: "ran" → "morning run"

**Habit not found**
- List all habits: `npx tsx scripts/view_habits.ts --active`
- Copy the exact habit ID from the output

**Streaks seem wrong**
- Recalculate: `npx tsx scripts/calculate_streaks.ts --habit-id h_abc123 --update`
- Remember: 1 missed day is forgiven, 2+ breaks the streak

## Getting Help

- 📖 Full docs: `SKILL.md`
- 🐛 Issues: Check README.md troubleshooting section
- 💡 Examples: `examples/demo.sh`

Happy habit building! 🎯
