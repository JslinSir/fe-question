
import request from '../utils/request'


export const getToDayHot = title => request.get(`https://sentence.iciba.com/index.php?c=dailysentence&m=getdetail&title=${title}`)

/**
 * 爱词霸开放api
 * @param {*} date 
 * @param {*} type 
 */
export const getAcibaDetail = (date,type) => request.get(`https://open.iciba.com/dsapi/?date=${date}&type=${type}`)

/******************  前端知识每日3+1 开放api ****************************/
const QUESTION_URL = `https://api.h-camel.com/api?mod=interview&ctr=issues&`
/**
 * 今日题目
 */
export const getTodayQuestion = ()=> request.get(`${QUESTION_URL}act=today`)

/**
 * 热门题目
 */
export const getHotQuestion = ()=> request.get(`${QUESTION_URL}act=hot`)

/**
 * 查询类库题目
 */
export const getCateQuestion = ()=> request.get(`${QUESTION_URL}act=categoryList&pageSize=10&pageNum=1`)

/**
 * 搜索
 */
 export const getSearchQuestion = (search)=> request.get(`${QUESTION_URL}act=search&key=${search}&pageSize=500`)
 