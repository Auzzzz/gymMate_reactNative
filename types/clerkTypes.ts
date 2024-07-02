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