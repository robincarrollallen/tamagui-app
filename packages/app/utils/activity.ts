import type { LanguageType, ResetType, RechargeType, ActivityType } from "app/enums"
import { formatMoney } from "./format"

/** Preview text first */
const previewText_First: Recordable<Recordable<string>> = {
	'zh-CN': {
		OTHER: '最高奖励{maximum}',
		REBATE: '最高返水比例{maximum}%',
		OTHER_RANGE: '最高奖励{maximum}%',
	},
	'en-US': {
		OTHER: 'Maximum bonus {maximum}',
		REBATE: 'Maximum rebate rate {maximum}%',
		OTHER_RANGE: 'Maximum bonus {maximum}%',
	},
	'pt-BR': {
		OTHER: 'Bônus máximo {maximum}',
		REBATE: 'Taxa máxima de cashback {maximum}%',
		OTHER_RANGE: 'Bônus máximo {maximum}%',
	},
	'id-ID': {
		OTHER: 'Hadiah Tertinggi {maximum}',
		REBATE: 'Persentase Pengembalian Uang Tertinggi {maximum}%',
		OTHER_RANGE: 'Hadiah Tertinggi {maximum}%',
	},
	'hi-IN': {
		OTHER: 'अधिकतम बोनस {maximum}',
		REBATE: 'अधिकतम रिबेट दर {maximum}%',
		OTHER_RANGE: 'अधिकतम बोनस {maximum}%',
	},
	'vi-VN': {
		OTHER: 'Tiền thưởng tối đa{maximum}',
		REBATE: 'Tỷ lệ hoàn tiền tối đa {maximum}%',
		OTHER_RANGE: 'Tiền thưởng tối đa {maximum}%',
	},
}

/**
 * Get language code
 * @param language - Language
 */
export function getLanguageCode(language: LanguageType) {
	if (language === 'en-PH') {
		return 'en-US'
	}
	return language // Return original language
}

/**
 * Get recharge activity name
 * @param language - Language
 * @param resetType - Reset type
 * @param rechargeType - Recharge type
 */
