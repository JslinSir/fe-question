/*
 * @Date: 2020-05-07 18:34:11
 * @Description: 基于 wx.request 的promise 封装
 */

 
const appHost = ''
 

// 公用header参数
const commonHeaders = function () {

    const headers = new Object();
 
    headers['Content-Type'] = 'application/json';

    
    return headers;
}


const request = param => {
    let { url, data = {}, headers, timeout, method, } = param || {}
    return new Promise((resolve, reject) => {
        method = method || request.defaultParameters.method
        method = method.toUpperCase()
        timeout = timeout || request.defaultParameters.timeout
        headers = { ...request.defaultParameters.headers, ...headers }
     
            wx.request({
                url: `${url}`,
                data,
                method,
                header: headers,
                success(res) {
                    resolve(res)
                },
                fail(e) {
                    if (e.errMsg === 'request:fail timeout') {
                        wx.showToast({
                            title: '请求超时',
                            icon: 'none',
                            duration: 2000,
                        })
                    }
                    reject(e)
                },
            })
            

    })
}

// 默认的请求参数 
request.defaultParameters = {
    url: appHost,
    data: {},
    header: commonHeaders(),
    timeout: 50 * 1000,
    method: 'GET',
}

// 下载
request.download = options => {
    let { url, headers } = options || {}
    headers = { ...request.defaultParameters.headers, ...headers }
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            header: headers,
            url: `${appHost}/${url}`,
            success: (res) => {
                if (res.statusCode == 200) {
                    const tempFilePath = res.tempFilePath
                    resolve(tempFilePath)
                } else {
                    reject(res.errMsg || {})
                }
            },
            fail: (res) => reject(res.errMsg || {})
        })
    })

}


export const get = (url, data, options) => request({ url, data, method: 'GET', ...options })
export const post = (url, data, options) => request({ url, data, method: 'POST', ...options })
export const download = (url, options) => request.download({ url, ...options })

export default { get, post,download }