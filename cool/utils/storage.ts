export const storage = {
	// 后缀标识
	suffix: "_deadtime",

	/**
	 * 获取
	 * @param {*} key 关键字
	 */
	get(key: string): any {
		return window.localStorage.getItem(key);
	},

	/**
	 * 获取全部
	 */
	info() {
		// const { keys } = window.localStorage.getStorageInfoSync();
		const len = localStorage.length;

// 创建一个数组，用于存储 localStorage 中的所有键
const keys = [];

// 遍历 localStorage 中的所有键，并将它们存储到数组中
for (let i = 0; i < len; i++) {
  keys.push(localStorage.key(i));
}
		const d: any = {};

		keys.forEach((e: string) => {
			d[e] = window.localStorage.getItem(e);
		});

		return d;
	},

	/**
	 * 设置
	 * @param {*} key 关键字
	 * @param {*} value 值
	 * @param {*} expires 过期时间
	 */
	set(key: string, value: any, expires?: number): void {
		window.localStorage.setItem(key, value);

		if (expires) {
			window.localStorage.setItem(
				`${key}${this.suffix}`,
				Date.parse(String(new Date())) + expires * 1000
			);
		}
	},

	/**
	 * 是否过期
	 * @param {*} key 关键字
	 */
	isExpired(key: string): boolean {
		return window.localStorage.getItem(`${key}${this.suffix}`) - Date.parse(String(new Date())) <= 0;
	},

	/**
	 * 删除
	 * @param {*} key 关键字
	 */
	remove(key: string) {
		return window.localStorage.removeItem(key);
	},

	/**
	 * 清理
	 */
	clear() {
		window.localStorage.clear();
	},

	/**
	 * 获取一次后删除
	 */
	once(key: string) {
		const value = this.get(key);
		this.remove(key);
		return value;
	},
};
