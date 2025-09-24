/** Regular expressions */
export const REGULAR = {
	account: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z][a-zA-Z0-9]{7,15}$/,
	password: /^(?!.*\s).{6,16}$/
}
