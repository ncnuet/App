import gql from "graphql-tag";

export enum EGoodsCategory {

}

export enum EStatusParcel {
	DELIVERING = "DELIVERING",
	DELIVERED = "DELIVERED",
	FAILED = "FAILED",
}

export interface ParcelDetailsWraper {
	data: {
		parcels: ParcelDetail[]
	}
}

export interface AddressDetail {
	name: string
	id?: string
}

export interface Address {
	country?: AddressDetail
	province?: AddressDetail
	district?: AddressDetail
	commune?: AddressDetail
	detail?: string
	lat?: number
	long?: number
}

export interface Customer {
	name: string;
	phone: string;
}

export interface Goods {
	name: string;
	category: EGoodsCategory;
	quantity: number;
	weight: number;
	value: number;
	attached: string;
}

export interface ParcelDetail {
	status: EStatusParcel;
	pid: string;
	sending_add: Address
	receiving_add: Address
	receiver: Customer
	sender: Customer
	goods: Goods[]
	notes: string
}

export const parcelDetailsQuery = gql`
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

query parcel_details($pid: String!) {
	parcels(pid: $pid) {
		status
		pid
		notes
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
			weight
		}
	}
}
`