export function getRechargeActivityName(language: LanguageType, resetType: ResetType, rechargeType: RechargeType): string {
	const names = {
		'zh-CN': {
			NONE: {
				FIRST: '首充额外奖励',
				SINGLE: '单笔充值加赠',
				SUM: '累计充值加赠',
			},
			DAILY: {
				FIRST: '每日首充加赠',
				SINGLE: '每日单笔充值加赠',
				SUM: '每日累计充值加赠',
			},
			WEEKLY: {
				FIRST: '每周首充加赠',
				SINGLE: '每周单笔充值加赠',
				SUM: '每周累计充值加赠',
			},
		},
		'en-US': {
			NONE: {
				FIRST: 'First Deposit Extra Reward',
				SINGLE: 'Additional bonus for every recharge',
				SUM: 'Cumulative recharge additional reward',
			},
			DAILY: {
				FIRST: 'Daily First Deposit Extra Reward',
				SINGLE: 'Daily Additional bonus for every recharge',
				SUM: 'Daily Cumulative recharge additional reward',
			},
			WEEKLY: {
				FIRST: 'Weekly First Deposit Extra Reward',
				SINGLE: 'Weekly Additional bonus for every recharge',
				SUM: 'Weekly Cumulative recharge additional reward',
			},
		},
		'pt-BR': {
			NONE: {
				FIRST: 'Recompensa Extra para Primeiro Depósito',
				SINGLE: 'Bônus adicional para cada recarga',
				SUM: 'Recompensa adicional de recarga acumulativa',
			},
			DAILY: {
				FIRST: 'Recompensa Extra de Primeiro Depósito Diário',
				SINGLE: 'Bônus adicional diário para cada recarga',
				SUM: 'Recompensa adicional diária por recarga acumulada',
			},
			WEEKLY: {
				FIRST: 'Recompensa Extra de Primeiro Depósito Semanal',
				SINGLE: 'Bônus adicional semanal para cada recarga',
				SUM: 'Bônus Semanal de Recarga Cumulativa',
			},
		},
		'id-ID': {
			NONE: {
				FIRST: 'Bonus tambahan untuk isi ulang pertama',
				SINGLE: 'Bonus tambahan untuk setiap isi ulang',
				SUM: 'Bonus tambahan untuk akumulasi isi ulang',
			},
			DAILY: {
				FIRST: 'Bonus tambahan untuk isi ulang pertama setiap hari',
				SINGLE: 'Bonus tambahan untuk setiap isi ulang tunggal harian',
				SUM: 'Bonus tambahan untuk akumulasi isi ulang harian',
			},
			WEEKLY: {
				FIRST: 'Bonus tambahan untuk isi ulang pertama setiap minggu',
				SINGLE: 'Bonus tambahan untuk setiap isi ulang tunggal mingguan',
				SUM: 'Bonus tambahan untuk akumulasi isi ulang mingguan',
			},
		},
		'hi-IN': {
			NONE: {
				FIRST: 'पहली जमा पर अतिरिक्त इनाम',
				SINGLE: 'प्रत्येक रिचार्ज पर अतिरिक्त बोनस',
				SUM: 'संचयी रिचार्ज अतिरिक्त इनाम',
			},
			DAILY: {
				FIRST: 'दैनिक पहले जमा पर अतिरिक्त इनाम',
				SINGLE: 'प्रत्येक रिचार्ज पर दैनिक अतिरिक्त बोनस',
				SUM: 'दैनिक संचयी रिचार्ज अतिरिक्त इनाम',
			},
			WEEKLY: {
				FIRST: 'साप्ताहिक पहले जमा पर अतिरिक्त इनाम',
				SINGLE: 'प्रत्येक रिचार्ज पर साप्ताहिक अतिरिक्त बोनस',
				SUM: 'साप्ताहिक संचयी रिचार्ज अतिरिक्त इनाम',
			},
		},
		'vi-VN': {
			NONE: {
				FIRST: 'Tiền thưởng thêm khi gửi tiền lần đầu',
				SINGLE: 'Tiền thưởng gửi tiền một lần',
				SUM: 'Tiền thưởng tiền gửi tích lũy',
			},
			DAILY: {
				FIRST: 'Tiền thưởng gửi tiền đầu tiên hàng ngày',
				SINGLE: 'Tiền thưởng gửi tiền đơn hàng ngày',
				SUM: 'Tiền thưởng gửi tiền tích lũy hàng ngày',
			},
			WEEKLY: {
				FIRST: 'Tiền thưởng gửi tiền đầu tiên hàng tuần',
				SINGLE: 'Tiền thưởng gửi tiền một lần hàng tuần',
				SUM: 'Tiền thưởng gửi tiền tích lũy hàng tuần',
			},
		},
	}

	return names[language][resetType][rechargeType]
}

/**
 * Get rescue fund activity name
 * @param language - Language
 * @param resetType - Reset type
 */
export function getRescueFundActivityName(language: LanguageType, resetType: ResetType): string {
	const names = {
		'zh-CN': {
			NONE: '',
			DAILY: '每日救援金',
			WEEKLY: '每周救援金',
		},
		'en-US': {
			NONE: '',
			DAILY: 'Daily loss rescue fund',
			WEEKLY: 'Weekly loss rescue fund',
		},
		'pt-BR': {
			NONE: '',
			DAILY: 'Fundo de Resgate de Perdas Diárias',
			WEEKLY: 'Fundo de Resgate de Perdas Semanais',
		},
		'id-ID': {
			NONE: '',
			DAILY: 'Uang bantuan harian',
			WEEKLY: 'Uang bantuan mingguan',
		},
		'hi-IN': {
			NONE: '',
			DAILY: 'दैनिक राहत कोष',
			WEEKLY: 'साप्ताहिक राहत कोष',
		},
		'vi-VN': {
			NONE: '',
			DAILY: 'Quỹ cứu trợ hàng ngày',
			WEEKLY: 'Quỹ cứu trợ hàng tuần',
		},
	}

	return names[language][resetType]
}

/**
 * Get lucky wheel activity name
 * @param language - Language
 * @param resetType - Reset type
 */
