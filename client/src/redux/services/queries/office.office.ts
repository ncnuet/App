import gql from 'graphql-tag';

export interface OfficeStatus {
  name: string
  poid: string
  office_type: "Transaction" | "Gathering";
  manager: {
    name: string
  }[];
}

export interface OfficeDetail extends Omit<OfficeStatus, "manager"> {

};

export const OfficeStatusQuery = gql`
  query manager_status {
	offices {
		poid
        name
		manager {
			name
		}
		office_type
	}
  }
`