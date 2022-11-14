import { GetterTree } from 'vuex'
import { SocketState } from '@/store/socket/types'
import { RootState } from '@/store/types'

export const getters: GetterTree<SocketState, RootState> = {
    getUrl: (state) => {
        const basePath = import.meta.env.VUE_BASE_URL || ''; // https://vitejs.dev/guide/build.html#public-base-path
        const port = state.port === 80 ? '' : `:${state.port}`
        return `//${state.hostname}${port}${basePath}`
    },

    getHostUrl: (state) => {
        return (state.protocol === 'wss' ? 'https' : 'http') + '://' + state.hostname + '/'
    },

    getWebsocketUrl: (state, getters) => {
        return `${state.protocol}:${getters['getUrl']}/websocket`
    },
}