export function getLuckyWheelActivityName(language: LanguageType, resetType: ResetType): string {
	const names = {
		'zh-CN': {
			NONE: '幸运转盘',
			DAILY: '每日幸运转盘',
			WEEKLY: '每周幸运转盘',
		},
		'en-US': {
			NONE: 'Lucky Spin',
			DAILY: 'Daily Lucky Spin',
			WEEKLY: 'Weekly Lucky Spin',
		},
		'pt-BR': {
			NONE: 'Giro da Sorte',
			DAILY: 'Giro da Sorte Diário',
			WEEKLY: 'Giro da Sorte Semanal',
		},
		'id-ID': {
			NONE: 'Roda Keberuntungan',
			DAILY: 'Roda Keberuntungan Harian',
			WEEKLY: 'Roda Keberuntungan Mingguan',
		},
		'hi-IN': {
			NONE: 'लकी रूले',
			DAILY: 'दैनिक लकी रूले',
			WEEKLY: 'साप्ताहिक लकी रूले',
		},
		'vi-VN': {
			NONE: 'Vòng quay may mắn',
			DAILY: 'Vòng quay may mắn hàng ngày',
			WEEKLY: 'Vòng quay may mắn hàng tuần',
		},
	}

	return names[language][resetType]
}

/**
 * Get commission reward activity name
 * @param language - Language
 * @param resetType - Reset type
 */
export function getCommissionRewardActivityName(language: LanguageType, resetType: ResetType): string {
	const names = {
		'zh-CN': {
			NONE: '',
			DAILY: '每日佣金奖励',
			WEEKLY_DAY: '每周佣金奖励',
			MONTHLY_DAY: '每月佣金奖励',
		},
		'en-US': {
			NONE: '',
			DAILY: 'Daily commission reward',
			WEEKLY_DAY: 'Weekly commission reward',
			MONTHLY_DAY: 'Monthly commission reward',
		},
		'pt-BR': {
			NONE: '',
			DAILY: 'Recompensa de Comissão Diária',
			WEEKLY_DAY: 'Recompensa de Comissão Semanal',
			MONTHLY_DAY: 'Recompensa de Comissão Mensal',
		},
		'id-ID': {
			NONE: '',
			DAILY: 'Hadiah Acara Komisi Harian',
			WEEKLY_DAY: 'Hadiah Acara Komisi Mingguan',
			MONTHLY_DAY: 'Hadiah Acara Komisi Bulanan',
		},
		'hi-IN': {
			NONE: '',
			DAILY: 'दैनिक कमीशन इवेंट पुरस्कार',
			WEEKLY_DAY: 'साप्ताहिक कमीशन इवेंट पुरस्कार',
			MONTHLY_DAY: 'महीने का कमीशन इवेंट पुरस्कार',
		},
		'vi-VN': {
			NONE: '',
			DAILY: 'Tiền thưởng hoa hồng hằng ngày',
			WEEKLY_DAY: 'Tiền thưởng hoa hồng hàng tuần',
			MONTHLY_DAY: 'Tiền thưởng hoa hồng hàng tháng',
		},
	}

	return names[language][resetType]
}


/**Generate activity name
 * @param language - Language type
 * @param activityType - Activity type
 * @param variables - Activity variables
 */
