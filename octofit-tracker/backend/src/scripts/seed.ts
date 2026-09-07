import mongoose from 'mongoose';

import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      { username: 'alex', name: 'Alex Morgan', email: 'alex@example.com', team: 'trailblazers' },
      { username: 'jamie', name: 'Jamie Lee', email: 'jamie@example.com', team: 'trailblazers' },
      { username: 'riley', name: 'Riley Chen', email: 'riley@example.com', team: 'pace-setters' },
    ]);

    await Team.insertMany([
      { name: 'Trailblazers', slug: 'trailblazers', description: 'Consistent progress, together.' },
      { name: 'Pace Setters', slug: 'pace-setters', description: 'Chasing the next personal best.' },
    ]);

    await Activity.insertMany([
      { username: 'alex', type: 'run', durationMinutes: 32, distanceKm: 5.1, completedAt: new Date('2026-09-05') },
      { username: 'jamie', type: 'cycle', durationMinutes: 45, distanceKm: 18.4, completedAt: new Date('2026-09-06') },
      { username: 'riley', type: 'strength', durationMinutes: 28, completedAt: new Date('2026-09-06') },
    ]);

    await LeaderboardEntry.insertMany([
      { username: 'alex', points: 820, rank: 1 },
      { username: 'riley', points: 765, rank: 2 },
      { username: 'jamie', points: 710, rank: 3 },
    ]);

    await Workout.insertMany([
      { title: 'Morning Endurance', category: 'cardio', difficulty: 'beginner', durationMinutes: 30, exercises: ['Jog', 'Walk', 'Stretch'] },
      { title: 'Full Body Circuit', category: 'strength', difficulty: 'intermediate', durationMinutes: 35, exercises: ['Squats', 'Push-ups', 'Plank'] },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
