import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [String], required: true },
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);
