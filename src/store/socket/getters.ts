import { GetterTree } from 'vuex'
import { SocketState } from '@/store/socket/types'
import { RootState } from '@/store/types'

export const getters: GetterTree<SocketState, RootState> = {
    getUrl: (state) => {
        return '//' + state.hostname + (state.port !== 80 ? ':' + state.port : '')
    },

    getHostUrl: (state) => {
        return (state.protocol === 'wss' ? 'https' : 'http') + '://' + state.hostname + '/'
    },

    getWebsocketUrl: (state, getters) => {
        const basePath = import.meta.env.BASE_URL || '/'; // https://vitejs.dev/guide/build.html#public-base-path
        return `${state.protocol}:${getters['getUrl']}${basePath}websocket`
    },
}
