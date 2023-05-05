import { GetterTree } from 'vuex'
import { SocketState } from '@/store/socket/types'
import { RootState } from '@/store/types'

export const getters: GetterTree<SocketState, RootState> = {
    getUrl: (state) => {
        const basePath = import.meta.env.BASE_URL || ''; // https://vitejs.dev/guide/build.html#public-base-path
        const port = state.port === 80 ? '' : `:${state.port}`

        const url = `//${state.hostname}${port}${basePath}`;
        // strip trailing slash from BASE_URL in this getter, since most socket/getUrl consumers seem to assume no trailing slash is present
        if (url[url.length - 1] === "/") {
            return url.slice(0, -1)
        }
        return url

        return '//' + state.hostname + (state.port !== 80 ? ':' + state.port : '')
    },

    getHostUrl: (state) => {
        return (state.protocol === 'wss' ? 'https' : 'http') + '://' + state.hostname + '/'
    },

    getWebsocketUrl: (state, getters) => {
        return `${state.protocol}:${getters['getUrl']}/websocket`
    },
}
