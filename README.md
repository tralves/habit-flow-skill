# HabitFlow - AI-Powered Atomic Habit Tracker

A moltbot skill for building lasting habits through natural language interaction, streak tracking with forgiveness, smart reminders, and evidence-based coaching techniques from *Atomic Habits*.

## Features

✅ **Natural Language Logging** - "I meditated today", "walked Monday and Thursday"
✅ **Smart Streak Tracking** - 1-day forgiveness mechanism for realistic progress
✅ **Scheduled Reminders** - WhatsApp notifications at custom times
✅ **AI Coaching** - Evidence-based techniques from *Atomic Habits*
✅ **Multiple Personas** - Flex (MVP), with 5 more coming in Phase 2
✅ **Progress Analytics** - Completion rates, trends, best days
✅ **Multi-Category Support** - Health, fitness, productivity, mindfulness, and more

## Installation

### Option 1: Workspace Installation (Recommended for Single Gateway)

If you have a dedicated workspace directory for your gateway (e.g., `~/clawd/`):

```bash
# Install into your workspace
cd ~/clawd/skills  # or wherever your workspace is
git clone https://github.com/tralves/habit-flow-skill.git habit-flow
cd habit-flow
npm install
```

This gives the skill **highest precedence** and keeps it specific to this gateway.

### Option 2: Shared Installation (For Multiple Agents)

If you want the skill available to all agents on this machine:

```bash
# Install to shared directory
mkdir -p ~/.clawdbot/skills
cd ~/.clawdbot/skills
git clone https://github.com/tralves/habit-flow-skill.git habit-flow
cd habit-flow
npm install
```

### Activate the Skill

After installation: **"refresh skills"** or restart your gateway.

### Detailed Installation Guide

**See: [INSTALL.md](INSTALL.md)** for complete installation instructions, troubleshooting, and verification steps.

## Quick Start

### Create Your First Habit

```bash
npx tsx scripts/manage_habit.ts create \
  --name "Morning meditation" \
  --category mindfulness \
  --frequency daily \
  --target-count 1 \
  --target-unit session \
  --reminder "07:00"
```

### Log a Completion

```bash
npx tsx scripts/log_habit.ts \
  --habit-id h_abc123 \
  --status completed
```

### View Your Habits

```bash
npx tsx scripts/view_habits.ts --active --format markdown
```

### Check Statistics

```bash
npx tsx scripts/get_stats.ts --habit-id h_abc123 --period 30
```

## Natural Language Examples

The skill understands natural language for logging:

- "I meditated today"
- "Walked 3 miles yesterday"
- "I went to the gym Monday, Wednesday, and Friday"
- "Forgot to drink water on Tuesday"
- "Skipped journaling last week - vacation"

## Architecture

### Core Technologies
- **TypeScript/JavaScript** - Reused directly from original HabitFlow codebase
- **Node.js** - Native moltbot environment
- **JSON/JSONL** - Simple, human-readable storage
- **chrono-node** - Natural language date parsing
- **string-similarity** - Fuzzy habit name matching

### Directory Structure

```
~/clawd/skills/habit-flow/
├── SKILL.md                    # Main skill configuration
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── scripts/                    # CLI scripts
│   ├── log_habit.ts           # Record completions
│   ├── calculate_streaks.ts   # Streak calculation (copied from original)
│   ├── view_habits.ts         # Query and list habits
│   ├── manage_habit.ts        # CRUD operations
│   ├── get_stats.ts           # Statistics and analytics
│   ├── parse_natural_language.ts  # NLP parsing
│   └── sync_reminders.ts      # Cron job management
├── src/                        # Shared utilities
│   ├── types.ts               # Type definitions
│   ├── storage.ts             # File I/O
│   ├── daily-completion.ts    # Last log per day logic
│   └── streak-calculation.ts  # Core streak algorithm
├── references/                 # Documentation
│   ├── personas.md            # Persona definitions
│   ├── atomic-habits-coaching.md  # Coaching techniques
│   └── data-schema.md         # Data structure reference
└── assets/                     # Reserved for Phase 2 Canvas UI
```

### Data Storage

```
~/clawd/habit-flow-data/
├── habits.json              # All habits metadata
├── logs/                    # One JSONL file per habit per year
│   ├── h_abc123_2026.jsonl
│   └── h_def456_2026.jsonl
└── config.json              # User config (timezone, persona)
```

## Scripts Reference

