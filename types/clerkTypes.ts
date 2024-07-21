export type ClerkError = {
	"code": number,
	"clerkError": boolean,
	"errors": ClerkErrors[],
};

export type ClerkErrors = {
	"code": string,
	"message": string,
	"longMessage": string,
	"meta": {
		"paramName": string,
	}
};

export interface API_WorkoutGET {
    clerkID:  string;
    id:       number;
    signup:   Date;
    workouts: Workout[];
}

export interface Workout {
    created:   Date;
    desc:      string | null;
    name:      string;
    preMade:   boolean;
    private:   boolean;
    restTime:  string;
    time:      string;
    updated:   Date | null;
    workoutId: number;
}
