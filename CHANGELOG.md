# Changelog

All notable changes to HabitFlow skill will be documented in this file.

## [1.0.0] - 2026-01-28

### Added - MVP Release (Phase 1)

#### Core Features
- ✅ Habit creation and management (CRUD operations)
- ✅ Natural language logging with chrono-node date parsing
- ✅ String similarity matching for habit names
- ✅ Streak calculation with 1-day forgiveness mechanism
- ✅ Smart reminders via clawdbot cron jobs → WhatsApp delivery
- ✅ Basic statistics (completion rate, trends, best day of week)
- ✅ Flex persona (default neutral professional tone)

#### Scripts
- `manage_habit.ts` - Create, update, archive, delete habits
- `log_habit.ts` - Record single or bulk completions
- `view_habits.ts` - Query and list habits (JSON, markdown, text)
- `calculate_streaks.ts` - Compute streaks with forgiveness
- `get_stats.ts` - Generate completion statistics
- `parse_natural_language.ts` - Parse natural language to structured data
- `sync_reminders.ts` - Sync habit reminders to cron jobs

#### Data Storage
- JSON-based storage in `~/clawd/habit-flow-data/`
- JSONL format for logs (one file per habit per year)
- Config file for user settings (timezone, persona, userId)

#### Documentation
- `SKILL.md` - Complete skill documentation
- `README.md` - Project overview and architecture
- `QUICKSTART.md` - 5-minute getting started guide
- `references/personas.md` - All persona definitions
- `references/atomic-habits-coaching.md` - 9 coaching techniques
- `references/data-schema.md` - Data structure reference

#### Examples
- `examples/demo.sh` - Full demonstration script
- `examples/utils.sh` - Utility functions for shell usage

#### Core Algorithms
- Streak calculation directly ported from original TypeScript codebase
- Daily completion logic (last log per day)
- Forgiveness mechanism (1 missed day allowed)
- Quality grading (perfect, excellent, good, fair)

### Technical Details

**Dependencies:**
- chrono-node: ^2.7.0 (natural language date parsing)
- string-similarity: ^4.0.4 (fuzzy habit name matching)
- zod: ^3.22.0 (validation)
- commander: ^11.0.0 (CLI interface)
- tsx: ^4.0.0 (TypeScript execution)
- typescript: ^5.3.0

**Architecture:**
- TypeScript/JavaScript (Node.js native)
- Reuses original HabitFlow streak calculation algorithm
- No database required (JSON/JSONL storage)
- CLI-first design for skill integration

## [1.1.0] - 2026-01-28

### Added - Phase 2: Multi-Persona Support

#### Personas
- ✅ **Coach Blaze** - Energetic sports coach with high-energy motivational style 🔥
- ✅ **Luna** - Gentle therapist with compassionate, reflective guidance 💜
- ✅ **Ava** - Curious productivity nerd focused on experiments and data 🤓
- ✅ **Max** - Chill buddy with laid-back, no-pressure vibes 😎
- ✅ **The Monk** - Wise minimalist with philosophical, intentional approach 🧘

#### Features
- Dynamic persona loading from `config.json`
- Persona-specific communication styles (tone, vocabulary, response patterns)
- Smooth persona switching with style transitions
- Updated SKILL.md with all 6 persona definitions
- First-time setup now offers persona selection

#### Documentation Updates
- Updated README.md with all personas
- Updated roadmap (Phase 2 complete, Phase 3 in progress)
- Added persona switching instructions
- Enhanced first-time setup flow

## [Unreleased] - Future Phases

### Phase 3 - Advanced Features (In Progress)
- [ ] Canvas dashboard UI with visualizations
- [ ] Advanced analytics (time-of-day patterns, correlations)
- [ ] Enhanced atomic habits coaching techniques
- [ ] Habit templates and bundles

### Phase 3 - Social Features (Planned)
- [ ] Multi-user support
- [ ] Accountability partners
- [ ] Group challenges
- [ ] Shared streaks

### Phase 4 - Advanced Features (Planned)
- [ ] Custom frequency patterns (e.g., 3x/week, every other day)
- [ ] Habit dependencies (do X before Y)
- [ ] Time-of-day analytics
- [ ] Predictive streak warnings

---

## Version History

### v1.0.0 (2026-01-28)
Initial MVP release with core habit tracking, natural language processing, streak calculation with forgiveness, reminders, and Flex persona coaching.