export function getActivityDefaultName(language: LanguageType, activityType: ActivityType, variables: Recordable<string | number>): string {
	language = getLanguageCode(language)
	if (activityType === 'Recharge') {
		return getRechargeActivityName(language, variables.resetType as ResetType, variables.rechargeType as RechargeType)
	}
	else if (activityType === 'Assistance') {
		return getRescueFundActivityName(language, variables.resetType as ResetType)
	}
	else if (activityType === 'LuckyWheel') {
		return getLuckyWheelActivityName(language, variables.resetType as ResetType)
	}
	else if (activityType === 'CommissionReward') {
		return getCommissionRewardActivityName(language, variables.resetType as ResetType)
	}

	const activityNames = {
		AgencyTwo: {
			"zh-CN": "代理活动2",
			"en-US": "Affiliate 2",
			"pt-BR": "Agente 2",
			"vi-VN": "Đại Lý 2",
			"id-ID": "Agen 2",
			"hi-IN": "एजेंट 2",
		},
		SignIn: {
			'zh-CN': '签到',
			'en-US': 'Sign in',
			'pt-BR': 'Entrar',
			'id-ID': 'Pendaftaran',
			'hi-IN': 'साइन इन',
			'vi-VN': 'Đăng nhập',
		},
		Custom: {
			'zh-CN': '自定义',
			'en-US': 'Custom event',
			'pt-BR': 'Evento personalizado',
			'id-ID': 'Disesuaikan',
			'hi-IN': 'कस्टम इवेंट',
			'vi-VN': 'Tùy chỉnh',
		},
		RechargeReward: {
			'zh-CN': '充值赠送',
			'en-US': 'Recharge discount',
			'pt-BR': 'Desconto de recarga',
			'id-ID': 'Bonus Isi Ulang',
			'hi-IN': 'रिचार्ज छूट',
			'vi-VN': 'Khuyến mãi nạp lại',
		},
		RedPacket: {
			'zh-CN': '神秘矿场',
			'en-US': 'Mysterious Mine',
			'pt-BR': 'Mina Misteriosa',
			'id-ID': 'Tambang Misterius',
			'hi-IN': 'रहस्यमय खदान',
			'vi-VN': 'Mỏ vàng bí ẩn',
		},
		Agency: {
			'zh-CN': '推荐好友领彩金',
			'en-US': 'Refer friends to receive a bonus',
			'pt-BR': 'Indique amigos para receber um bônus',
			'id-ID': 'Rekomendasikan teman untuk menerima bonus',
			'hi-IN': 'दोस्तों को रेफर करें और बोनस प्राप्त करें।',
			'vi-VN': 'Giới thiệu bạn bè để nhận thưởng',
		},
		Rebate: {
			'zh-CN': '返水活动',
			'en-US': 'Wagering Cashback',
			'pt-BR': 'Cashback de Apostas',
			'id-ID': 'Program Pengembalian Uang',
			'hi-IN': 'शर्त लगाने पर कैशबैक',
			'vi-VN': 'Trả lại tiền cược',
		},
		AssistanceCash: {
			'zh-CN': '助力领现金',
			'en-US': 'Earn cash by inviting friends',
			'pt-BR': 'Ganhe dinheiro convidando amigos',
			'id-ID': 'Bantu untuk Dapatkan Uang Tunai',
			'hi-IN': 'दोस्तों को आमंत्रित करके नकद कमाएं',
			'vi-VN': 'Giúp bạn kiếm tiền bằng cách giới thiệu bạn bè',
		},
		MemberReward: {
			'zh-CN': '会员答谢(单日)',
			'en-US': 'Member Appreciation',
			'pt-BR': 'Apreciação aos Membros',
			'id-ID': 'Apresiasi Anggota',
			'hi-IN': 'सदस्य प्रशंसा',
			'vi-VN': 'Cảm ơn thành viên',
		},
		MysteryReward: {
			'zh-CN': '神秘彩金活动',
			'en-US': 'Mystery Bonus Event',
			'pt-BR': 'Evento de Bônus Misterioso',
			'id-ID': 'Acara Bonus Misteri',
			'hi-IN': 'रहस्यमय बोनस इवेंट',
			'vi-VN': 'Sự kiện bất ngờ',
		},
		newbieTaskReward: {
			'zh-CN': '新人福利',
			'en-US': 'Newbie benefits',
			'pt-BR': 'Benefícios para iniciantes',
			'id-ID': 'Manfaat bagi pemula',
			'hi-IN': 'नौसिखिया लाभ',
			'vi-VN': 'Lợi ích cho người mới',
		},
		CommissionReward: {
			'zh-CN': '每日佣金奖励',
			'en-US': 'Daily Commission Event Reward',
			'pt-BR': 'Recompensa do Evento de Comissão Diária',
			'id-ID': 'Hadiah Acara Komisi Harian',
			'hi-IN': 'दैनिक कमीशन इवेंट पुरस्कार',
			'vi-VN': 'Phần thưởng sự kiện hoa hồng hàng ngày',
		},
		CPFActivity: {
			'zh-CN': '邀请好友',
			'en-US': 'Invite Friends',
			'pt-BR': 'Convidar Amigos',
			'id-ID': 'Undang Teman',
			'hi-IN': 'मित्रों को आमंत्रित करें',
			'vi-VN': 'Mời bạn bè',
		},
		googleDomainReward: {
			'zh-CN': '版本升级奖金',
			'en-US': 'Version Upgrade Bonus',
			'pt-BR': 'Bônus de atualização de versão',
			'id-ID': 'Bonus peningkatan versi',
			'hi-IN': 'संस्करण उन्नयन बोनस',
			'vi-VN': 'Phần thưởng cập nhật phiên bản',
		},
		LuckyBet: {
			'zh-CN': '幸运注单',
			'en-US': 'Lucky Bet',
			'pt-BR': 'Aposta da Sorte',
			'id-ID': 'Taruhan Beruntung',
			'hi-IN': 'भाग्यशाली बेट',
			'vi-VN': 'Đặt cược may mắn',
		},
		SignInVolume: {
			'zh-CN': '签到奖励',
			'en-US': 'Sign in reward',
			'pt-BR': 'Recompensa de entrada',
			'id-ID': 'Hadiah masuk',
			'hi-IN': 'साइन इन पुरस्कार',
			'vi-VN': 'Phần thưởng điểm danh',
		},
		WalletUserActivity: {
			'zh-CN': '邀请好友',
			'en-US': 'Invite Friends',
			'pt-BR': 'Convidar Amigos',
			'id-ID': 'Undang Teman',
			'hi-IN': 'मित्रों को आमंत्रित करें',
			'vi-VN': 'Mời bạn bè',
		},
		MemberRewardMultiDay: {
			'zh-CN': '会员答谢(多日)',
			'en-US': 'Member Appreciation (Multiple Days)',
			'pt-BR': 'Apreciação aos Membros (Vários Dias)',
			'id-ID': 'Apresiasi Anggota (Multi Hari)',
			'hi-IN': 'सदस्य प्रशंसा (कई दिन)',
			'vi-VN': 'Cảm ơn thành viên (Nhiều ngày)',
		},
		RechargePromotion: {
			'zh-CN': '充值大酬宾',
			'en-US': 'Deposit Rewards',
			'pt-BR': 'Recompensas de depósito',
			'id-ID': 'Hadiah Deposit',
			'hi-IN': 'जमा पुरस्कार',
			'vi-VN': 'Khuyến mãi nạp lại',
		},
		NewUserExclusive: {
			'zh-CN': '新人首充奖励',
			'en-US': 'New member first deposit reward',
			'pt-BR': 'recompensa de primeiro depósito para novos membros',
			'id-ID': 'hadiah deposit pertama member baru',
			'hi-IN': 'नये सदस्य को प्रथम जमा पुरस्कार',
			'vi-VN': 'phần thưởng tiền gửi đầu tiên của thành viên mới',
		},
		FirstRechargeRebate: {
			'zh-CN': '首充亏损返利',
			'en-US': 'First Recharge Loss Rebate',
			'pt-BR': 'Rebate da Primeira Recarga de Perda',
			'id-ID': 'Bonus Rebatu Pertama untuk Kerugian',
			'hi-IN': 'पहली शुल्क वापसी के लिए नुकसान',
		},
		FirstWithdrawRebate: {
			'zh-CN': '首次提现返利',
			'en-US': 'First Withdrawal Rebate',
			'pt-BR': 'Rebate da Primeira Saque',
			'id-ID': 'Bonus Rebatu Pertama untuk Penarikan',
			'hi-IN': 'पहली निकासी वापसी',
		},
		ReferralRewardsNew: {
			'zh-CN': '分享赚钱',
			'en-US': 'Share to Earn',
			'pt-BR': 'Compartilhe para Ganhar',
			'id-ID': 'Bagikan untuk Menghasilkan',
			'hi-IN': 'शेयर करें और कमाएँ',
			'vi-VN': 'Chia sẻ để kiếm tiền',
		},
		RechargeBonus: {
			'zh-CN': '存款奖金',
			'en-US': 'Deposit Bonus',
			'pt-BR': 'Bônus de Depósito',
			'id-ID': 'Bonus Deposit',
			'hi-IN': 'जमा बोनस',
			'vi-VN': 'Thưởng Gửi Tiền',
		},
	}
	return activityNames?.[activityType]?.[language] || 'Unknown Activity'
}

