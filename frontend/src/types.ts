export type MessageRes = {
  msg: string;
};

// AUTH
export type CurrentUser = {
  userId: string;
  username: string;
  email: string;
  role: "admin" | "user";
};

export type RegisterArgs = {
  username: string;
  email: string;
  password: string;
};

export type LoginRes = {
  msg: string;
  currentUser: CurrentUser;
};

export type LoginArgs = {
  email: string;
  password: string;
};
// Training
export type Excercise = {
  name: string;
  description: string;
  muscleGroup: string;
  sets: number;
  reps: number;
  restBetweenSets: number;
  _id: string;
};

export type Session = {
  day: string;
  exercises: Excercise[];
  focusArea: string;
  _id: string;
};

export type TrainingPlan = {
  _id: string;
  user: string;
  title: string;
  description: string;
  goal: string;
  level: string;
  type: string;
  daysPerWeek: number;
  sessions: Session[];
  createdAt: Date;
  updatedAt: Date;
};

// GEMINI
export type TrainingPlanArgs = {
  goal: string;
  type: string;
  level: string;
  daysPerWeek: number;
  additionalInfo: string;
};

export type TrainingPlanRes = {
  plan: TrainingPlan;
};
