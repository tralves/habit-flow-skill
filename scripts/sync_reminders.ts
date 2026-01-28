#!/usr/bin/env node
/**
 * Sync Reminders Script
 * Synchronize habit reminder settings to moltbot cron jobs
 */

import { Command } from 'commander';
import { loadHabits, loadConfig } from '../src/storage.js';
import { execSync } from 'child_process';

const program = new Command();

program
  .name('sync_reminders')
  .description('Sync habit reminders to moltbot cron jobs')
  .option('--sync-all', 'Sync all habit reminders')
  .option('--habit-id <id>', 'Sync specific habit')
  .option('--add', 'Add reminder for habit')
  .option('--remove', 'Remove reminder for habit')
  .option('--update', 'Update reminder for habit')
  .action(async (options) => {
    try {
      const data = await loadHabits();
      const config = await loadConfig();

      let habits = data.habits;

      if (options.habitId) {
        const habit = habits.find(h => h.id === options.habitId);
        if (!habit) {
          throw new Error(`Habit with id ${options.habitId} not found`);
        }
        habits = [habit];
      }

      const results = [];

      for (const habit of habits) {
        if (!habit.reminderSettings?.enabled && !options.remove) {
          continue;
        }

        const cronName = `HabitFlow: ${habit.name}`;

        if (options.remove) {
          // Remove cron job
          try {
            execSync(`moltbot cron remove --name "${cronName}"`, { stdio: 'pipe' });
            results.push({
              habitId: habit.id,
              habitName: habit.name,
              action: 'removed',
              success: true
            });
          } catch (error) {
            results.push({
              habitId: habit.id,
              habitName: habit.name,
              action: 'removed',
              success: false,
              error: 'Cron job not found or already removed'
            });
          }
          continue;
        }

        if (options.update) {
          // Remove old cron job first
          try {
            execSync(`moltbot cron remove --name "${cronName}"`, { stdio: 'pipe' });
          } catch (error) {
            // Ignore error if cron job doesn't exist
          }
        }

        // Add/update cron job for each reminder time
        if (habit.reminderSettings?.times && habit.reminderSettings.times.length > 0) {
          for (const time of habit.reminderSettings.times) {
            const [hour, minute] = time.split(':');
            const cronExpression = `${minute} ${hour} * * *`;

            const message = habit.reminderSettings.message ||
              `🎯 Reminder: Time for your ${habit.name}\n\nTarget: ${habit.targetCount} ${habit.targetUnit || 'session'}\nCurrent streak: ${habit.currentStreak} days 🔥\n\nQuick log: Reply 'done', 'skipped', or 'missed'`;

            try {
              const cronCommand = [
                'moltbot cron add',
                `--name "${cronName}"`,
                `--cron "${cronExpression}"`,
                `--tz "${config.timezone}"`,
                '--session isolated',
                `--message "${message.replace(/"/g, '\\"')}"`,
                '--deliver',
                '--channel whatsapp'
              ].join(' ');

              execSync(cronCommand, { stdio: 'pipe' });

              results.push({
                habitId: habit.id,
                habitName: habit.name,
                action: options.update ? 'updated' : 'added',
                time,
                cronExpression,
                success: true
              });
            } catch (error: any) {
              results.push({
                habitId: habit.id,
                habitName: habit.name,
                action: options.update ? 'updated' : 'added',
                time,
                success: false,
                error: error.message
              });
            }
          }
        }
      }

      console.log(JSON.stringify({
        success: true,
        results
      }, null, 2));
    } catch (error: any) {
      console.error(JSON.stringify({
        success: false,
        error: error.message
      }, null, 2));
      process.exit(1);
    }
  });

program.parse();
