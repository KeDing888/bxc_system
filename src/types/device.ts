export interface DeviceAttribute {
  id: string
  name: string
  type: 'number' | 'boolean' | 'string'
  required: boolean
  value?: number | boolean | string
}

export interface Device {
  id: string
  name: string
  image: string
  attributes: DeviceAttribute[]
  createdAt?: string
  updatedAt?: string
}

// 明确区分创建和更新类型
export interface DeviceCreateDTO {
  name: string
  image: string
  attributes: Omit<DeviceAttribute, 'id'>[] // 创建时不需要ID
}

export interface DeviceUpdateDTO extends DeviceCreateDTO {
  id: string // 更新必须包含ID
}

