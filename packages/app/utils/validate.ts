import { REGULAR } from "../enums/regular"

/** 验证输入是否合法 */
export function validateInput(value: string, type: string) {
	const regex = REGULAR[type]

	return regex?.test(value)
}
