const bcrypt = require("bcrypt-nodejs");
const Op = require("sequelize").Op;

module.exports = (passport, User) => {
    var LocalStrategy = require("passport-local").Strategy;

    passport.use("local-signup", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, (req, email, password, done) => {
        var generateHashedPassword = (password) => {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        };

        User.findOne({
            where: {
                email: email,
                password: {
                    [Op.ne] : null
                }
            }
        }).then(user => {
            if(user){
                if(user.email !== null)
                    return done(null, false, {message: "Email already taken!"});
            }
            var hashedPassword = generateHashedPassword(password);

            var userToPush = {
                email: email,
                password: hashedPassword,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                phone: req.body.phone
            };

            User.create(userToPush).then((user, created) => {
                if(!user)
                    return done(null, false);
                if(user)
                    return done(null, user);
            });
        })
    }));

    passport.use("local-login", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, (req, email, password, done) => {
        var isValidPassword = (password, hashedPass) => {
            return bcrypt.compareSync(password, hashedPass);
        };

        User.findOne({
            where: { 
                email: email,
                password: {
                    [Op.ne] : null
                }
            }
        }).then((user) => {
            if(!user)
                return done(null, false, { message: "Email does not exsist" });
            if(!isValidPassword(password, user.password))
                return done(null, false, { message: "Wrong password" });
            return done(null, user.get());
        }).catch((err) => {
            return done(null, false, { message: "Something went wrong"});
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            if(user)
                return done(null, user.get());
            return done(user.errors, null);
        })
    });
}