export type ClerkError = {
  code: number;
  clerkError: boolean;
  errors: ClerkErrors[];
};

export type ClerkErrors = {
  code: string;
  message: string;
  longMessage: string;
  meta: {
    paramName: string;
  };
};

// Get all workouts for API call
export type API_WorkoutGET = {
  clerkID: string;
  id: number;
  signup: Date;
  workouts: Workout[];
};


// Element of a workout
// a group of exercises (element)
export interface Elements {
  sets: number;
  reps: number;
  weight: string;
  time: string;
  restTime: string;
  order: number;
  notes: string;
  elementId: number;
  WorkoutElementID: number;
  element: Element;
}

// A individual element (type of exercise)
export interface Element {
  elementId: number;
  name: string;
  desc: string;
  uri: string;
}
// Workout data
export interface Workout {
  created: Date;
  desc: string | null;
  name: string;
  preMade: boolean;
  private: boolean;
  restTime: string;
  time: string;
  updated: Date | null;
  workoutId: number;
  elements?: Elements[];
}