| Script | Purpose | Key Options |
|--------|---------|-------------|
| `manage_habit.ts` | Create/update/archive/delete habits | `create`, `update`, `archive`, `delete` |
| `log_habit.ts` | Record completions | `--habit-id`, `--date`, `--dates`, `--status` |
| `view_habits.ts` | Query habits | `--active`, `--archived`, `--search`, `--format` |
| `calculate_streaks.ts` | Recalculate streaks | `--habit-id`, `--format`, `--update` |
| `get_stats.ts` | Generate statistics | `--habit-id`, `--all`, `--period` |
| `parse_natural_language.ts` | Parse natural language | `--text` |
| `sync_reminders.ts` | Sync reminders to cron | `--sync-all`, `--add`, `--remove` |

## Streak Calculation

HabitFlow uses a **1-day forgiveness** mechanism:

- ✅ **Perfect Streak**: No missed days
- ✅ **Excellent Streak**: 1-2 forgiveness days used
- ✅ **Good Streak**: 3-5 forgiveness days used
- ⚠️ **Fair Streak**: More than 5 forgiveness days

**Example:** If you complete days 1, 2, 3, miss day 4, then complete days 5, 6, 7 - your current streak is 7 days with 1 forgiveness day used.

## Coaching Techniques (Atomic Habits)

The skill applies 9 evidence-based coaching techniques:

1. **Minimum Quotas** - Start incredibly small (30 seconds of meditation)
2. **Habit Stacking** - Link to existing routines ("After coffee, then...")
3. **Reduce Friction** - Remove obstacles (lay out workout clothes)
4. **Optimize Timing** - Match natural energy levels
5. **Two-Minute Rule** - Any habit can start with 2 minutes
6. **Immediate Rewards** - Add instant gratification
7. **Temptation Bundling** - Pair with pleasures (podcast + walking)
8. **Identify Breakdown Points** - Plan for high-risk situations
9. **Reframe and Reflect** - Connect to identity ("I AM someone who...")

## Personas

### Flex (Default - MVP)
Professional, data-driven, supportive. Focuses on facts and actionable insights.

### Phase 2 Personas (Future)
- **Coach Blaze** - Energetic motivational coach
- **Luna** - Gentle compassionate therapist
- **Ava** - Curious productivity nerd
- **Max** - Chill laid-back friend
- **The Monk** - Wise minimalist philosopher

## Development

### Testing

Run individual scripts to test:

```bash
# Create a test habit
npx tsx scripts/manage_habit.ts create --name "Test" --category other --frequency daily --target-count 1

# Log a completion
npx tsx scripts/log_habit.ts --habit-id <id> --status completed

# View results
npx tsx scripts/view_habits.ts --active
```

### Adding New Features

1. **New Script**: Create in `scripts/` directory
2. **New Utility**: Add to `src/` directory
3. **Update Types**: Modify `src/types.ts`
4. **Document**: Update `SKILL.md` and this README

## Troubleshooting

### "command not found: tsx"
Use `npx tsx` instead of just `tsx`:
```bash
npx tsx scripts/view_habits.ts --active
```

### "Habit with id X not found"
List all habits to find correct ID:
```bash
npx tsx scripts/view_habits.ts --active --format json
```

### Natural language parsing low confidence
Be more specific with habit names or dates:
- ❌ "I did it" (too vague)
- ✅ "I meditated today" (clear)

### Reminders not working
Ensure moltbot cron is enabled and WhatsApp channel is configured:
```bash
npx tsx scripts/sync_reminders.ts --sync-all
```

## Roadmap

### Phase 1 (MVP) ✅ COMPLETED
- Core habit tracking
- Natural language logging
- Streak calculation with forgiveness
- Basic statistics
- Smart reminders
- Flex persona

### Phase 2 (Future)
- Additional 5 personas
- Canvas dashboard UI
- Advanced analytics (correlations, patterns)
- Habit templates

### Phase 3 (Future)
- Social features (if multi-user support)
- Habit bundles and routines
- Advanced AI coaching

## Credits

Built by reusing and adapting code from the original [HabitFlow](https://github.com/tiagoalves/habit-flow) TypeScript codebase, specifically:

- Streak calculation algorithm from `libs/shared/calculations/`
- Type definitions from `libs/shared/types/`
- Coaching techniques from `apps/ai-service/src/prompts/`
- Persona definitions from `libs/shared/config/src/lib/personas/`

## License

Follows the same license as the original HabitFlow project.

## Support

For issues or questions:
- Check `SKILL.md` for detailed usage instructions
- Review `references/` directory for data schemas and coaching techniques
- Refer to original HabitFlow documentation for algorithm details
