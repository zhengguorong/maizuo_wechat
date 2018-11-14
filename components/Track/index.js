Component({
    properties: {
        pageMethods: {
            type: Array,
            value: [],
        },
        pageData: {
            type: Object,
            value: {},
        },
        route: {
            type: String,
            value: '',
        },
    },
    data: {
        isShowMethodTracking: false,
        tracks: [],
    },
    methods: {
        showMethodTracking() {
            this.setData({ isShowMethodTracking: true });
        },
        selectData(e) {
            const { method, name } = e.currentTarget.dataset;
            this.addTrack(method, name);
        },
        /**
         *  method: 'getBanner',
         *  data: ['imgUrls'],
         */
        addTrack(method, data) {
            const { tracks } = this.data;
            const findTrack = tracks.find((track) => {
                return track.method === method;
            });
            if (findTrack) {
                findTrack.data.push(data);
            } else {
                tracks.push({ method, data: [data] });
            }
            this.setData({ tracks });
        },
        copyTrack() {
            const pageTrack = { path: this.data.route, tracks: this.data.tracks };
            wx.setClipboardData({ data: JSON.stringify(pageTrack) });
        },
    },
});
