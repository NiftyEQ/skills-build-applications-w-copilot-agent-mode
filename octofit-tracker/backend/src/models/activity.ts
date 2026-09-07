import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);
