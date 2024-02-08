import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User, { IUser } from "../models/User";
import { Request, Response, NextFunction } from "express";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "secret", // Use environment variable for secret
};

const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtAuth);

// Extend Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// Middleware function to authenticate requests using JWT
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err, user: IUser | false) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user; // Attach user object to request
      next();
    }
  )(req, res, next);
};
