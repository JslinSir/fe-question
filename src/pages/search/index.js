import { getSearchQuestion } from "../../services/index";
import { getNodeRectFromComponent  } from '../../utils/nodeRef'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recentList:[],
    list:null,
    height:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.$pageScroll = this.selectComponent('#pageScroll')
    // 读取最近搜索
    const res = wx.getStorageSync("search-brand-rencently");
    if (res) {
      this.setData({
        recentList: res,
      });
    }
    this.getPopPositon()
  },

  async getPopPositon(){
    const res = await getNodeRectFromComponent(wx,'#slotId')
    const { screenHeight } = wx.getSystemInfoSync()
    const { bottom } = wx.getMenuButtonBoundingClientRect()
    this.setData({height:screenHeight-res.top-bottom-20})
 
  },

  handleInput(e){
    const { value } = e.detail
    if (value) {
      this._value = value;
      this.setData({ value })
    }
  },
 

  handleClearSearch(){
    this.setData({value:'',list:null})
  },

  handleSearchConfirm(e) {
    const { value } = e.detail;
    if (!value) {
      wx.showToast({
        title: "请输入题目名称",
        icon: "none",
      });
      return false;
    }
    this.fetchData(value);
  },

  handleClickSearchText(e) {
    const { name } = e.currentTarget.dataset;
    this.setData({ value: name });
    this.fetchData(name);
  },

  handleClear() {
    wx.removeStorageSync("search-brand-rencently");
    this.setData({ recentList: [] });
  },

  handleCliclBtnSearch() {
    if (!this._value) {
      wx.showToast({
        title: "请输入题目名称",
        icon: "none",
      });
      return false;
    }
    this.fetchData(this._value);
  },

  handlePulling(){
    setTimeout(()=>{
      this.$pageScroll.reset()
    },1000)
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * 获取数据源
   */
  async fetchData(name) {
    try {
      wx.showLoading()
      const res = await getSearchQuestion(name)
  
      const { result:{ rows } } = res.data
    
      this.setData({ list:rows }) 
      const { recentList } = this.data
  
      const flag = recentList.findIndex((item) => item == name);
  
      if (flag > -1) {
        return false
      }
  
      recentList.unshift(name)
      if (recentList.length > 10) {
        recentList.pop();
      }
      wx.setStorage({
        key: "search-brand-rencently",
        data: recentList,
      });
    } catch (error) {
      
    }finally{
      wx.hideLoading()
    }
  
  },
});
