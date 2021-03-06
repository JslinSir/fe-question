Component({
  properties: {
    loading: { type: Boolean, value: !0 },
    size: { type: Number, value: 28 },
    lightColor: { type: String, value: "#0a1d66" },
    bgColor: { type: String, value: "#dadada" },
    duration: { type: Number, value: 0.6 },
    type: { type: String, value: "default" },
    theme: { type: String, value: "black" },
  },
  attached() {},
  methods: {
    showLoading() {
      this.setData({ loading: !0 });
    },
    hideLoading() {
      this.setData({ loading: !1 }, () => {
        this.triggerEvent("onClose", "");
      });
    },
  },
});
