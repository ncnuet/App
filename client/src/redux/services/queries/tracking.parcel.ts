import gql from 'graphql-tag';

export interface TrackingStatus {
    tid: string;
    parcel: {
        pid: string;
    }
    events: {
        name: string;
        responsor: {
            name: string;
        }
        office: {
            name: string;
        }
    }[]
}

export const TrackingStatusQuery = gql`
  query tracking($pid: String!) {
	tracking(pid: $pid) {
		tid
		parcel {
			pid
		}
		events {
			name
			responsor {
				name
			}
			office {
				name
			}
		}
	}
    }
`