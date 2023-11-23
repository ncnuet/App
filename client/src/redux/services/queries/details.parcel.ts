import gql from "graphql-tag";

export interface ParcelDetailsWraper {
    data: {
        parcels: ParcelDetail[]
    }
}

export interface ParcelDetail {
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

export const parcelDetailsQuery = gql`
  query parcel_details($pid: String!) {
    parcels(pid: $pid) {
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