/** Preview text second mystery reward */
const previewText_Second_mysteryReward: Recordable<Recordable<string>> = {
	'zh-CN': {
		NONE: '一次性',
		PERIODIC: '循环',
	},
	'en-US': {
		NONE: 'Disposable',
		PERIODIC: 'Cycle',
	},
	'pt-BR': {
		NONE: 'Descartável',
		PERIODIC: 'Ciclo',
	},
	'id-ID': {
		NONE: 'Disposable',
		PERIODIC: 'Siklus',
	},
	'hi-IN': {
		NONE: 'डिस्पोजेबल',
		PERIODIC: 'चक्र',
	},
	'vi-VN': {
		NONE: 'dùng một lần',
		PERIODIC: 'chu trình',
	},
}

/** Preview text second */
const previewText_Second: Recordable<Recordable<string>> = {
	'zh-CN': {
		NONE: '不重置',
		DAILY: '每日重置',
		WEEKLY: '每周重置',
		WEEKLY_DAY: '每周重置',
		MONTHLY_DAY: '每月重置',
		PERIODIC: '跟随活动',
	},
	'en-US': {
		NONE: 'No reset',
		DAILY: 'Reset daily',
		WEEKLY: 'Reset weekly',
		WEEKLY_DAY: 'Reset weekly',
		MONTHLY_DAY: 'Reset monthly',
		PERIODIC: 'Following activity',
	},
	'pt-BR': {
		NONE: 'Sem reinício',
		DAILY: 'Reinício diário',
		WEEKLY: 'Reinício semanal',
		WEEKLY_DAY: 'Reinício semanal',
		MONTHLY_DAY: 'Reinício mensal',
		PERIODIC: 'Atividade seguinte',
	},
	'id-ID': {
		NONE: 'Tidak Mereset',
		DAILY: 'Reset Harian',
		WEEKLY: 'Reset Mingguan',
		WEEKLY_DAY: 'Reset Mingguan',
		MONTHLY_DAY: 'Reset Bulanan',
		PERIODIC: 'Kegiatan lanjutan',
	},
	'hi-IN': {
		NONE: 'रीसेट नहीं',
		DAILY: 'दैनिक रीसेट',
		WEEKLY: 'साप्ताहिक रीसेट',
		WEEKLY_DAY: 'साप्ताहिक रीसेट',
		MONTHLY_DAY: 'हर महीने रीसेट',
		PERIODIC: 'अनुवर्ती गतिविधि',
	},
	'vi-VN': {
		NONE: 'Không thiết lập lại',
		DAILY: 'Đặt lại hàng ngày',
		WEEKLY: 'Thiết lập lại hàng tuần',
		WEEKLY_DAY: 'Thiết lập lại hàng tuần',
		MONTHLY_DAY: 'Đặt lại hàng tháng',
		PERIODIC: 'Theo dõi sự kiện',
	},
}

