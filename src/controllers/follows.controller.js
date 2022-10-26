import * as followRepositories from "../repositories/follows.repository.js";

export async function createFollow(req, res) {
    const { follower, followed } = res.locals;
    try {
        const alreadyFollow = await followRepositories.getFollow(follower,followed);
        if (alreadyFollow.rowCount !== 0){
            res.status(400).send({message: "you already follow this user"});
            return;
        }
        await followRepositories.addFollow(follower, followed);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function deleteFollow(req, res) {
    const { follower, followed } = res.locals;
    try {
        const notFollow = await followRepositories.getFollow(follower,followed);
        if (notFollow.rowCount === 0){
            res.status(400).send({message: "you don't follow this user"});
            return;
        }
        await followRepositories.deleteFollow(follower, followed);
        res.sendStatus(204);
    } catch (error) {
        res.sendStatus(500);
    }
}