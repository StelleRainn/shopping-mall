import request from '@/utils/request'

export const getAddressListApi = () => {
  return request.get('address/list')
}

// 为用户添加一个默认地址(自己添加)
export const setDefaultAddressApi = () => {
  return request.post('address/add', {
    form: {
      name: 'RosaTest-' + String((Math.random() * 10).toFixed(2)),
      phone: '13172207113',
      region: [
        {
          value: 782,
          label: '上海'
        },
        {
          value: 783,
          label: '上海市'
        },
        {
          value: 785,
          label: '徐汇区'
        }
      ],
      detail: '北京路1号楼8888室'
    }
  })
}