const previewText_Third: Recordable<Recordable<string>> = {
	'zh-CN': {
		ABANDONED: '过期作废',
		AUTO: '过期自动发放',
		RESERVE: '跨天，跨周，跨月时，未领取奖励邮件下发',
		ABOLISHMENT: '跨天，跨周，跨月时，未领取奖励系统回收作废',
		RETAIN_DAY_AUTO: '奖励保留天数自动发放',
		RETAIN_DAY_ABANDONED: '奖励保留天数作废',
	},
	'en-US': {
		ABANDONED: 'Void if not claimed',
		AUTO: 'Auto-payout upon expiration',
		RESERVE: 'Unclaimed rewards will be sent via email when crossing day, week, or month boundaries',
		ABOLISHMENT: 'Unclaimed rewards will be voided by the system when crossing day, week, or month boundaries',
		RETAIN_DAY_AUTO: 'Auto-payout after reward retention period',
		RETAIN_DAY_ABANDONED: 'Void after reward retention period',
	},
	'pt-BR': {
		ABANDONED: 'Nulo se não reclamado',
		AUTO: 'Pagamento automático ao expirar',
		RESERVE: 'Recompensas não reclamadas serão enviadas por e-mail ao cruzar limites de dia, semana ou mês',
		ABOLISHMENT: 'Recompensas não reclamadas serão anuladas pelo sistema ao cruzar limites de dia, semana ou mês',
		RETAIN_DAY_AUTO: 'Pagamento automático após o período de retenção da recompensa',
		RETAIN_DAY_ABANDONED: 'Nulo após o período de retenção da recompensa',
	},
	'id-ID': {
		ABANDONED: 'Kadaluarsa dan Dinyatakan Tidak Berlaku',
		AUTO: 'Otomatis Dikeluarkan saat Kadaluarsa',
		RESERVE: 'Hadiah yang belum diklaim akan dikirim melalui email saat melewati batas hari, minggu, atau bulan',
		ABOLISHMENT: 'Hadiah yang belum diklaim akan dibatalkan oleh sistem saat melewati batas hari, minggu, atau bulan',
		RETAIN_DAY_AUTO: 'Pembayaran otomatis setelah masa penyimpanan hadiah',
		RETAIN_DAY_ABANDONED: 'Tidak berlaku setelah masa penyimpanan hadiah',
	},
	'hi-IN': {
		ABANDONED: 'यदि दावा नहीं किया गया तो अमान्य',
		AUTO: 'समाप्ति पर स्वत: भुगतान',
		RESERVE: 'दिन, सप्ताह, या महीने की सीमाएं पार करने पर दावा न किए गए पुरस्कार ईमेल के माध्यम से भेजे जाएंगे',
		ABOLISHMENT: 'दिन, सप्ताह, या महीने की सीमाएं पार करने पर दावा न किए गए पुरस्कार सिस्टम द्वारा रद्द कर दिए जाएंगे',
		RETAIN_DAY_AUTO: 'पुरस्कार प्रतिधारण अवधि के बाद स्वचालित भुगतान',
		RETAIN_DAY_ABANDONED: 'पुरस्कार प्रतिधारण अवधि के बाद अमान्य',
	},
	'vi-VN': {
		ABANDONED: 'Đã hết hạn và không hợp lệ',
		AUTO: 'Tự động phát hành khi hết hạn',
		RESERVE: 'Tiền thưởng chưa nhận sẽ được gửi qua email khi quá ngày, tuần hoặc tháng',
		ABOLISHMENT: 'Tiền thưởng chưa nhận sẽ được hệ thống tái chế và vô hiệu hóa khi quá ngày, tuần hoặc tháng',
		RETAIN_DAY_AUTO: 'Tiền thưởng sẽ được tự động phát hành sau số ngày được giữ lại',
		RETAIN_DAY_ABANDONED: 'Tiền thưởng sẽ không hợp lệ sau số ngày được giữ lại',
	},
}

