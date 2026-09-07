import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);
