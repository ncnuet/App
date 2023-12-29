import gql from "graphql-tag";

export const gdvParcelQuery = gql`
  fragment address on AddressGraph {
    country {
      name
      id
    }
    province {
      name
    }
    district {
      name
    }
    commune {
      name
    }
    detail
  }

  query parcel_ds($pids: [String]!) {
    parcels(pids: $pids) {
      notes
      status
      pid
      sending_add {
        ...address
      }
      receiving_add {
        ...address
      }
      sender {
        name
        phone
      }
      receiver {
        name
        phone
      }
      goods {
        name
        category
        quantity
        value
        weight
        attached
      }
      goods_type
      cost_type
      cost
      return_type

      receiving_office {
        poid
      }

      creator {
        uid
        name
        role
        office {
          poid
        }
      }
    }
  }
`;
