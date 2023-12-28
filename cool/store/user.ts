import { defineStore } from "pinia";
import { ref } from "vue";
import { deepMerge, storage } from "../utils";
// import { router } from "../router";
import { service } from "../service";

// 本地缓存
const data = storage.info();

const useUserStore = defineStore("user", function () {
	// 标识
	const token = ref(data.token || "");

	// 设置标识
	function setToken(data: {
		token: string;
		expire: number;
		refreshToken: string;
		refreshExpire: number;
	}) {
		token.value = data.token;

		// 访问
		storage.set("token", data.token, data.expire - 5);
		// 刷新
		storage.set("refreshToken", data.refreshToken, data.refreshExpire - 5);
	}

	// 刷新标识
	async function refreshToken() {
		return service.user.login
			.refreshToken({
				refreshToken: storage.get("refreshToken"),
			})
			.then((res) => {
				setToken(res);
				return res.token;
			});
	}

	// 用户信息
	const info = ref<Eps.UserInfoEntity | undefined>(data.userInfo);

	// 设置用户信息
	function set(value: Eps.UserInfoEntity) {
		info.value = value;
		storage.set("userInfo", value);
	}

	// 更新用户信息
	async function update(data: Eps.UserInfoEntity & { [key: string]: any }) {
		set(deepMerge(info.value, data));
		return service.user.info.updatePerson(info.value);
	}

	// 清除用户
	function clear() {
		storage.remove("userInfo");
		storage.remove("token");
		storage.remove("refreshToken");
		token.value = "";
		info.value = undefined;
	}

	// 退出
	function logout() {
		clear();
		// TODO
		// router.login({ reLaunch: true });
	}

	// 获取用户信息
	async function get() {
		return service.user.info
			.person()
			.then((res) => {
				if (res) {
					set(res);
				}
				return res;
			})
			.catch(() => {
				logout();
			});
	}

	return {
		token,
		setToken,
		refreshToken,
		info,
		get,
		set,
		update,
		logout,
	};
});

export { useUserStore };
