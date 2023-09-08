export interface JWTPayload {
    username: string,
    UID: string
}

export type SocialProvider = "facebook" | "local" | "google"