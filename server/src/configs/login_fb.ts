import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import config from "./config_env";
import AuthModel, { IUserInfo } from "@/models/auth.model";
import { generate_password } from "@/utils/generate";
import { JWTPayload } from "@/types/auth";

// Called by passport.authenticate('facebook') middleware
passport.use(new FacebookStrategy({
    clientID: config.FB_APP_ID,
    clientSecret: config.FB_SECRET_TOKEN,
    callbackURL: '/auth/redirect/facebook',
    profileFields: ['id', 'photos'],
}, async function verify(accessToken, refreshToken, profile, done) { // When login is successful
    const { id, picture } = profile._json;
    const avatar: string = picture && picture.data && picture.data.url

    try {
        // If the user not exists, create.
        let UID: string = await AuthModel.findAccountByProvider("facebook", id)
        if (!UID) {
            const userinfor: IUserInfo = {
                username: id,
                password: generate_password(),
                provider: "facebook",
                puid: id,
                img: avatar
            }
            UID = await AuthModel.createAccount(userinfor);
        }

        done(null, { username: id, UID } as JWTPayload);
    } catch (error) {
        done(error);
    }

    // After this, call req.login func and assign data to req.user
}));

// Not important because we dont use session
// Called by req.login
passport.serializeUser(function (user: any, done) {
    // Get data pass from `verify` function above 
    done(null, user.UID); // create sessionID from this data
});

// Called by passport.session middleware
passport.deserializeUser(function (user: any, done) {
    // Deserializing sessionID to user object. 
    return done(null, user); // assign data to req.user
});