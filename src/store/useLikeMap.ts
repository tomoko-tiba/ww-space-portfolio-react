import { persist, createJSONStorage } from "zustand/middleware"
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

interface LikeMap {
    [key: number]: boolean;
}

type LikeMapStore = {
    likeMap: LikeMap;
    handleLike: (id: number) => void;
    handleUnlike: (id: number) => void;
}

export const useLikeMap = create(immer(
    persist<LikeMapStore>(
        // 配置全集状态和它的设置方法
        (set) => ({
            // 全局定义状态 likeMap
            likeMap: {},
            handleLike: (id: number) => {
                set((state) => { 
                    state.likeMap[id] = true;
                    return state });
            },
            handleUnlike: (id: number) => {
                set((state) => { 
                    if(state.likeMap[id]) delete state.likeMap[id];
                    return state });
            }
        }),
        // 配置储存到浏览器缓存
        {
            name: 'user-like-map-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
))
