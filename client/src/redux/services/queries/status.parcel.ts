import gql from 'graphql-tag';

export interface ParcelStatusWraper {
  data: {
    parcels: ParcelStatus[]
  }
}

export interface ParcelStatus {
  status: string;
  pid: string;
  sending_add: {
    province: {
      name: string
    }
  }
  receiving_add: {
    province: {
      name: string
    }
  }
}

export const parcelStatusQuery = gql`
  query parcel_status($pids: [String]!) {
    parcels(pids: $pids) {
      status
      pid
      sending_add {
        province {
          name
        }
      }
      receiving_add {
        province {
          name
        }
      }
    }
  }
`