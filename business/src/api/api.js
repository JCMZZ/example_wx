import wxRequest from '../utils/wxRequest'

wxRequest.baseURL = 'http://127.0.0.1:8080/businessestore/'

// 自主营销
const getselfrcmd = params => {
    return wxRequest(`service/selectUser`, params).then(res => res.data)
}
const selfnopay = params => {
    return wxRequest(`service/selectService`, params).then(res => res.data)
}

// 用户管理
const getCustomer = params => {
    return wxRequest(`userManage/customerList`, params).then(res => res.data)
}

export default {
    getselfrcmd,
    getCustomer,
    selfnopay
}