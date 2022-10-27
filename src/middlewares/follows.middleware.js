import * as userRepositories from "../repositories/users.repository.js";

async function validateIds(req,res,next) {
    const follower = Number(res.locals.user.id);
    const followed = Number(req.params.id);

    if (!follower || !followed){
        res.status(400).send({message: 'missing id info'});
        return;
    }

    if (follower === followed){
        res.status(400).send({message: 'you cannot follow/unfollow yourself'});
        return;
    }

    try {
        const checkUser = await userRepositories.getUserById(followed);
        if (checkUser.rowCount === 0) {
            res.status(400).send({ message: "User doesn't exist." });
            return;
        }
    } catch (error) {
        res.sendStatus(500);
    }

    res.locals.follower = follower;
    res.locals.followed = followed;
    next();
}

export { validateIds }