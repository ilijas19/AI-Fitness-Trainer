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
// MEAL PLAN
export type Meal = {
  name: string;
  ingredients: string[];
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
};

export type MealPlan = {
  totalCalories: number;
  totalMacros: {
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
  };
  breakfast: Meal;
  lunch: Meal;
  snack: Meal;
  dinner: Meal;
  user: string;
};

export type MealPlanArg = {
  age: number;
  weight: number;
  height: number;
  gender: string;
  activityLevel: string;
  goal: string;
  dietaryPreferences?: string;
  excludedIngredients?: string[];
};

export type MealPlanRes = {
  mealPlan: MealPlan;
};

export type GetMyMealPlansRes = {
  page: number;
  hasNextPage: boolean;
  mealPlans: MealPlan[];
};
