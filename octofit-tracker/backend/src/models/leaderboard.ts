import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
