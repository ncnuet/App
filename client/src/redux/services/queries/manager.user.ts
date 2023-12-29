import gql from 'graphql-tag';

export interface UserStatus {
  name: string
  username: string
  email: string
  uid: string
  avatar: string
  role: string
  active: boolean
  office: {
    name: string
  }[]
}

export interface UserDetail extends Omit<UserStatus, "office"> {
  phone: string
  office: {
    name: string
    address: {
      province: {
        name: string
      }
      district: {
        name: string
      }
    }
  }[]
};

export const ManagerStatusQuery = gql`
  query manager_status {
    users(type: Head) {
      name
      username
      email
      uid
      avatar
      role
      active
      office {
        name
      }
    }
  }
`

export const StaffDetailQuery = gql`
  query ($uids: [String]!) {
    users(uids: $uids, type: ID) {
      name
      username
      email
      uid
      avatar
      role
      office {
        name
        address {
          province {
            name
          }
          district {
            name
          }
        }
      }
    }
  }
`;