// 生成预览文本
export function generatePreviewText(language: LanguageType, variables: Recordable<string | number>): string {
	language = getLanguageCode(language)
	// 根据语言和类型选择正确的模板
	const firstTemplate = previewText_First?.[language]?.[variables.highestType]
	if (!firstTemplate) {
		return 'Unsupported type'
	}

	// 替换模板中的变量
	let result = `1. ${firstTemplate.replace('{maximum}', formatMoney(variables.highestReward))}`

	// 设置默认的 activityType 为 Recharge
	const activityType = variables?.activityType || 'Recharge'

	// 添加第二条数据
	let secondTemplate
	if (activityType === 'MysteryReward') {
		secondTemplate = previewText_Second_mysteryReward[language][variables.resetType]
	}
	else if (activityType === 'SignInVolume') {
		secondTemplate = previewText_Second_mysteryReward[language].PERIODIC
	}
	else {
		secondTemplate = previewText_Second[language][variables.resetType]
	}
	if (secondTemplate) {
		result += `\n2. ${secondTemplate}`
	}

	// 添加第三条数据
	const noNeedPreviewText_Third = ['NewUserExclusive']
	const thirdTemplate = previewText_Third[language][variables.expiredAwardType]
	if (!noNeedPreviewText_Third.includes(activityType as string) && thirdTemplate) {
		result += `\n3. ${thirdTemplate}`
	}

	return result
}