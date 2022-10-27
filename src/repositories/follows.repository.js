import db from "../database/database.js";

export async function getFollow(follower, followed){
    return db.query(`
        SELECT * FROM follows
        WHERE
            "followerId" = $1
            AND
            "followedId" = $2;`,
        [follower, followed]    
    )
}

export async function addFollow(follower, followed){
    return db.query(`
        INSERT INTO follows
        ("followerId", "followedId")
        VALUES ($1, $2);`,
        [follower, followed]    
    )
}

export async function deleteFollow(follower, followed){
    return db.query(`
        DELETE FROM follows
        WHERE
            "followerId" = $1
            AND
            "followedId" = $2;`,
        [follower, followed]    
    )
}

export async function getUserFollows(id){
    return db.query(`
        SELECT * FROM follows
        WHERE "followerId" = $1;`,
        [id]    
    )
}